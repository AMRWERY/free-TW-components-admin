<template>
  <div>
    <!-- Stats Section -->
    <div ref="statsSection" class="py-10 bg-white dark:bg-[#0a0a0f]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
          <!-- Total Components -->
          <div class="border p-3 rounded-lg cursor-pointer">
            <div class="text-4xl font-bold text-blue-600 mb-2" data-target="{{ totalComponents }}">
              {{ animatedTotalComponents }}
            </div>
            <div class="text-sm font-medium text-gray-600 dark:text-gray-400 capitalize tracking-wide">
              Components
            </div>
          </div>

          <!-- Total Categories -->
          <div class="border p-3 rounded-lg cursor-pointer">
            <div class="text-4xl font-bold text-green-600 mb-2" data-target="{{ categoriesCount }}">
              {{ animatedCategoriesCount }}
            </div>
            <div class="text-sm font-medium text-gray-600 dark:text-gray-400 capitalize tracking-wide">
              Categories
            </div>
          </div>

          <!-- Total Copies -->
          <div class="border p-3 rounded-lg cursor-pointer">
            <div class="text-4xl font-bold text-purple-600 mb-2" data-target="{{ totalCopies }}">
              {{ animatedTotalCopies.toLocaleString() }}
            </div>
            <div class="text-sm font-medium text-gray-600 dark:text-gray-400 capitalize tracking-wide">
              Copies Made
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Featured Categories -->
    <div class="py-20 bg-gray-50 dark:bg-[#13131a]/50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2
            class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
            Popular Categories
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Browse our most popular component categories
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <!-- category-card component -->
          <category-card v-for="category in featuredCategories" :key="category.name" :category="category" />
        </div>
      </div>
    </div>

    <!-- Featured Components -->
    <div class="py-20 bg-white dark:bg-[#0a0a0f]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2
            class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
            Trending Components
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Most copied components this week
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- component-card component -->
          <component-card v-for="component in trendingComponents" :key="component.id" :component="component" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const componentStore = useComponentStore()
const categoryStore = useCategoryStore()

const statsSection = ref<HTMLElement>()

// Stats with animation
const animatedTotalComponents = ref(0)
const animatedCategoriesCount = ref(0)
const animatedTotalCopies = ref(0)

// Load data
const loadDashboardData = async () => {
  if (!componentStore.components.length) {
    await componentStore.fetchComponents()
  }
  if (!categoryStore.categories.length) {
    await categoryStore.fetchCategories()
  }
}

// Computed data
const totalComponents = computed(() =>
  componentStore.components?.length || 0
)

const categoriesCount = computed(() =>
  categoryStore.categories?.length || 0
)

const totalCopies = computed(() =>
  componentStore.components?.reduce((sum, c) => sum + (c.copy_count || 0), 0) || 0
)

const featuredCategories = computed(() => {
  const categories = categoryStore.categories || []
  const categoryMap: Record<string, any[]> = {}
  componentStore.components.forEach((component: any) => {
    const categoryName = component.category || 'Uncategorized'
    if (!categoryMap[categoryName]) {
      categoryMap[categoryName] = []
    }
    categoryMap[categoryName].push(component)
  })
  return categories.slice(0, 8).map((cat: any) => ({
    name: cat.name,
    topComponent: categoryMap[cat.name]?.[0] || null
  }))
})

const trendingComponents = computed(() => {
  const components = componentStore.components || []
  return components
    .filter(c => (c.copy_count || 0) > 0)
    .sort((a, b) => (b.copy_count || 0) - (a.copy_count || 0))
    .slice(0, 6)
})

// Animate stats
const animateStats = () => {
  const animateValue = (start: number, end: number, duration: number, element: Ref<number>) => {
    const startTime = performance.now()
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      element.value = Math.floor(start + (end - start) * progress * (1 - Math.pow(1 - progress, 3)))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }
  animateValue(0, totalComponents.value, 2000, animatedTotalComponents)
  animateValue(0, categoriesCount.value, 2000, animatedCategoriesCount)
  animateValue(0, totalCopies.value, 2500, animatedTotalCopies)
}

// Intersection Observer for stats animation
const observer = ref<IntersectionObserver | null>(null)

onMounted(async () => {
  await loadDashboardData()
  // Animate stats when stats section is visible
  observer.value = new IntersectionObserver((entries) => {
    const entry = entries[0]
    if (entry?.isIntersecting) {
      animateStats()
      observer.value?.disconnect()
    }
  }, { threshold: 0.5 })
  statsSection.value && observer.value.observe(statsSection.value)
})

onUnmounted(() => {
  observer.value?.disconnect()
})
</script>
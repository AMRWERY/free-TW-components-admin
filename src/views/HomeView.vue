<template>
  <div class="pb-16">

    <!-- Page Header -->
    <div class="mb-8 pt-2">
      <h1 class="text-2xl font-bold text-white">Dashboard</h1>
      <p class="text-sm text-gray-500 mt-1">Welcome back — here's what's happening.</p>
    </div>

    <!-- Stats Section -->
    <div ref="statsSection" class="mb-10">
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">

        <!-- Total Components -->
        <div class="group relative bg-[#13131a] border border-white/5 rounded-xl p-5 hover:border-cyan-500/20 transition-all duration-300 overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent pointer-events-none"></div>
          <div class="flex items-start justify-between">
            <div>
              <p class="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Total Components</p>
              <p class="text-4xl font-bold text-white tabular-nums">{{ animatedTotalComponents }}</p>
            </div>
            <div class="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/20 transition-colors">
              <svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </div>
          </div>
          <div class="mt-3 flex items-center gap-1.5">
            <div class="w-full h-1 bg-white/5 rounded-full overflow-hidden">
              <div class="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-1000"
                :style="{ width: totalComponents > 0 ? '70%' : '0%' }"></div>
            </div>
          </div>
        </div>

        <!-- Total Categories -->
        <div class="group relative bg-[#13131a] border border-white/5 rounded-xl p-5 hover:border-emerald-500/20 transition-all duration-300 overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-br from-emerald-600/5 to-transparent pointer-events-none"></div>
          <div class="flex items-start justify-between">
            <div>
              <p class="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Categories</p>
              <p class="text-4xl font-bold text-white tabular-nums">{{ animatedCategoriesCount }}</p>
            </div>
            <div class="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-500/20 transition-colors">
              <svg class="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
          </div>
          <div class="mt-3 flex items-center gap-1.5">
            <div class="w-full h-1 bg-white/5 rounded-full overflow-hidden">
              <div class="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-1000"
                :style="{ width: categoriesCount > 0 ? '55%' : '0%' }"></div>
            </div>
          </div>
        </div>

        <!-- Total Copies -->
        <div class="group relative bg-[#13131a] border border-white/5 rounded-xl p-5 hover:border-purple-500/20 transition-all duration-300 overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-transparent pointer-events-none"></div>
          <div class="flex items-start justify-between">
            <div>
              <p class="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Total Copies</p>
              <p class="text-4xl font-bold text-white tabular-nums">{{ animatedTotalCopies.toLocaleString() }}</p>
            </div>
            <div class="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-purple-500/20 transition-colors">
              <svg class="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <div class="mt-3 flex items-center gap-1.5">
            <div class="w-full h-1 bg-white/5 rounded-full overflow-hidden">
              <div class="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full transition-all duration-1000"
                :style="{ width: totalCopies > 0 ? '85%' : '0%' }"></div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- Popular Categories -->
    <div class="mb-10">
      <div class="flex items-center justify-between mb-5">
        <div>
          <h2 class="text-lg font-bold text-white">Popular Categories</h2>
          <p class="text-sm text-gray-500 mt-0.5">Browse component categories</p>
        </div>
        <router-link to="/categories"
          class="text-xs font-medium text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1">
          View all
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
          </svg>
        </router-link>
      </div>

      <div v-if="componentStore.loading && !featuredCategories.length" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div v-for="i in 8" :key="i" class="bg-[#13131a] border border-white/5 rounded-xl p-5 animate-pulse">
          <div class="flex justify-center mb-4">
            <div class="w-12 h-12 rounded-xl bg-white/5"></div>
          </div>
          <div class="h-4 bg-white/5 rounded w-3/4 mx-auto"></div>
        </div>
      </div>

      <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <category-card v-for="category in featuredCategories" :key="category.name" :category="category" />
      </div>

      <div v-if="!componentStore.loading && featuredCategories.length === 0"
        class="flex flex-col items-center justify-center py-16 text-center">
        <div class="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center mb-4">
          <svg class="w-7 h-7 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
        </div>
        <p class="text-gray-500 text-sm">No categories yet.</p>
      </div>
    </div>

    <!-- Trending Components -->
    <div>
      <div class="flex items-center justify-between mb-5">
        <div>
          <h2 class="text-lg font-bold text-white">Trending Components</h2>
          <p class="text-sm text-gray-500 mt-0.5">Most copied this week</p>
        </div>
        <router-link to="/components"
          class="text-xs font-medium text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1">
          View all
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
          </svg>
        </router-link>
      </div>

      <div v-if="componentStore.loading && !trendingComponents.length" class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div v-for="i in 4" :key="i" class="bg-[#13131a] border border-white/5 rounded-xl p-6 animate-pulse">
          <div class="h-5 bg-white/5 rounded w-1/4 mb-4"></div>
          <div class="h-6 bg-white/5 rounded w-3/4 mb-3"></div>
          <div class="flex justify-between items-center mt-4">
            <div class="h-4 bg-white/5 rounded w-16"></div>
            <div class="h-4 bg-white/5 rounded w-24"></div>
          </div>
        </div>
      </div>

      <div v-else-if="trendingComponents.length" class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <component-card v-for="component in trendingComponents" :key="component.id" :component="component" />
      </div>

      <div v-else class="flex flex-col items-center justify-center py-16 text-center">
        <div class="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center mb-4">
          <svg class="w-7 h-7 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <p class="text-gray-500 text-sm">No trending components yet.</p>
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
const componentStore = useComponentStore()
const categoryStore = useCategoryStore()

const statsSection = ref<HTMLElement>()

const animatedTotalComponents = ref(0)
const animatedCategoriesCount = ref(0)
const animatedTotalCopies = ref(0)

const loadDashboardData = async () => {
  if (!componentStore.components.length) {
    await componentStore.fetchComponents()
  }
  if (!categoryStore.categories.length) {
    await categoryStore.fetchCategories()
  }
}

const totalComponents = computed(() => componentStore.components?.length || 0)
const categoriesCount = computed(() => categoryStore.categories?.length || 0)
const totalCopies = computed(() =>
  componentStore.components?.reduce((sum, c) => sum + (c.copy_count || 0), 0) || 0
)

const featuredCategories = computed(() => {
  const categories = categoryStore.categories || []
  const categoryMap: Record<string, any[]> = {}
  componentStore.components.forEach((component: any) => {
    const categoryName = component.category || 'Uncategorized'
    if (!categoryMap[categoryName]) categoryMap[categoryName] = []
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
  animateValue(0, totalComponents.value, 1800, animatedTotalComponents)
  animateValue(0, categoriesCount.value, 1800, animatedCategoriesCount)
  animateValue(0, totalCopies.value, 2200, animatedTotalCopies)
}

const observer = ref<IntersectionObserver | null>(null)

onMounted(async () => {
  await loadDashboardData()
  observer.value = new IntersectionObserver((entries) => {
    const entry = entries[0]
    if (entry?.isIntersecting) {
      animateStats()
      observer.value?.disconnect()
    }
  }, { threshold: 0.3 })
  statsSection.value && observer.value.observe(statsSection.value)
})

onUnmounted(() => {
  observer.value?.disconnect()
})
</script>

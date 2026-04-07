<template>
    <div>
        <div class="min-h-screen flex flex-col bg-[#0a0a0f]">
            <div class="relative flex flex-1">
                <!-- Mobile Menu Overlay -->
                <Transition name="overlay-fade">
                    <div v-if="sidebarOpen" @click="sidebarOpen = false"
                        class="fixed inset-0 z-20 bg-black/60 backdrop-blur-sm lg:hidden"></div>
                </Transition>

                <!-- Sidebar -->
                <aside :class="{
                    'translate-x-0': sidebarOpen,
                    '-translate-x-full': !sidebarOpen,
                    'lg:translate-x-0': true
                }" class="fixed inset-y-0 left-0 w-[260px] bg-[#13131a] text-white shrink-0 flex flex-col
                    border-r border-white/5 transition-transform duration-300 ease-in-out z-40
                    lg:fixed lg:top-0 lg:bottom-0 lg:h-screen">

                    <!-- Sidebar Header -->
                    <div class="px-5 pt-6 pb-5 border-b border-white/5 flex-shrink-0">
                        <div class="flex items-center gap-3">
                            <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center flex-shrink-0">
                                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                            </div>
                            <span class="text-[15px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 leading-tight">
                                Free TW Components
                            </span>
                        </div>
                    </div>

                    <!-- Navigation -->
                    <div class="flex-1 overflow-y-auto py-4 px-3">
                        <p class="text-[10px] font-semibold uppercase tracking-widest text-gray-600 px-3 mb-3">Main Menu</p>
                        <nav>
                            <ul class="space-y-1">
                                <!-- Dashboard -->
                                <li>
                                    <router-link to="/" @click="sidebarOpen = false"
                                        class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group"
                                        :class="$route.path === '/'
                                            ? 'bg-gradient-to-r from-cyan-500/15 to-blue-500/10 text-cyan-400 border border-cyan-500/20'
                                            : 'text-gray-400 hover:text-white hover:bg-white/5'">
                                        <div class="relative flex-shrink-0">
                                            <div v-if="$route.path === '/'" class="absolute -left-3 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-r-full"></div>
                                            <svg class="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                            </svg>
                                        </div>
                                        <span>Dashboard</span>
                                        <span v-if="$route.path === '/'" class="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                                    </router-link>
                                </li>

                                <!-- Components -->
                                <li>
                                    <router-link to="/components" @click="sidebarOpen = false"
                                        class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group"
                                        :class="$route.path === '/components'
                                            ? 'bg-gradient-to-r from-cyan-500/15 to-blue-500/10 text-cyan-400 border border-cyan-500/20'
                                            : 'text-gray-400 hover:text-white hover:bg-white/5'">
                                        <div class="relative flex-shrink-0">
                                            <div v-if="$route.path === '/components'" class="absolute -left-3 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-r-full"></div>
                                            <svg class="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                            </svg>
                                        </div>
                                        <span>Components</span>
                                        <span v-if="$route.path === '/components'" class="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                                    </router-link>
                                </li>

                                <!-- Categories -->
                                <li>
                                    <router-link to="/categories" @click="sidebarOpen = false"
                                        class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group"
                                        :class="$route.path === '/categories'
                                            ? 'bg-gradient-to-r from-cyan-500/15 to-blue-500/10 text-cyan-400 border border-cyan-500/20'
                                            : 'text-gray-400 hover:text-white hover:bg-white/5'">
                                        <div class="relative flex-shrink-0">
                                            <div v-if="$route.path === '/categories'" class="absolute -left-3 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-r-full"></div>
                                            <svg class="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                            </svg>
                                        </div>
                                        <span>Categories</span>
                                        <span v-if="$route.path === '/categories'" class="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                                    </router-link>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    <!-- Sidebar Footer -->
                    <div class="px-3 pb-5 border-t border-white/5 pt-4 flex-shrink-0">
                        <div class="flex items-center gap-2 px-3 py-2">
                            <div class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                            <span class="text-xs text-gray-600">Admin Panel v1.0</span>
                        </div>
                    </div>
                </aside>

                <!-- Main Content Area -->
                <main class="flex-1 flex flex-col lg:ml-[260px] bg-[#0a0a0f] min-h-screen">
                    <!-- Top Bar (mobile only) -->
                    <div class="sticky top-0 z-10 lg:hidden flex items-center justify-between px-4 py-3 bg-[#13131a]/95 backdrop-blur-md border-b border-white/5">
                        <span class="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                            Free TW Components
                        </span>
                        <button v-if="!sidebarOpen" @click="sidebarOpen = true"
                            class="text-gray-400 hover:text-white p-1.5 rounded-lg hover:bg-white/5 transition-colors">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <button v-else @click="sidebarOpen = false"
                            class="text-gray-400 hover:text-white p-1.5 rounded-lg hover:bg-white/5 transition-colors">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div class="flex-1 p-4 md:p-8">
                        <slot></slot>
                    </div>
                </main>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const sidebarOpen = ref(false)
</script>

<style scoped>
.overlay-fade-enter-active,
.overlay-fade-leave-active {
    transition: opacity 0.2s ease;
}
.overlay-fade-enter-from,
.overlay-fade-leave-to {
    opacity: 0;
}
</style>

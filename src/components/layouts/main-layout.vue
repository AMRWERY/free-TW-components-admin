<template>
    <div>
        <div class="min-h-screen flex flex-col">
            <div class="relative flex flex-1">
                <!-- Mobile Menu Overlay -->
                <div v-if="sidebarOpen" @click="sidebarOpen = false"
                    class="fixed inset-0 z-20 bg-black opacity-30 lg:hidden"></div>

                <!-- Close button (mobile only) - Outside sidebar -->
                <button v-if="sidebarOpen" @click="sidebarOpen = false"
                    class="fixed top-4 right-4 z-50 text-white bg-[#1a1a24] p-2 rounded-lg shadow-lg border border-gray-800 hover:bg-gray-800/50 transition-colors lg:hidden">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">
                        </path>
                    </svg>
                </button>

                <!-- Sidebar -->
                <aside :class="{
                    'translate-x-0': sidebarOpen,
                    '-translate-x-full': !sidebarOpen,
                    'lg:translate-x-0': true
                }" class="fixed inset-y-0 left-0 w-[280px] bg-[#13131a] text-white p-5 shrink-0 flex flex-col border-r border-gray-800/50
                    transition-transform duration-300 ease-in-out z-40
                    lg:fixed lg:top-0 lg:bottom-0 lg:block lg:h-screen">

                    <div class="text-xl font-bold mb-5 pb-4 border-b border-gray-800/50 flex-shrink-0">
                        <span
                            class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Free TW Components</span>
                    </div>

                    <div class="flex-1">
                        <nav>
                            <ul class="list-none p-0 pb-12 m-0 space-y-1">
                                <li class="relative flex justify-between items-center px-3 py-3 rounded-lg cursor-pointer transition-all duration-300 text-sm font-medium group"
                                    :class="$route.path === '/' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30' : 'text-gray-400 hover:text-white hover:bg-gray-800/50'">
                                    <router-link to="/" class="flex items-center justify-between w-full"
                                        @click="sidebarOpen = false">
                                        <div v-if="$route.path === '/'"
                                            class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-r-full">
                                        </div>
                                        <span class="flex-grow pl-2">Dashboard</span>
                                    </router-link>
                                </li>
                                <li class="relative flex justify-between items-center px-3 py-3 rounded-lg cursor-pointer transition-all duration-300 text-sm font-medium group"
                                    :class="$route.path === '/add-component' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30' : 'text-gray-400 hover:text-white hover:bg-gray-800/50'">
                                    <router-link to="/add-component" class="flex items-center justify-between w-full"
                                        @click="sidebarOpen = false">
                                        <div v-if="$route.path === '/add-component'"
                                            class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-r-full">
                                        </div>
                                        <span class="flex-grow pl-2">Add Component</span>
                                    </router-link>
                                </li>
                                <li class="relative flex justify-between items-center px-3 py-3 rounded-lg cursor-pointer transition-all duration-300 text-sm font-medium group"
                                    :class="$route.path === '/add-category' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30' : 'text-gray-400 hover:text-white hover:bg-gray-800/50'">
                                    <router-link to="/add-category" class="flex items-center justify-between w-full"
                                        @click="sidebarOpen = false">
                                        <div v-if="$route.path === '/add-category'"
                                            class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-r-full">
                                        </div>
                                        <span class="flex-grow pl-2">Add Category</span>
                                    </router-link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </aside>

                <!-- Main Content Area -->
                <main class="flex-1 flex flex-col lg:ml-[280px]">
                    <!-- Menu button for mobile -->
                    <button @click="sidebarOpen = true"
                        class="fixed top-4 right-4 z-10 text-white bg-[#1a1a24] p-2 rounded-lg shadow-lg border border-gray-800 hover:bg-gray-800/50 transition-colors lg:hidden">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>

                    <div class="flex-1 p-4 md:p-8 overflow-y-auto">
                        <slot></slot>
                    </div>
                </main>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const sidebarOpen = ref(false);
</script>
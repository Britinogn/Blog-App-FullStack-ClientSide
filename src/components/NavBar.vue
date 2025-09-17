<template>
  <nav class="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/60 shadow-sm">
    <div class="container mx-auto px-6">
      <div class="flex items-center justify-between h-16">
        <!-- Logo/Brand -->
        <router-link to="/" class="group flex items-center space-x-3">
          <div class="relative">
            <div class="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center transform group-hover:scale-105 transition-all duration-300 shadow-lg group-hover:shadow-xl">
              <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <!-- Floating indicator -->
            <div class="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          </div>
          <div class="hidden sm:block">
            <h1 class="text-xl font-semibold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              DevBlog
            </h1>
            <p class="text-xs text-slate-500 -mt-1">Fresh insights</p>
          </div>
        </router-link>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-1">
          <router-link 
              to="/" 
              class="nav-link group px-4 py-2 rounded-xl text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 font-medium relative"
              :class="{ 'active': $route.path === '/' }"
            >
            <div class="flex items-center space-x-2">
              <svg class="h-4 w-4 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Home</span>
            </div>
          </router-link>

          <router-link 
              to="/posts" 
              class="nav-link group px-4 py-2 rounded-xl text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 font-medium relative"
              :class="{ 'active': $route.path === '/posts' }"
            >
            <div class="flex items-center space-x-2">
              <svg class="h-4 w-4 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 011 .22l4 2a2 2 0 011 1.78v10a2 2 0 01-2 2z" />
              </svg>
              <span>Posts</span>
            </div>
          </router-link>

          <template v-if="isLoggedIn">
            <router-link 
              to="/posts/create" 
              class="group px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl transition-all duration-300 font-medium shadow-md hover:shadow-lg transform hover:scale-105 ml-2"
            >
              <div class="flex items-center space-x-2">
                <svg class="h-4 w-4 group-hover:rotate-90 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>Create</span>
              </div>
            </router-link>

            <!-- User Menu Dropdown -->
            <div class="relative ml-4" ref="userMenuRef">
              <button 
                @click="toggleUserMenu"
                class="group flex items-center space-x-3 px-3 py-2 rounded-xl hover:bg-slate-50 transition-all duration-300"
                :class="{ 'bg-slate-50': showUserMenu }"
              >
                <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {{ userInitial }}
                </div>
                <svg 
                  class="h-4 w-4 text-slate-500 group-hover:text-slate-700 transition-all duration-300"
                  :class="{ 'rotate-180': showUserMenu }"
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <!-- Dropdown Menu -->
              <transition
                enter-active-class="transition ease-out duration-200"
                enter-from-class="opacity-0 scale-95"
                enter-to-class="opacity-100 scale-100"
                leave-active-class="transition ease-in duration-150"
                leave-from-class="opacity-100 scale-100"
                leave-to-class="opacity-0 scale-95"
              >
                <div 
                  v-show="showUserMenu"
                  class="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50"
                >
                  <div class="px-4 py-3 border-b border-slate-100">
                    <p class="text-sm font-semibold text-slate-800">Welcome back!</p>
                    <p class="text-xs text-slate-500">Manage your account</p>
                  </div>
                  
                  <router-link 
                    to="/profile" 
                    class="flex items-center px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                    @click="closeUserMenu"
                  >
                    <svg class="h-4 w-4 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    My Profile
                  </router-link>

                  <router-link 
                    to="/dashboard" 
                    class="flex items-center px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                    @click="closeUserMenu"
                  >
                    <svg class="h-4 w-4 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Dashboard
                  </router-link>

                  <router-link 
                    to="/settings" 
                    class="flex items-center px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                    @click="closeUserMenu"
                  >
                    <svg class="h-4 w-4 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Settings
                  </router-link>

                  <div class="border-t border-slate-100 mt-2 pt-2">
                    <button 
                      @click="logout"
                      class="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
                    >
                      <svg class="h-4 w-4 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Sign Out
                    </button>
                  </div>
                </div>
              </transition>
            </div>
          </template>

          <template v-else>
            <div class="flex items-center space-x-3 ml-4">
              <router-link 
                to="/login" 
                class="px-4 py-2 text-slate-700 hover:text-blue-600 font-medium rounded-xl hover:bg-blue-50 transition-all duration-300"
              >
                Sign In
              </router-link>
              <router-link 
                to="/register" 
                class="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Get Started
              </router-link>
            </div>
          </template>
        </div>

        <!-- Mobile Menu Button -->
        <button 
          @click="toggleMobileMenu"
          class="md:hidden p-2 rounded-xl hover:bg-slate-50 transition-colors"
          :class="{ 'bg-slate-50': showMobileMenu }"
          >

          <svg 
            class="h-6 w-6 text-slate-700 transition-transform duration-300"
            :class="{ 'rotate-90': showMobileMenu }"
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
            >
            <path 
              v-if="!showMobileMenu"
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M4 6h16M4 12h16M4 18h16" 
            />
            <path 
              v-else
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M6 18L18 6M6 6l12 12" 
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div 
        v-show="showMobileMenu"
        class="md:hidden border-t border-slate-200 bg-white/95 backdrop-blur-md"
        >
        <div class="container mx-auto px-6 py-4 space-y-2">
          <router-link 
            to="/" 
            class="flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300"
            @click="closeMobileMenu"
          >
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span class="font-medium">Home</span>
          </router-link>

          <router-link 
            to="/posts" 
            class="flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300"
            @click="closeMobileMenu"
          >
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 011 .22l4 2a2 2 0 011 1.78v10a2 2 0 01-2 2z" />
            </svg>
            <span class="font-medium">Posts</span>
          </router-link>

          <template v-if="isLoggedIn">
            <router-link 
              to="/posts/create" 
              class="flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium shadow-md"
              @click="closeMobileMenu"
            >
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>Create Post</span>
            </router-link>

            <div class="border-t border-slate-200 pt-4 mt-4">
              <div class="flex items-center space-x-3 px-4 py-3 mb-3">
                <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                  {{ userInitial }}
                </div>
                <div>
                  <p class="font-semibold text-slate-800">My Account</p>
                  <p class="text-xs text-slate-500">Manage your profile</p>
                </div>
              </div>

              <router-link 
                to="/profile" 
                class="flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300"
                @click="closeMobileMenu"
              >
                <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span class="font-medium">Profile</span>
              </router-link>

              <router-link 
                to="/dashboard" 
                class="flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300"
                @click="closeMobileMenu"
              >
                <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span class="font-medium">Dashboard</span>
              </router-link>

              <button 
                @click="logout"
                class="flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-red-600 hover:text-red-700 hover:bg-red-50 transition-all duration-300"
              >
                <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span class="font-medium">Sign Out</span>
              </button>
            </div>
          </template>

          <template v-else>
            <div class="border-t border-slate-200 pt-4 mt-4 space-y-2">
              <router-link 
                to="/login" 
                class="flex items-center justify-center px-4 py-3 rounded-xl text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 font-medium"
                @click="closeMobileMenu"
              >
                Sign In
              </router-link>
              <router-link 
                to="/register" 
                class="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold shadow-md"
                @click="closeMobileMenu"
              >
                Get Started
              </router-link>
            </div>
          </template>
        </div>
      </div>
    </transition>

  </nav>
</template>

<script>
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { auth, setToken } from '../services/auth';

export default {
  name: 'Navbar',
  setup() {
    const showMobileMenu = ref(false);
    const showUserMenu = ref(false);
    const userMenuRef = ref(null);

    const isLoggedIn = computed(() => !!auth.token);

    // Get user initial (you might want to get this from user data)
    const userInitial = computed(() => {    
      return 'U';
    });

    function toggleMobileMenu() {
      showMobileMenu.value = !showMobileMenu.value;
      if (showMobileMenu.value) {
        showUserMenu.value = false;
      }
    }

    function closeMobileMenu() {
      showMobileMenu.value = false;
    }

    function toggleUserMenu() {
      showUserMenu.value = !showUserMenu.value;
      if (showUserMenu.value) {
        showMobileMenu.value = false;
      }
    }

    function closeUserMenu() {
      showUserMenu.value = false;
    }

    function logout() {
      setToken(null);
      closeUserMenu();
      closeMobileMenu();
      // redirect manually
      window.location.href = '/';  
    }

    // Close dropdowns when clicking outside
    function handleClickOutside(event) {
      if (userMenuRef.value && !userMenuRef.value.contains(event.target)) {
        showUserMenu.value = false;
      }
      // Close mobile menu when clicking outside navbar
      if (!event.target.closest('nav')) {
        showMobileMenu.value = false;
      }
    }

    onMounted(() => {
      document.addEventListener('click', handleClickOutside);
    });

    onUnmounted(() => {
      document.removeEventListener('click', handleClickOutside);
    });

    return { 
      isLoggedIn, 
      logout, 
      showMobileMenu,
      showUserMenu,
      userMenuRef,
      userInitial,
      toggleMobileMenu,
      closeMobileMenu,
      toggleUserMenu,
      closeUserMenu
    };
  }
}
</script>

<style scoped>
.nav-link.active {
  color: #2563eb;  
  background-color: #eff6ff;  
}

.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 6px;
  height: 6px;
  background: linear-gradient(135deg, #3b82f6, #6366f1);
  border-radius: 50%;
}
</style>
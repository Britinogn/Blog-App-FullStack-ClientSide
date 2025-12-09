<template>
  <footer class="bg-white dark:bg-slate-900 border-t border-slate-200/60 dark:border-slate-800 py-10 mt-16 transition-colors duration-300">
    <div class="container mx-auto px-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 items-center">

        <!-- Brand & Tagline -->
        <div class="flex flex-col items-start md:block sm:items-center">
          <router-link 
            to="/" 
            class="flex items-center space-x-3 md:block sm:items-center mb-3"
            aria-label="TechPulse Homepage"
          >
            <div class="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300">
              <span class="text-white font-bold text-lg tracking-tighter">TP</span>
            </div>
            <span class="text-xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">
              TechPulse
            </span>
          </router-link>
          <p class="text-sm text-slate-500 dark:text-slate-400 max-w-xs">
            Cutting-edge insights on software, AI, and the future of technology.
          </p>
        </div>

        <!-- Navigation Links -->
        <div class="flex justify-center">
          <!-- Social Icons -->
          <div class="flex space-x-4">
            <a 
              href="https://twitter.com/britinogn" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Twitter"
              class="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-blue-100 dark:hover:bg-blue-900/30 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200"
            >
              <i class="fab fa-twitter text-sm"></i>
            </a>
            <a 
              href="https://github.com/britinogn" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="GitHub"
              class="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 text-slate-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white transition-all duration-200"
            >
              <i class="fab fa-github text-sm"></i>
            </a>
            <a 
              href="https://linkedin.com/in/britinogn" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              class="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-blue-100 dark:hover:bg-blue-900/30 text-slate-600 dark:text-slate-400 hover:text-blue-700 dark:hover:text-blue-300 transition-all duration-200"
            >
              <i class="fab fa-linkedin-in text-sm"></i>
            </a>
          </div>
        </div>

        <!-- Social Links + Copyright -->
        <div class="flex flex-col items-start md:items-end space-y-4 md:block sm:items-center">
          <!-- Copyright -->
          <p class="text-sm text-slate-100 dark:text-slate-200">
            © {{ currentYear }} TechPulse. All rights reserved.
            <span class="block mt-1 sm:inline sm:ml-2">
              Made with <span class="text-red-500">❤️</span> for the tech community
            </span>
          </p>
        </div>

      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter',
  data() {
    return {
      currentYear: new Date().getFullYear()
    }
  }
}
</script>

<style scoped>
/* Optional: Add subtle fade-in on mount */
footer {
  animation: fadeInUp 0.6s ease-out forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
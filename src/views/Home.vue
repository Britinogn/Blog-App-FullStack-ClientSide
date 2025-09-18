<template>
    <section class="carousel p-15 bg-gradient-to-r from-blue-400 via-gray-600 to-purple-900  h-screen overflow-hidden ">
        <div class="flex items-center bg-whit justify-center  ">
            <div class="list">
                <article class="item">
                    <div class="main-content">
                        <div class="content text-gray-300">
                            <h1 class="">Welcome to TechPulse</h1>
                            <p >Insights, tutotials and discussions for tech professionals 
                                covering coding cybersecurity and emerging technologies
                            </p>

                            <button class="btn">
                                <router-link to="/posts" 
                                class="bg-white p-5 text-black rounded-lg
                                font-medium text-lg
                                hover:bg-black hover:text-white 
                                transition transform ease-in duration-400 
                                " >
                                 Start Reading
                                </router-link>
                            </button>
                        </div>
                    </div>
                </article>
            </div>

            <div class=" ">
                <figure class="border-amber-800 shadow-2xl  ">
                        <img src="/images/img1.png" alt="">
                </figure>
                <button ></button>
                <button></button>
            </div>
        </div>
    </section>

    <!-- section 2 -->
    <section class="min-h-screen bg-gradient-to-br from-slate-900 via-blue-50 to-purple-900">
        <div class="md:flex w-full ">
            
            <div class="main-content basis-[70%]">
                
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    
                    <!-- Search Section -->
                    <div class="mb-8">
                        <div class="bg-white/80 rounded-lg shadow-md p-6 backdrop-blur-sm">
                            <div class="flex gap-3">
                                <div class="flex-1 relative">
                                    <input 
                                        v-model="searchQuery"
                                        @keyup.enter="searchPosts"
                                        type="text"
                                        placeholder="Search posts by title, content, or author..."
                                        class="w-full px-4 py-3 pl-10 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                    <svg class="absolute left-3 top-3.5 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                    </svg>
                                </div>
                                <button 
                                    @click="searchPosts"
                                    class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                                >
                                    Search
                                </button>
                                <button 
                                    v-if="searchQuery"
                                    @click="clearSearch"
                                    class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-3 rounded-lg transition-colors duration-200"
                                >
                                    Clear
                                </button>
                            </div>
                            
                            <!-- Search Results Info -->
                            <div v-if="searchQuery" class="mt-3 text-sm text-slate-600">
                                {{ filteredPosts.length }} result(s) found for "{{ searchQuery }}"
                            </div>
                        </div>
                    </div>

                    <!-- loading -->
                    <div v-if="loading" class="flex w-full h-screen items-center justify-center py-20">
                        <div class="text-center">
                            <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mb-4"></div>
                            <p class="text-slate-600 font-medium"> WELCOME TO TECHPULSE...</p>
                        </div>
                    </div>

                    <!-- No Results Message -->
                    <div v-else-if="searchQuery && filteredPosts.length === 0" class="text-center py-12">
                        <div class="bg-white/75 rounded-xl p-8">
                            <svg class="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.034 0-3.935.606-5.5 1.646m11-1.646V19a2 2 0 01-2 2H8.5a2 2 0 01-2-2v-2.354"/>
                            </svg>
                            <h3 class="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
                            <p class="text-gray-600">Try adjusting your search terms or browse all posts.</p>
                        </div>
                    </div>

                    <!-- Posts Grid -->
                    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                        <article 
                            v-for="post in filteredPosts" 
                            :key="post._id"
                            class="group bg-white/75 rounded-2xl shadow-md hover:shadow-xl border border-slate-200 hover:border-slate-300 transition-all duration-300 overflow-hidden hover:-translate-y-1"
                            > 

                            <router-link :to= "{ name: 'Posts'} " >

                                <!-- Image Section -->
                                <div class="relative overflow-hidden">
                                    <img 
                                    v-if="post.image?.url" 
                                    :src="post.image.url" 
                                    class="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                                    :alt="post.title"
                                    />
                                    <div v-else
                                        class="w-full h-56 bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center"
                                        >
                                        <svg class="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                        </svg>
                                    </div>
                                </div>

                                <!-- Content Section -->
                                <div class="p-6">
                                    <div class="flex items-center gap-2 mb-3">
                                        <div class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                            <span class="text-white text-sm font-bold">
                                                {{ post.author?.username?.charAt(0)?.toUpperCase() || 'A' }}
                                            </span>
                                        </div>
                                        <div class="text-sm text-slate-500">
                                            {{ post.author?.username || 'Anonymous' }} • 
                                            {{ formatDate(post.createdAt) }}
                                        </div>
                                    </div>

                                    <h2 class="font-bold text-xl text-slate-900 mb-3 group-hover:text-blue-700 transition-colors line-clamp-2">
                                        {{ post.title }}
                                    </h2>
                                    
                                    <p class="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
                                        {{ post.content.substring(0, 120) }}...
                                    </p>

                                    <!-- Tags (if available) -->
                                    <div v-if="post.tags && post.tags.length" class="flex flex-wrap gap-2 mb-4">
                                        <span 
                                            v-for="tag in post.tags.slice(0, 3)" 
                                            :key="tag"
                                            class="px-2 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded-full"
                                        >
                                            {{ tag }}
                                        </span>
                                    </div>

                                    <!-- Action Buttons -->
                                    <div class="flex items-center justify-between pt-4 border-t border-slate-100">
                                    
                                        <router-link 
                                                :to="{ name:'Posts'}" 
                                                class="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm group/link"
                                            >
                                            <span>Read More</span>
                                            <svg class="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                                            </svg>
                                        </router-link>

                                    </div>
                                </div>

                            </router-link>

                        </article>

                        <div class="space-x-2 items-end flex justify-center  mt-6">
                            <button
                                @click="fetchPosts(currentPage - 1)"
                                :disabled="currentPage === 1"
                                class="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                            >
                                Prev
                            </button>

                            <span class="px-4 py-2">Page {{ currentPage }} of {{ totalPages }}</span>

                            <button
                                @click="fetchPosts(currentPage + 1)"
                                :disabled="currentPage === totalPages"
                                class="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>

                    </div>
                
                </div>
            </div>

            <!-- <div class="right-sidebar  basis-[25%] md:block">
                <div class="bg-red-400 ">
                    <h1>
                        WELCOME TO TECHPULSE...
                        COME TO TECHPULSE...
                        COME TO TECHPULSE...
                    </h1>
                </div>
            </div> -->

            
            <!-- Right Sidebar -->
            <div class="right-sidebar basis-[25%] md:block">
                <div class="sticky top-8 space-y-6 p-4">
                    
                    <!-- Recent Posts -->
                    <div class="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6">
                        <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center">
                            <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            Recent Posts
                        </h3>
                        <div class="space-y-3">
                            <div 
                                v-for="post in recentPosts"
                                :key="post._id"
                                class="group cursor-pointer"
                            >
                                <div class="flex gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                    <img 
                                        v-if="post.image?.url" 
                                        :src="post.image.url" 
                                        class="w-12 h-12 rounded-lg object-cover"
                                        :alt="post.title"
                                    />
                                    <div v-else class="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                                        <svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                        </svg>
                                    </div>
                                    <router-link :to=" {name: 'Posts'}" class="flex-1 min-w-0">
                                        <h4 class="text-sm font-medium text-gray-900 group-hover:text-blue-600 line-clamp-2">
                                        {{ post.title }}
                                        </h4>
                                        <p class="text-xs text-gray-500 mt-1">
                                            {{ formatDate(post.createdAt) }}
                                        </p>
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Popular Tags -->
                    <div class="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6">
                        <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center">
                            <svg class="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                            </svg>
                            Popular Tags
                        </h3>
                        <div class="flex flex-wrap gap-2">
                            <span 
                                v-for="tag in popularTags" 
                                :key="tag.name"
                                @click="searchByTag(tag.name)"
                                class="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 rounded-full cursor-pointer hover:from-blue-100 hover:to-purple-100 transition-colors"
                            >
                                {{ tag.name }}
                                <span class="text-blue-500 bg-blue-100 rounded-full px-1.5 py-0.5 text-xs">
                                    {{ tag.count }}
                                </span>
                            </span>
                        </div>
                    </div>

                    <!-- Recent Comments -->
                    <!-- <div class="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6">
                        <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center">
                            <svg class="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                            </svg>
                            Recent Comments
                        </h3>
                        <div class="space-y-4">
                            <div 
                                v-for="comment in recentComments" 
                                :key="comment._id"
                                class="border-l-3 border-blue-200 pl-3 hover:border-blue-400 transition-colors"
                            >
                                <div class="flex items-start gap-2 mb-2">
                                    <div class="w-6 h-6 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
                                        <span class="text-white text-xs font-bold">
                                            {{ comment.author?.username?.charAt(0)?.toUpperCase() || 'A' }}
                                        </span>
                                    </div>
                                    <div class="flex-1">
                                        <p class="text-xs font-medium text-gray-700">
                                            {{ comment.author?.username || 'Anonymous' }}
                                        </p>
                                        <p class="text-xs text-gray-500">
                                            {{ formatDate(comment.createdAt) }}
                                        </p>
                                    </div>
                                </div>
                                <p class="text-sm text-gray-600 line-clamp-3 mb-2">
                                    {{ comment.content }}
                                </p>
                                <p class="text-xs text-blue-600 hover:text-blue-800 cursor-pointer">
                                    on "{{ comment.post?.title || 'Post' }}"
                                </p>
                            </div>
                        </div>
                    </div> -->

                    <!-- Quick Stats -->
                    <div class="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-lg p-6">
                        <h3 class="text-lg font-bold text-gray-800 mb-4">Community Stats</h3>
                        <div class="grid grid-cols-2 gap-4">
                            <div class="text-center">
                                <div class="text-2xl font-bold text-blue-600">{{ stats.totalPosts }}</div>
                                <div class="text-xs text-gray-600">Posts</div>
                            </div>
                            <div class="text-center">
                                <div class="text-2xl font-bold text-green-600">{{ stats.totalComments }}</div>
                                <div class="text-xs text-gray-600">Comments</div>
                            </div>
                            <div class="text-center">
                                <div class="text-2xl font-bold text-purple-600">{{ stats.totalAuthors }}</div>
                                <div class="text-xs text-gray-600">Authors</div>
                            </div>
                            <div class="text-center">
                                <div class="text-2xl font-bold text-orange-600">{{ stats.totalTags }}</div>
                                <div class="text-xs text-gray-600">Tags</div>
                            </div>
                        </div>
                    </div>

                    <!-- <button @click="fetchPosts(currentPage - 1)" :disabled="currentPage === 1"
                    class="text-white gap-10 p-5"
                    >
                        Prev
                    </button>
                    <button @click="fetchPosts(currentPage + 1)" :disabled="currentPage === totalPages">
                        Next
                    </button> -->


                </div>
            </div>

        </div>   
    </section>

</template>

<script>
    import api from '../services/api'

    export default{
        name: 'Home',

        data(){
            return{
                posts: [],
                loading: false,
                searchQuery: '',
                  // Sidebar data
                recentComments: [],
                popularTags: [],
                stats: {
                    totalPosts: 0,
                    totalComments: 0,
                    totalAuthors: 0,
                    totalTags: 0
                },
                currentPage: 1,   // which page user is on
                totalPages: 0,    // total number of pages from backend
                limit: 10      // posts per page
            }
        },

        computed: {
            filteredPosts() {
                if (!this.searchQuery.trim()) {
                    return this.posts;
                }
                
                const query = this.searchQuery.toLowerCase();
                return this.posts.filter(post => 
                    post.title?.toLowerCase().includes(query) ||
                    post.content?.toLowerCase().includes(query) ||
                    post.author?.username?.toLowerCase().includes(query) ||
                    post.tags?.some(tag => tag.toLowerCase().includes(query))
                );
            },
            // Get recent posts (last 5 posts)
            recentPosts() {
                return [...this.posts]
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .slice(0, 5);
            }
        },

        methods: {
            async fetchPosts(page = 1){
                this.loading = true;
                try {
                    // const res = await api.get('/posts?page=1&limit=5')
                    const res = await api.get(`/posts?page=${page}&limit=${this.limit}`)
                    this.posts = res.data.posts;
                    this.totalPages = res.data.pages
                    this.currentPage = res.data.page
                    this.calculateStats() 

                } catch (err) {
                    console.error('Error fetching posts', err);
                    
                }finally{
                    this.loading = false;
                }
            },

            searchPosts() {
                // Additional search logic if needed
                console.log('Searching for:', this.searchQuery);
            },

            clearSearch() {
                this.searchQuery = '';
            },

              // Search by tag
            searchByTag(tagName) {
                this.searchQuery = tagName;
            },

            formatDate(dateString){
                if (!dateString) return '';
                const date = new Date(dateString);
                return date.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year:'numeric'
                });
            },

                
            // Fetch recent comments
            // async fetchRecentComments() {
            //     try {
            //         const res = await api.get('/comments/recent?limit=5');
            //         this.recentComments = res.data.comments;
            //     } catch (err) {
            //         console.error('Error fetching recent comments', err);
            //     }
            // },

            // Fetch popular tags
            async fetchPopularTags() {
                try {
                    const res = await api.get('/tags/popular?limit=8');
                    this.popularTags = res.data.tags;
                } catch (err) {
                    console.error('Error fetching popular tags', err);
                    // Fallback: extract tags from posts
                    this.extractTagsFromPosts();
                }
            },

            // Extract tags from posts if API doesn't exist
            extractTagsFromPosts() {
                const tagCount = {};
                this.posts.forEach(post => {
                    if (post.tags && Array.isArray(post.tags)) {
                        post.tags.forEach(tag => {
                            tagCount[tag] = (tagCount[tag] || 0) + 1;
                        });
                    }
                });

                this.popularTags = Object.entries(tagCount)
                    .map(([name, count]) => ({ name, count }))
                    .sort((a, b) => b.count - a.count)
                    .slice(0, 8);
            },

            // Calculate community stats
            calculateStats() {
                this.stats.totalPosts = this.posts.length;
                
                // Count unique authors
                const authors = new Set();
                const allTags = new Set();
                const allComments = new Set();
                
                this.posts.forEach(post => {
                    if (post.author?.username) {
                        authors.add(post.author.username);
                    }
                    if (post.tags && Array.isArray(post.tags)) {
                        post.tags.forEach(tag => allTags.add(tag));
                    } 

                    // if (post.comments && Array.isArray(post.comments)) {
                    //     post.comments.forEach(comment => allComments.add(comment));
                    // }
                });

                this.stats.totalAuthors = authors.size;
                this.stats.totalTags = allTags.size;
            },
            // Initialize all sidebar data
            async initializeSidebar() {
                await Promise.all([
                    this.fetchRecentComments(),
                    this.fetchPopularTags()
                ]);
            }

        },

        async mounted() {
            await this.fetchPosts();
            await this.initializeSidebar();
        },
    }
</script>
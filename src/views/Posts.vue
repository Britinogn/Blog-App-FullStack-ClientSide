<template>

    <div class="min-h-screen bg-gradient-to-br from-slate-300 via-white to-blue-400">
        <!-- Hero Header -->
        <div class="border-b  border-slate-200 shadow-sm">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 class="text-4xl font-semibold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                            Latest Posts
                        </h1>
                        <p class="text-slate-600 mt-2">Discover insights, stories, and ideas from our community</p>
                    </div>
                    
                    <router-link 
                        to="/posts/create" 
                        class="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                        >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                        </svg>
                        Create Post
                    </router-link>
                </div>
            </div>

            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <!-- loading -->
                <div v-if="loading" class="flex items-center justify-center py-20">
                    
                    <div class="text-center">
                        <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mb-4"></div>
                        <p class="text-slate-600 font-medium">Loading amazing content...</p>
                    </div>
                
                </div>

                <!-- Posts Grid -->
                <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    <article 
                        v-for="post in posts" 
                        :key="post._id" 
                        class="group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-slate-200 hover:border-slate-300 transition-all duration-300 overflow-hidden hover:-translate-y-1"
                        >

                        <router-link :to= "{ name: 'PostDetails', params:{id: post._id }} " >

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
                                        :to="{ name:'PostDetails', params:{ id: post._id } }" 
                                        class="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm group/link"
                                    >
                                    <span>Read More</span>
                                    <svg class="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                                    </svg>
                                </router-link>
                                
                                <div class="flex items-center gap-3">
                                    <router-link 
                                        v-if="isOwner(post)"
                                        :to="{ name:'PostEdit', params:{ id: post._id } }" 
                                        class="inline-flex items-center gap-1 text-emerald-600 hover:text-emerald-700 text-sm font-medium"
                                        >
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                                        </svg>
                                        <span>Edit</span>
                                    </router-link>
                                    
                                    <!-- Like Button (optional)
                                    <button class="inline-flex items-center gap-1 text-slate-400 hover:text-red-500 transition-colors">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                                    </svg>
                                    <span class="text-xs">4</span>
                                    </button> -->
                                    
                                </div>
                                </div>
                            </div>

                        </router-link>

                    </article>
                </div>

                <!-- Empty State -->
                <div v-if="!loading && posts.length === 0" class="text-center py-20">
                    <div class="mx-auto w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                        <svg class="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                        </svg>
                    </div>
                    <h3 class="text-xl font-semibold text-slate-900 mb-2">No posts yet</h3>
                    <p class="text-slate-600 mb-6">Be the first to share your thoughts with the community!</p>
                    
                    <router-link 
                        to="/posts/create" 
                        class="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                        >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                        </svg>
                        Create First Post
                    </router-link>
                </div>


            </div>
        </div>

    </div>

</template>

<!-- login -->

<script>
    import api from '../services/api';
    import { auth } from '../services/auth';
import PostDetails from './PostDetails.vue';

    export default{
        data(){
            return{
                posts: [],
                loading: false
            }
        },

        computed:{
            currentUser(){
                return auth.user
            }
        },

        methods:{
            async fetchPosts(){
                this.loading= true;
                try{
                    const res = await api.get('/posts?page=1&limit=20');
                    this.posts = res.data.posts;
                }catch (err){
                    console.err('Error fetching posts', err);
                } finally{
                    this.loading = false;
                }
            },

            isOwner (post){
                return post.author && auth.user && post.author._id === auth.user.id
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
        },

        mounted(){
            this.fetchPosts();
        }
    }

</script>
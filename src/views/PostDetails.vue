<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mb-4"></div>
        <p class="text-slate-600 font-medium">Loading post...</p>
      </div>
    </div>

    <!-- Post Content -->
    <div v-else-if="post" class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Back Navigation -->
      <div class="mb-8">
        <router-link 
          to="/posts" 
          class="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium group transition-colors"
        >
          <svg class="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
          Back
        </router-link>
      </div>

      <!-- Main Post Article -->
      <article class="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden mb-8">
        <!-- Featured Image -->
        <div v-if="post.image?.url" class="relative">
          <img 
            :src="post.image.url" 
            :alt="post.title"
            class="w-full h-80 md:h-96 object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>

        <!-- Post Header -->
        <div class="p-8 md:p-12">
          <div class="flex items-center gap-4 mb-6">
            <div class="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span class="text-white text-lg font-bold">
                {{ post.author?.username?.charAt(0)?.toUpperCase() || 'A' }}
              </span>
            </div>
            <div>
              <p class="font-semibold text-slate-900">{{ post.author?.username || 'Anonymous' }}</p>
              <p class="text-sm text-slate-500">{{ formatDate(post.createdAt) }}</p>
            </div>
          </div>

          <h1 class="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-8">
            {{ post.title }}
          </h1>

          <!-- Post Content -->
          <div class="prose prose-lg prose-slate max-w-none">
            <div class="text-slate-700 leading-relaxed whitespace-pre-line text-lg">
              {{ post.content }}
            </div>
          </div>

          <!-- Action Buttons -->
          <div v-if="isOwner" class="flex items-center gap-4 mt-8 pt-8 border-t border-slate-200">
            <button 
              @click="goEdit"
              class="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
              </svg>
              Edit Post
            </button>
            <button 
              @click="deletePost"
              class="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
              Delete Post
            </button>
          </div>
        </div>
      </article>

      <!-- Comments Section -->
      <div class="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
        <div class="p-8 md:p-12">
          <!-- Comments Header -->
          <div class="flex items-center gap-3 mb-8">
            <svg class="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
            </svg>
            <h2 class="text-2xl font-bold text-slate-900">
              Comments ({{ comments.length }})
            </h2>
          </div>

          <!-- Add Comment Form -->
          <form @submit.prevent="addComment" class="mb-8">
            <div class="relative">
              <textarea 
                v-model="commentText" 
                rows="4" 
                class="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-slate-700 placeholder-slate-500"
                placeholder="Share your thoughts..."
              ></textarea>
            </div>
            
            <div class="flex items-center justify-between mt-4">
              <p v-if="commentError" class="text-red-500 text-sm font-medium">{{ commentError }}</p>
              <div class="flex items-center gap-3 ml-auto">
                <span class="text-sm text-slate-500">{{ commentText.length }}/500</span>
                <button 
                  :disabled="commentLoading || !commentText.trim()"
                  class="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-slate-400 disabled:to-slate-500 text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:transform-none disabled:cursor-not-allowed"
                >
                  <svg v-if="commentLoading" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                  </svg>
                  {{ commentLoading ? 'Posting...' : 'Post Comment' }}
                </button>
              </div>
            </div>
          </form>

          <!-- Comments List -->
          <div v-if="comments.length === 0" class="text-center py-12">
            <div class="w-16 h-16 mx-auto bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <svg class="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-slate-900 mb-2">No comments yet</h3>
            <p class="text-slate-600">Be the first to share your thoughts!</p>
          </div>

          <div v-else class="space-y-6">
            <div 
              v-for="c in comments" 
              :key="c._id" 
              class="group p-6 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 hover:border-slate-300 transition-all duration-200"
            >
              <div class="flex items-start gap-4">
                <div class="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center flex-shrink-0">
                  <span class="text-white text-sm font-bold">
                    {{ c.author?.username?.charAt(0)?.toUpperCase() || 'U' }}
                  </span>
                </div>
                
                <div class="flex-1 min-w-0">
                  <div class="flex items-center justify-between mb-2">
                    <div class="flex items-center gap-2">
                      <h4 class="font-semibold text-slate-900">{{ c.author?.username || 'Anonymous' }}</h4>
                      <span class="text-sm text-slate-500">{{ formatDate(c.createdAt) }}</span>
                    </div>
                    
                    <button 
                      v-if="c.author && c.author._id === currentUserId"
                      @click="deleteComment(c._id)"
                      class="opacity-0 group-hover:opacity-100 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                      </svg>
                    </button>
                  </div>
                  
                  <p class="text-slate-700 leading-relaxed">{{ c.text }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <div class="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4">
          <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-slate-900 mb-2">Post not found</h3>
        <p class="text-slate-600 mb-6">The post you're looking for doesn't exist or has been removed.</p>
        <router-link 
          to="/" 
          class="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
          Back to Posts
        </router-link>
      </div>
    </div>
  </div>
</template>


<script>
    import api from '../services/api'
    import {auth} from '../services/auth';

    export default {
        name: 'PostDetails',
        props: ['id'],
        data(){
            return{
                post: null,
                comments: [],
                loading: false,
                error: '',
                commentText: '',
                commentLoading: false,
                commentError: '',
                currentUserId: auth.user?.id || null
            };
        },

        computed:{
            isOwner(){
                if(!this.post){
                    return false
                }
                if (!this.currentUserId && auth.token) {
                    return false;
                }

                const author = this.post.author;
                const authorId =  author?._id || author;
                return !! (authorId && this.currentUserId && authorId === this.currentUserId);
            },
            postId(){
                return this.id || this.$route.params.id;
            }
        },

        methods:{
            formatDate(dateString){
                if (!dateString) return '';
                const date = new Date(dateString);
                return date.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year:'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                });
            },
            
            async fetchProfileIfNeeded(){
                if (!auth.user && auth.token){
                    try {
                        const res = await api.get('/auth/profile')
                        auth.user ={
                            id: res.data._id || res.data.id,
                            username: res.data.username,
                            email: res.data.email
                        };
                        this.currentUserId = auth.user.id;

                    } catch (e) {
                        console.error('Failed to fetch profile:', e);
                    }
                } else if(auth.user){
                    this.currentUserId = auth.user.id;
                }
            },
            async fetchPost(){
                this.loading = true;
                try {
                    const res = await api.get(`/posts/${this.postId}`);
                    this.post = res.data;
                    if (Array.isArray(this.post.comments) && this.post.comments.length) {
                        this.comments = this.post.comments;
                    } else {
                        await this.fetchComments();
                    }

                } catch (err) {
                    console.error('Erro fetching post:', err)
                }finally{
                    this.loading = false;
                }
            },

            async fetchComments(){
                try {
                    const res = await api.get(`/posts/${this.postId}/comments`);
                    this.comments = res.data;
                } catch (err) {
                    console.error('Error fetching comments:', err);
                    
                }
            },
            async addComment(){
                if (!this.commentText.trim()) {
                   this.commentError = 'Comment cannot be empty' ;
                   return;
                }

                if (this.commentText.length > 500) {
                    this.commentError = 'Comment is too long (max 500 characters)';
                    return;
                }

                this.commentError = '';
                this.commentLoading = true;

                try {
                    const res = await api.post(`/posts/${this.postId}/comments`,{
                        text: this.commentText
                    });
                    
                    this.commentText = ''
                    this.comments.unshift(res.data)

                } catch (err) {
                    console.log('Error posting comments ', err);
                    this.commentError = err.response?.data?.message || 'Failed to post comment'
                } finally{
                    this.commentLoading = false;
                }

            },
            async deleteComment(commentId){
                if(!confirm('Are you sure you want to delete this comment?')) return;

                try {
                    await api.delete(`/posts/${this.postId}/comments/${commentId}`)
                    this.comments = this.comments.filter(c => c._id !== commentId)
                } catch (err) {
                    console.error('Error deleting comments:', err);
                    alert('Failed to delete comment. Please try again');
                }

            },
            goEdit(){
                this.$router.push({name: 'PostEdit', params: {id: this.postId}})
            },
            async deletePost(){
                if(!confirm('Are you sure you want to delete this post? This action cannot be undone')) return;

                try {
                    await api.delete(`/posts/${this.postId}`)
                    this.$router.push({name: 'Posts'})
                } catch (err) {
                    console.error('Error deleting post:', err);
                    alert(err.response?.data?.message ||'Failed to delete post. Please try again');
                } 
            },
        },

        async mounted(){
            await this.fetchProfileIfNeeded()
            await this.fetchPost()
        },


    }
</script>

<style scoped>
.prose {
  line-height: 1.8;
}

.prose p {
  margin-bottom: 1.25em;
}

.prose p:last-child {
  margin-bottom: 0;
}
</style>
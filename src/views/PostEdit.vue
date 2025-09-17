<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mb-4"></div>
        <p class="text-slate-600 font-medium">Loading post for editing...</p>
      </div>
    </div>

    <!-- Main Content -->
    <div v-else-if="post" class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Header Section -->
      <div class="mb-12">
        <div class="flex items-center gap-4 mb-6">
          <router-link 
            :to="{ name: 'PostDetails', params: { id: postId } }" 
            class="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium group transition-colors"
          >
            <svg class="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
            Back to Post
          </router-link>
        </div>
        
        <div class="text-center">
          <h1 class="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-4">
            Edit Your Post
          </h1>
          <p class="text-slate-600 text-lg">Make your content even better</p>
        </div>
      </div>

      <!-- Main Form -->
      <div class="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        <div class="p-8 md:p-12">
          <form @submit.prevent="submit" class="space-y-8">
            <!-- Title Input -->
            <div class="space-y-3">
              <label class="flex items-center gap-2 text-lg font-semibold text-slate-900">
                <svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                </svg>
                Title
                <span class="text-red-500">*</span>
              </label>
              <input 
                v-model="title" 
                type="text"
                class="w-full text-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 px-6 py-4 rounded-xl transition-all duration-200 placeholder-slate-400" 
                placeholder="Enter an engaging title for your post..."
                required 
              />
              <div class="flex justify-between items-center">
                <p class="text-sm text-slate-500">{{ title.length }}/100 characters</p>
                <div v-if="hasUnsavedChanges" class="flex items-center gap-2 text-amber-600">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.598 0L4.268 15.5c-.77.833.192 2.5 1.732 2.5z"/>
                  </svg>
                  <span class="text-sm font-medium">Unsaved changes</span>
                </div>
              </div>
            </div>

            <!-- Content Textarea -->
            <div class="space-y-3">
              <label class="flex items-center gap-2 text-lg font-semibold text-slate-900">
                <svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
                Content
                <span class="text-red-500">*</span>
              </label>
              <textarea 
                v-model="content" 
                rows="12" 
                class="w-full text-lg border-2 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 px-6 py-4 rounded-xl transition-all duration-200 placeholder-slate-400 resize-none" 
                placeholder="Write your post content here..."
                required
              ></textarea>
              <div class="flex justify-between items-center">
                <p class="text-sm text-slate-500">{{ content.length }} characters</p>
                <div class="flex gap-2">
                  <span class="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">Markdown supported</span>
                  <span class="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full">Auto-save enabled</span>
                </div>
              </div>
            </div>

            <!-- Tags Input -->
            <div class="space-y-3">
              <label class="flex items-center gap-2 text-lg font-semibold text-slate-900">
                <svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
                </svg>
                Tags
              </label>
              <input 
                v-model="tags" 
                type="text"
                class="w-full border-2 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 px-6 py-4 rounded-xl transition-all duration-200 placeholder-slate-400" 
                placeholder="vue, javascript, tutorial, web-development"
              />
              <p class="text-sm text-slate-500">Separate tags with commas to help people discover your post</p>
              <div v-if="tagList.length > 0" class="flex flex-wrap gap-2">
                <span 
                  v-for="tag in tagList" 
                  :key="tag"
                  class="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full font-medium"
                >
                  {{ tag.trim() }}
                </span>
              </div>
            </div>

            <!-- Image Upload/Replace -->
            <div class="space-y-4">
              <label class="flex items-center gap-2 text-lg font-semibold text-slate-900">
                <svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
                Featured Image
              </label>

              <!-- Current/New Image Preview -->
              <div v-if="preview || post.image?.url" class="relative inline-block mb-4">
                <img 
                  :src="preview || post.image.url" 
                  class="w-full max-w-md h-48 object-cover rounded-xl border-2 border-slate-200 shadow-lg" 
                  alt="Post image"
                />
                <div v-if="preview" class="absolute top-2 left-2">
                  <span class="px-2 py-1 bg-green-500 text-white text-xs rounded-full font-medium">New Image</span>
                </div>
                <button
                  type="button"
                  @click="removeImage"
                  class="absolute -top-2 -right-2 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition-colors"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>

              <!-- File Upload Area -->
              <div class="relative">
                <input 
                  type="file" 
                  @change="onFileChange" 
                  accept="image/*" 
                  class="hidden"
                  ref="fileInput"
                  id="image-upload-edit"
                />
                <label 
                  for="image-upload-edit"
                  class="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 hover:border-blue-400 rounded-xl cursor-pointer bg-slate-50 hover:bg-blue-50 transition-all duration-200 group"
                >
                  <svg class="w-8 h-8 text-slate-400 group-hover:text-blue-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                  </svg>
                  <p class="text-slate-600 group-hover:text-blue-700 font-medium">
                    {{ (preview || post.image?.url) ? 'Replace image' : 'Upload an image' }}
                  </p>
                  <p class="text-sm text-slate-400">PNG, JPG, GIF up to 10MB</p>
                </label>
              </div>
            </div>

            <!-- Revision History (if applicable) -->
            <div v-if="post.updatedAt && post.updatedAt !== post.createdAt" class="p-4 bg-amber-50 border border-amber-200 rounded-xl">
              <div class="flex items-center gap-2 mb-2">
                <svg class="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <h4 class="font-semibold text-amber-800">Post History</h4>
              </div>
              <p class="text-sm text-amber-700">
                Originally created: {{ formatDate(post.createdAt) }}<br>
                Last updated: {{ formatDate(post.updatedAt) }}
              </p>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-col sm:flex-row items-center gap-4 pt-8 border-t border-slate-200">
              <button 
                type="submit"
                :disabled="saving || !isFormValid"
                class="flex-1 sm:flex-none inline-flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 disabled:from-slate-400 disabled:to-slate-500 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:transform-none disabled:cursor-not-allowed"
              >
                <svg v-if="saving" class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                {{ saving ? 'Updating...' : 'Update Post' }}
              </button>

              <div class="flex items-center gap-4">
                <button
                  type="button"
                  @click="saveDraft"
                  class="inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 px-6 py-3 rounded-lg font-medium hover:bg-slate-100 transition-all duration-200"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12"/>
                  </svg>
                  Save Draft
                </button>

                <button
                  type="button"
                  @click="previewPost"
                  class="inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 px-6 py-3 rounded-lg font-medium hover:bg-slate-100 transition-all duration-200"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                  Preview
                </button>

                <router-link 
                  :to="{ name: 'PostDetails', params: { id: postId } }" 
                  class="inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 px-6 py-3 rounded-lg font-medium hover:bg-slate-100 transition-all duration-200"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                  Cancel
                </router-link>
              </div>
            </div>

            <!-- Error Message -->
            <div v-if="error" class="p-4 bg-red-50 border border-red-200 rounded-xl">
              <div class="flex items-center gap-2">
                <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <p class="text-red-700 font-medium">{{ error }}</p>
              </div>
            </div>

            <!-- Success Message -->
            <div v-if="successMessage" class="p-4 bg-green-50 border border-green-200 rounded-xl">
              <div class="flex items-center gap-2">
                <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <p class="text-green-700 font-medium">{{ successMessage }}</p>
              </div>
            </div>
          </form>
        </div>
      </div>

      <!-- Edit Tips -->
      <div class="mt-12 bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
        <h3 class="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
          <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          Editing Tips
        </h3>
        <div class="grid md:grid-cols-2 gap-6">
          <div class="space-y-3">
            <h4 class="font-semibold text-slate-800">Best practices:</h4>
            <ul class="space-y-2 text-sm text-slate-600">
              <li class="flex items-center gap-2">
                <div class="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                Review for clarity and flow
              </li>
              <li class="flex items-center gap-2">
                <div class="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                Update tags for better discovery
              </li>
              <li class="flex items-center gap-2">
                <div class="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                Refresh images if needed
              </li>
              <li class="flex items-center gap-2">
                <div class="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                Preview before publishing
              </li>
            </ul>
          </div>
          <div class="space-y-3">
            <h4 class="font-semibold text-slate-800">Remember:</h4>
            <ul class="space-y-2 text-sm text-slate-600">
              <li class="flex items-center gap-2">
                <div class="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                Changes are auto-saved as drafts
              </li>
              <li class="flex items-center gap-2">
                <div class="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                Original creation date is preserved
              </li>
              <li class="flex items-center gap-2">
                <div class="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                Update timestamp will be added
              </li>
              <li class="flex items-center gap-2">
                <div class="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                Readers will see "Updated" badge
              </li>
            </ul>
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
        <p class="text-slate-600 mb-6">The post you're trying to edit doesn't exist or you don't have permission to edit it.</p>
        <router-link 
          to="/posts" 
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
    import {auth} from '../services/auth'

    export default{
        name: 'PostEdit',

        data(){
            return{
                post: null,
                title: '',
                content: '',
                tags: '',
                file: null,
                preview: null,
                loading: false,
                saving: false,
                error: '',
                successMessage: '',
                currentUserId: auth.user?.id || null,
                originalData: null
            }
        },
        computed:{
            postId(){
                return this.$route.params.id;
            },
            isFormValid(){
                return this.title.trim().length > 0 && this.content.trim().length > 0;
            },
            tagList(){
                return this.tags ? this.tags.split(',').filter(tag => tag.trim()): [];
            },
            hasUnsavedChanges(){
                if (!this.originalData) return false;
                return(
                    this.title !== this.originalData.title ||
                    this.content !== this.originalData.content ||
                    this.tags !== this.originalData.tags ||
                    this.file !== null
                );
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
            async loadPost(){
                this.loading = true;
                try {
                    const res = await api.get(`/posts/${this.postId}`);
                    this.post = res.data;
                    this.title = this.post.title;
                    this.content = this.post.content;
                    this.tags = (this.post.tags && this.post.tags.join(',')) || '';

                    // store original data for comparison
                    this.originalData = {
                        title: this.title,
                        content: this.content,
                        tags: this.tags
                    }

                } catch (err) {
                    console.log('Error loading post:', err);
                    this.error = err.response?.data?.message || 'Failed to load post'
                }finally{
                    this.loading = false;
                }
            },
            onFileChange(e){
                const f = e.target.files[0];
                if(!f){
                    this.removeImage();
                    return
                }

                //validate file size (10mb limit)
                if (f.size > 10 * 1024 * 1024) {
                    this.error = 'Image file size must be less than 10mb';
                    e.target.value = '';
                    return;
                }
                
                //validate file type 
                if (!f.type.startsWith('image/')) {
                    this.error = 'Please select a valid image file';
                    e.target.value = '';
                    return;
                }

                this.file = f;
                this.preview = URL.createObjectURL(f)
                this.error = '';
            },
            removeImage(){
                if (this.preview){
                    URL.revokeObjectURL(this.preview)
                }
                this.file = null;
                this.preview = null;
                this.$refs.fileInput.value = '';
            },
            async saveDraft(){
                this.successMessage = 'Draft saved Locally';
                setTimeout(() => {
                    this.successMessage = ''
                }, 3000);

                //this saves draft locally to localStorage
                localStorage.setItem(`PostEditDraft_${this.postId}` , JSON.stringify({
                    title: this.title,
                    content: this.content,
                    tags:this.tags,
                    timestamp: new Date().toISOString()
                }));
            },
            previewPost(){
                this.successMessage = 'Preview feature coming soon!';
                setTimeout(() => {
                    this.successMessage = ''
                }, 3000);
            },

            async submit(){
                this.error ='';
                this.successMessage= ''
                
                if (!this.isFormValid){
                    this.error = 'Title and content are required';
                    return;
                }

                if (this.title.length > 100) {
                    this.error = 'Title must be 100 character or less';
                    return;
                }

                const fd = new FormData();
                fd.append('title', this.title.trim());
                fd.append('content', this.content.trim());
                fd.append('tags', this.tags.trim());

                if(this.file){
                    fd.append('image', this.file);
                }

                this.saving = true;
                
                try {
                    await api.put(`/posts/${this.postId}`, fd);

                    //clear draft from localStorage
                    localStorage.removeItem(`PostEditDraft_${this.postId}`);

                    //show access and rederict
                    this.successMessage = 'Post updated successfully!';

                    setTimeout(() => {
                        this.$router.push({
                            name: 'PostDetails',
                            params: { id: this.postId }
                        })
                    }, 1000);

                } catch (err) {
                    console.error('Error updating post:', err);
                    this.error = err.response?.data?.messsage || 'Failed to update post , please try again';
                }finally{
                    this.saving = false;
                }
            
            
            },
            loadDraft(){
                const  draft = localStorage.getItem(`PostEditDraft_${this.postId}`);
                if (draft) {
                    try {
                        const parsed = JSON.parse(draft);
                        if (confirm('Load saved draft?')) {
                            this.title = parsed.title || '';
                            this.content = parsed.content || '';
                            this.tags = parsed.tags || '';
                        }
                    } catch (e) {
                        console.error('Error loading draft:', e);
                        
                    }
                }
            }
        },
        async mounted(){
            await this.fetchProfileIfNeeded()
            await this.loadPost()
        },

        beforeUnmount() {
            if(this.preview) URL.revokeObjectURL(this.preview)
        },

    }

</script>



<style scoped>
textarea:focus,
input:focus {
  outline: none;
}

/* Smooth transitions for all interactive elements */
* {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
</style>
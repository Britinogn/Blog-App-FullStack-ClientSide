<template>

    <div class="min-h-screen bg-gradient-to-br from-slate-400 via-white to-blue-500">

        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <!-- Header Section -->
            <div class="text-center mb-12">
                <h1 class="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-4">
                Create New Post
                </h1>
                <p class="text-slate-600 text-lg">Share your thoughts and ideas with the community</p>
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
                            <p class="text-sm text-slate-500">{{ title.length }}/100 characters</p>
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
                            placeholder="Write your post content here. Share your insights, experiences, and ideas..."
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

                        <!-- Image Upload -->
                        <div class="space-y-4">
                        <label class="flex items-center gap-2 text-lg font-semibold text-slate-900">
                            <svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                            </svg>
                            Featured Image
                        </label>

                        <!-- File Upload Area -->
                        <div class="relative">
                            <input 
                            type="file" 
                            @change="onFileChange" 
                            accept="image/*" 
                            class="hidden"
                            ref="fileInput"
                            id="image-upload"
                            />
                            <label 
                            for="image-upload"
                            class="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 hover:border-blue-400 rounded-xl cursor-pointer bg-slate-50 hover:bg-blue-50 transition-all duration-200 group"
                            >
                            <svg class="w-8 h-8 text-slate-400 group-hover:text-blue-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                            </svg>
                            <p class="text-slate-600 group-hover:text-blue-700 font-medium">Click to upload an image</p>
                            <p class="text-sm text-slate-400">PNG, JPG, GIF up to 10MB</p>
                            </label>
                        </div>

                        <!-- Image Preview -->
                        <div v-if="preview" class="relative inline-block">
                            <img 
                            :src="preview" 
                            class="w-full max-w-md h-48 object-cover rounded-xl border-2 border-slate-200 shadow-lg" 
                            alt="Preview"
                            />
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
                        </div>

                        <!-- Action Buttons -->
                        <div class="flex flex-col sm:flex-row items-center gap-4 pt-8 border-t border-slate-200">
                        <button 
                            type="submit"
                            :disabled="loading || !isFormValid"
                            class="flex-1 sm:flex-none inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-slate-400 disabled:to-slate-500 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:transform-none disabled:cursor-not-allowed"
                        >
                            <svg v-if="loading" class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                            </svg>
                            {{ loading ? 'Publishing...' : 'Publish Post' }}
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

                            <router-link 
                            to="/" 
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

            <!-- Writing Tips Sidebar -->
            <div class="mt-12 bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
                <h3 class="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                </svg>
                Writing Tips
                </h3>
                <div class="grid md:grid-cols-2 gap-6">
                <div class="space-y-3">
                    <h4 class="font-semibold text-slate-800">Great posts include:</h4>
                    <ul class="space-y-2 text-sm text-slate-600">
                    <li class="flex items-center gap-2">
                        <div class="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                        Clear, descriptive titles
                    </li>
                    <li class="flex items-center gap-2">
                        <div class="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                        Well-structured content
                    </li>
                    <li class="flex items-center gap-2">
                        <div class="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                        Relevant tags for discovery
                    </li>
                    <li class="flex items-center gap-2">
                        <div class="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                        Eye-catching featured images
                    </li>
                    </ul>
                </div>
                <div class="space-y-3">
                    <h4 class="font-semibold text-slate-800">Pro tips:</h4>
                    <ul class="space-y-2 text-sm text-slate-600">
                    <li class="flex items-center gap-2">
                        <div class="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        Use Markdown for formatting
                    </li>
                    <li class="flex items-center gap-2">
                        <div class="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        Save drafts frequently
                    </li>
                    <li class="flex items-center gap-2">
                        <div class="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        Preview before publishing
                    </li>
                    <li class="flex items-center gap-2">
                        <div class="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        Engage with comments
                    </li>
                    </ul>
                </div>
                </div>
            </div>

        </div>

    </div>

</template>

<script>
    import api from '../services/api'
    
    export default{
        name: 'PostCreate',
        data(){
            return{
                title: '',
                content: '',
                tags: '',
                file: null,
                preview: null,
                loading: false,
                error: '',
                successMessage: ''
            }
        },

        computed:{
            isFormValid(){
                return this.title.trim().length > 0 && this.content.trim().length > 0;
            },
            tagList(){
                return this.tags ? this.tags.split(',').filter(tag => tag.trim()): [];
            }
        },

        methods:{
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
                localStorage.setItem('PostDraft' , JSON.stringify({
                    title: this.title,
                    content: this.content,
                    tags:this.tags,
                    timestamp: new Date().toISOString()
                }));
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

                this.loading = true;
                
                try {
                    const res = await api.post('/posts', fd);

                    //clear draft from localStorage
                    localStorage.removeItem('postDraft');

                    //show access and rederict
                    this.successMessage = 'Post created successfully!';

                    setTimeout(() => {
                        this.$router.push({
                            name: 'PostDetails',
                            params: { id: res.data._id }
                        })
                    }, 1000);

                } catch (err) {
                    console.error('Error creating post:', err);
                    this.error = err.response?.data?.messsage || 'Failed to create post , please try again';
                }finally{
                    this.loading = false;
                }
            
            
            },
            loadDraft(){
                const  draft = localStorage.getItem('PostDraft');
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

            },
        },

        mounted() {
            this.loadDraft();
        },
        beforeUnmount() {
            if(this.preview){
                URL.revokeObjectURL(this.preview)
            }
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
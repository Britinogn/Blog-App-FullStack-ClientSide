<template>
    <section 
        class="bg-gradient-to-r from-white/95 to-black/15 h-screen  flex items-center justify-center "
        >

        <form @submit.prevent="submit" 
            class="bg-white/85 mx-auto p-8 rounded-lg shadow-2xl/75 w-96"
            >

            <h1 class="text-center text-3xl mb-4 font-bold text-gray-700">Create your Account</h1>
            <p class="text-center text-sm md:text-md mb-6 text-gray-500">
                Join us today and start sharing your stories!
            </p>

            
            <div class="form-card">
                <label for="name" class="font-medium text-gray-600">Username</label>
                <input 
                type="text"
                id="name"
                v-model="username"
                placeholder="Enter your fullname" 
                >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
            </div>

            <div class="form-card">
                <label for="email" class="font-medium  text-gray-600">Email Address</label>
                <input 
                type="email" 
                id="email"
                v-model="email"
                placeholder="Enter your email" >

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>

            </div>

            <div class="form-card">
                <label for="password" class="font-medium  text-gray-600">Password</label>
                <input 
                type="password"
                id="password"
                v-model="password"
                placeholder="Enter your password " >

                <svg xmlns="http://www.w3.org/2000/svg" 
                    height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
                    <path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z"/>
                </svg>
            </div>

            <div class="btn" >
                <button 
                    :disabled="loading" 
                    type="submit" class="cursor-pointer text-lg disabled:cursor-not-allowed ">

                    <!-- <span class="absolute ">
                        <svg v-if="loading" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    </span> -->
                
                    <span v-if="loading">Creating Account.......</span>
                    <span v-else>Register</span>
                    
                </button>
            </div>

            <p v-if="error" class="text-center font-mono bg-green-200 rounded-md p-1 mt-3">
                {{ error }}   
            </p>

            <div class="text-center mt-4">
                Already have an account? 
                <router-link to="/login" 
                    class="text-blue-900 underline p-3 rounded-md"
                    > Login
                </router-link>
            </div>

        </form>

    </section>
</template>

<script>
    import api from '../services/api';
    import { setToken } from '../services/auth';

    export default{
        data(){
            return{
                username: '',
                email: '',
                password: '',
                error: '',
                loading: false
            }
        },

        methods: {
            async submit(){
                this.loading = true;
                this.error = '';

                try {
                    //register endpoint
                    await api.post('/auth/register', 
                    {
                        username: this.username,
                        email: this.email,
                        password: this.password
                    });

                    //login right after registeration
                    const res = await api.post('/auth/login',
                    {
                        email: this.email,
                        password: this.password
                    });

                    setToken(res.data.token);
                    this.$router.push({name: 'Posts'})

                } catch (err) {
                    this.error = err.response?.data?.message || 'Registration Failed'
                } finally{
                    this.loading = false;
                }
            }
        }
    }
</script>
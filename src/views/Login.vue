<template>
    <section 
        class="bg-gradient-to-r from-white/95 to-black/15 h-screen  flex items-center justify-center "
        >

        <form @submit.prevent="submit" 
            class="bg-white/85 mx-auto p-8 rounded-lg shadow-2xl/75 w-96"
            >

            <h1 class="text-center  text-3xl mb-4 font-bold text-gray-700">Log In </h1>
            <p class="text-center text-sm md:text-md mb-6 text-gray-500">
                Connect with your blog and share your 
                stories with the world.
            </p>


            <div class="form-card">
                <label for="email" class="font-medium  text-gray-600">Email Address</label>
                <input 
                type="email" 
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
                v-model="password"
                placeholder="Enter your password " >

                <svg xmlns="http://www.w3.org/2000/svg" 
                    height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
                    <path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z"/>
                </svg>
            </div>

            <div class="btn">
                <button
                    :disabled="loading" 
                    type="submit" class="cursor-pointer text-lg">
                    <span v-if="loading">Logging......</span>
                    <span v-else>Log In</span>
                </button>

            </div>

            <p v-if="error" class="text-center font-mono bg-green-200 rounded-md p-1 mt-3">
                {{ error }}   
            </p>

            <p class="text-center mt-4">
                Don't have an account?
                <router-link to="/register" 
                    class="text-blue-900 underline p-3 rounded-md"
                    >Register
                </router-link>
            </p>    


        </form>

    </section>
</template>

<script>
    import api from '../services/api'
    import {setToken} from '../services/auth'

    export default{
        data(){
            return{
                email: '',
                password: '',
                error: '',
                loading: false
            }
        }, 

        methods: {
            async submit(){
                this.error = ''
                this.loading = true;

                try {
                    const res = await api.post('/auth/login',
                    {
                        email: this.email,
                        password: this.password
                    });
                    
                    const token = res.data.token;
                    setToken(token);
                    // this.$notify('Login Successful!')
                    this.$router.push ({name: 'Posts'});
                    
                } catch (err) {
                    this.error = err.response?.data?.message || 'Login failed'
                } finally{
                    this.loading = false;
                }
            }
        },
    }
</script>
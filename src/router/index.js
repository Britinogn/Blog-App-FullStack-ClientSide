import {createRouter, createWebHistory} from 'vue-router'

//import all pages
import  Posts from '../views/Posts.vue'
import  Home from '../views/Home.vue'
import  Login from '../views/Login.vue'
import  PostCreate from '../views/PostCreate.vue'
import  PostDetails from '../views/PostDetails.vue'
import  PostEdit from '../views/PostEdit.vue'
import  Register from '../views/Register.vue'
import {auth} from '../services/auth'

//define the routes
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },

    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta:{hideNavbar: true}
    },

    {
        path: '/register',
        name: 'Register',
        component: Register,
        meta:{hideNavbar: true}
    },

    {
        path: '/posts/:id',
        name: 'PostDetails',
        component: PostDetails,
        props: true
    },

    {
        path: '/posts/create',
        name: 'PostCreate',
        component: PostCreate,
        meta:{requiresAuth: true}
    },

    {
        path: '/posts/:id/edit',
        name: 'PostEdit',
        component:  PostEdit,
        meta:{requiresAuth: true},
        props: true
    },

    {
        path: '/posts',
        name: 'Posts',
        component: Posts,
        meta:{requiresAuth: true}
    },

]

// register route

const router  = createRouter({
    history: createWebHistory(),
    routes  
})


router.beforeEach((to , from , next) => {
   const requiresAuth = to.meta.requiresAuth;
   const loggedIn = !!(auth.token || localStorage.getItem('token'));
   if (requiresAuth && !loggedIn) return next ({name: 'Login'});
   if((to.name === 'Login' || to.name === 'Register')&& loggedIn) return next({name: 'Posts'});
   next();
})

export default router;
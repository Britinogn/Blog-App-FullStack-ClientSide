<script>

  import NavBar from './components/NavBar.vue'
  import Footer from './components/Footer.vue';

  export default{
    components:{
      NavBar,
      Footer
    }
  }
</script>

<template>  
  <!-- <notification position = 'bottom'/> -->
  
  <NavBar v-if="!$route.meta.hideNavbar"/>
  

  <router-view></router-view>
  <Footer v-if="!$route.meta.hideFooter"/>
</template>

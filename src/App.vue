<script>

  import NavBar from './components/NavBar.vue'

  export default{
    components:{
      NavBar
    }
  }
</script>

<template>  
  <!-- <notification position = 'bottom'/> -->
  
  <NavBar/>

  <router-view></router-view>
</template>

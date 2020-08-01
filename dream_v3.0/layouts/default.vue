<template>

<v-app>
  <Menu/>
<v-content id="app">
  <nuxt/>
</v-content>
</v-app>
</template>


<script>
  import Menu from "../components/Menu";
  export default {
    components:{
      Menu
    },
  }
</script>

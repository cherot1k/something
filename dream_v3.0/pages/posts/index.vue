<template>
  <v-container class="my-5">
    <v-row>
      <Blog v-for="item in blog_Posts"
            :key="item.title"
            v-bind:itemTitle="item.title"
            v-bind:itemBody="item.subTitle"
            v-bind:id = "item.id"
            class="col-2 ma-3"

      />
    </v-row>
  </v-container>
</template>
<script>
  import Blog from '@/components/BlogCard'
  export default {
    components:{
      Blog
    },
    middleware:'auths',
    computed:{
      blog_Posts(){
        return this.$store.getters['blog/blog_posts']
      }
    }
  }
</script>

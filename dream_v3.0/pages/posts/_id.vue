<template>
  <v-container>
    <v-layout justify-center>
    <v-card class="ma-5 col-6" max-width="600px">
      <v-card-title  class="ma-2 justify-center" v-html="getCurrentPost.title" ></v-card-title>   <!--  -->
      <v-card-subtitle class="ma-2" v-html="getCurrentPost.username"> </v-card-subtitle>  <!-- -->
      <v-img  class="ma-2" alt="img" :src="`${img_src}`"></v-img>
      <v-card-text class="ma-2 black--text -bold" v-html="getCurrentPost.body"> </v-card-text>
      <v-flex class='mx-3'>
      <v-btn icon @click="liked = !liked" v-if="liked">
        <v-icon> favorite </v-icon>
      </v-btn>
        <v-btn icon @click="liked = !liked" v-else>
        <v-icon>  favorite_border </v-icon>
        </v-btn>
      </v-flex>
    </v-card>
    </v-layout>
    <v-row>
      <v-flex>

      </v-flex>
    </v-row>
  </v-container>
</template>

<script>
export default {
  middleware:'auths',
   async mounted() {
    await this.$store.dispatch('blog/setCurrentPost',this.$route.params.id)
  },
  validate ({ params }) {
    // Must be a number
    return /^\d+$/.test(params.id)
  },
  data(){
    return{
      liked:false
    }
  },
  computed:{
    posts() {
      return this.$store.getters['blog/blog_posts']
    },
    // imgSrc(){
    //   return this.currentPost.img
    // },
     getCurrentPost(){
      return this.$store.getters['blog/currentPost']
     },
    img_src(){
      return this.getCurrentPost.img
    }
  }
}
</script>

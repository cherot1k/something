<template>
  <v-lazy >
  <v-container class="my-5">
    <div>
    <v-row justify="center">
    <v-flex flat row class="col-8 pb-3 justify-center" >

              <NewProject class="mx-5"/>

              <v-btn class="grey--text mx-5">
                <v-icon>
                  sort
                </v-icon>
                Sort by deadline
              </v-btn>



              <v-btn class="grey--text mx-5" @click="sortBy('title')">
                <v-icon>
                  sort
                </v-icon>
                Sort by name
              </v-btn>

    </v-flex>
    <v-card flat class="col-8">
      <v-layout row wrap>
        <v-expansion-panels>
          <v-expansion-panel
            v-for="(item,i) in posts"
            :key="i"
          >
            <v-expansion-panel-header>
              <v-layout>
                <v-flex xs8 sm8 md8 lg8>
                  <div class="caption grey--text">Title:</div>
                  <div > {{item.title}}</div>
                </v-flex>
                <v-flex xs4 sm4 md4 lg4>
                  <div class="caption grey--text">Date of deadline:</div>
                  <div > {{item.deadline}}</div>
                </v-flex>
              </v-layout>

            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-layout wrap >
                <v-flex xs8 sm8 md8 lg8>
                  <div class="caption grey--text">Things todo:</div>
                  <div > {{item.body}}</div>
                </v-flex>
                <v-flex xs4 sm4 md4 lg4>
                  <div class="caption grey--text">Status:</div>
                  <div > {{item.status}}</div>
                </v-flex>
                <v-flex xs8 sm8 md8 lg8 class="mt-2">
                  <Edit v-bind:post="item"></Edit>
                </v-flex>
                <v-flex xs4 sm4 md4 lg4 class="mt-2">
                  <v-btn @click="removePost(item.id)">
                    <v-icon>highlight_off</v-icon>
                    DELETE
                  </v-btn>
                </v-flex>

              </v-layout>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-layout>
    </v-card>

    <v-flex  row class="mt-5 justify-center col-12" >
      <v-btn @click="savePost">
        <v-icon> save </v-icon>
        Save
      </v-btn>
    </v-flex>
    </v-row>
    </div>
  </v-container>
  </v-lazy>
</template>
<script>

 import NewProject from "../components/NewProject";
 import Edit       from "../components/Edit";
 import Reg from "../components/Registration";

  export default {
  methods:{
      sortBy(prop){
        this.posts.sort((a,b) => a[prop].toUpperCase() < b[prop].toUpperCase()?-1: 1)
      },
      async removePost(postId){
        await this.$store.dispatch('posts/removePost',postId)
      },
      async savePost(){
        const posters = this.posts
        await this.$store.dispatch('posts/savePost',posters)
      }
    },
    computed:{
      posts() {
        return this.$store.getters['posts/posts']
      },
      post_length(){
        return this.$store.getters['posts/post_length']
      },
      user(){
        return this.$store.getters['user']
      },
      username(){
        return this.user ? this.user.login : ''
      }
    },
    async mounted() {
     const username =this.username
      await this.$store.dispatch('posts/fetch', username)
    },
    components:{
     NewProject,
      Edit,

    }
  }
</script>



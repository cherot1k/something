<template>
  <div class="text-center">
    <v-dialog v-model="dialog" max-width="700px">
      <template v-slot:activator="{ on }">
        <v-btn   class="grey--text" v-on="on">
          <v-icon>folder</v-icon>
          Add New Project
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>Add a New Project</v-card-title>
        <v-card-text >

          <v-form class="mx-3" ref="form" >
            <v-text-field label="Title:" prepend-icon="title" v-model="postTitle"></v-text-field>
            <v-textarea label="Things:" prepend-icon="create" v-model="postBody"></v-textarea>
            <v-menu max-width="290">
              <template v-slot:activator="{ on }">
                <v-text-field :value="date" label="Due date" prepend-icon="calendar_today" v-on="on"></v-text-field>
              </template>
              <v-date-picker v-model="date"></v-date-picker>
            </v-menu>
            <v-btn @click="addPost" >
              Send
              <v-icon right>send</v-icon>
            </v-btn>

          </v-form>

        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import format from 'date-fns/format'
  import parseISO from 'date-fns/parseISO'
  export default {

    data() {
      return {
        dialog: false,
        date:null,
        postTitle: '',
        postBody : '',

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
    methods:{
      async addPost(){
        const post = {
          id: this.post_length  + 1,
          title : this.postTitle,
          body : this.postBody,
          date: this.date,
          username : this.username
        }

        await this.$store.dispatch ( 'posts/add', post )

        this.postTitle =''
        this.postBody =''
      },
    }
  }
</script>

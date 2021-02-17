<template>
  <div class="text-center">
    <v-dialog v-model="dialog1" max-width="700px">
      <template v-slot:activator="{ on }">
        <v-btn   class="grey--text" v-on="on">
          <v-icon>build</v-icon>
          Edit
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>Edit</v-card-title>
        <v-card-text >

          <v-form class="mx-3" ref="form" >
            <v-text-field label="Title:" prepend-icon="title" v-model="copy_post.title"></v-text-field>
            <v-textarea label="Things:" prepend-icon="create" v-model="copy_post.body"></v-textarea>
            <v-menu max-width="290">
              <template v-slot:activator="{ on }">
                <v-text-field :value="copy_post.date" label="Due date" prepend-icon="calendar_today" v-on="on"></v-text-field>
              </template>
              <v-date-picker v-model="copy_post.date"></v-date-picker>
            </v-menu>
            <v-btn  >  <!-- //TODO make save post -->
              Save
              <v-icon right> send</v-icon>
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
    props:{
      post:{
        type:Object
      }
    },
    data() {
      return {
        dialog1: false,
        copy_post:{
          id:this.post.id || '',
          title:this.post.title || '',
          body:this.post.body || '',
          date:this.post.deadline || ''
        }
      }
    },
    methods:{
      async editPost(){
        const postForEdit = {
          id: this.copy_post.id,
          title:this.copy_post.title,
          body: this.copy_post.body,
          deadline: this.copy_post.date
        }
        await this.$store.dispatch('posts/editPost', postForEdit)
      }
    },

  }
</script>

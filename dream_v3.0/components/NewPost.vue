<template>
  <div class="text-center">
    <v-dialog v-model="dialog2" max-width="900px">
      <template v-slot:activator="{ on }">
        <v-btn   class="grey--text" v-on="on">
          <v-icon>build</v-icon>
          Add Post
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>Add Post</v-card-title>
        <v-card-text >

          <v-form class="mx-3" ref="form" >
            <v-text-field label="Src of title img:" prepend-icon="add_a_photo" ></v-text-field>
            <v-text-field label="Title:" prepend-icon="title" ></v-text-field>
            <v-textarea label="Story:" prepend-icon="create" ></v-textarea>

            <v-btn icon>  <!-- //TODO make save post -->

              <v-icon right> save_alt</v-icon>
            </v-btn>

          </v-form>

        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
  export default {
    data(){
      return{
        dialog2:false
      }
    },

  }
</script>

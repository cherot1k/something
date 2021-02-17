<template>
  <div class="text-center">
    <v-dialog v-model="dialog_log" max-width="700px">
      <template v-slot:activator="{ on }">
        <v-btn   class="grey--text" v-on="on">
          <v-icon>account_box</v-icon>
          SIGN IN
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title >
          <v-icon> account_box </v-icon>
          SIGN IN
        </v-card-title>
        <v-card-text >

          <v-form class="mx-3" ref="form" >
            <v-text-field label="Login:" prepend-icon="email" type="email" :rules="[rules.required, rules.min]" v-model="email"></v-text-field>
            <v-text-field label="Password:" prepend-icon="lock" type="password" :rules="[rules.required, rules.min]" v-model="password"></v-text-field>
            <v-row justify="center">
              <v-flex  class=" justify-center align-center col-4">
            <v-btn @click="log_me" class="blue--text" >
              Send
              <v-icon right>send</v-icon>
            </v-btn>
              </v-flex>
            </v-row>
          </v-form>

        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import axios    from 'axios'
  import Reg from '../components/Registration'
  export default {
    data() {
      return {
        dialog_log: false,
        email: 'lulok2t@gmail.com',
        password: 'qwaszx20022002',
        rules:{
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters'
        }
      }
    },methods: {
      async log_me() {

        // const response = await fetch('http://localhost:9000/login',{
        //   login: this.email,
        //   password: this.password
        // })
        const response = await this.$axios.post('/login',{
            login: this.email,
            password: this.password,
          })
        try {
          const newUser = {
            login: response.data.user.login || '',
            password: response.data.user.password || ''
          }

          await this.$store.dispatch('setUser', newUser)
          await this.$store.dispatch('setToken', response.data.token)
          await this.$store.dispatch('posts/fetch', this.email)
        }catch (e) {
          console.log(e)
        }
      },
    },
    computed:{
      username(){
        return this.user ? this.user.login : ''
      }
    },

  }
</script>

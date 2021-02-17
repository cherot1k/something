<template>
  <div>
    <v-navigation-drawer app  v-model="draw" absolute class="overflow-hidden">
      <v-list-item-group v-model="item" color="primary">
        <v-list-item
          v-for="(item,i) in items" :key="i" class="mt-4" nuxt :to='item.route'
        >

          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text" router></v-list-item-title>
          </v-list-item-content>

        </v-list-item>
      </v-list-item-group>

    </v-navigation-drawer>
    <nav>
      <v-app-bar flat app>
        <v-app-bar-nav-icon @click="draw = !draw"></v-app-bar-nav-icon>

        <v-toolbar-title class="text-uppercase  ">
          <span>Violence</span>
          <span class="font-weight-bold">Kaleidoscope</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>

         <div class="mx-5">
           <v-btn v-if="loggedIn" @click="logout">
             <span class="black-text darken-3">LOGOUT </span>
             <v-icon size="35" right >exit_to_app</v-icon>
           </v-btn>
            <v-row v-else >
              <Login class="mx-5" />
              <Reg/>
            </v-row>


         </div>




      </v-app-bar>
    </nav>
  </div>
</template>

<script>
import Login    from "./Login"
import axios from "../.nuxt/axios";
import Reg from "./Registration";
  export default {
    data(){
      return{
        item:1,
        draw:false,
        login:true,
        items:[
          {text:'TODO', icon:'assignment_ind' , route : '/'},
          {text:'BLOG',icon:'book', route:'/posts'}
        ]
      }
    },methods:{
      async logout(){
       await this.$store.dispatch('logout')
      }
    },
    computed:{
    loggedIn(){
      return this.$store.getters['loggedIn']
    }
    },
    components:{
      Login,
      Reg
    }

  }
</script>




<template>
  <v-card

    max-width="344"
  >
    <v-img
      src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
      height="200px"
    ></v-img>

    <v-card-title>
      {{itemTitle}}
    </v-card-title>

    <v-card-subtitle>
      {{itemBody}}
    </v-card-subtitle>

    <v-card-actions>

      <v-btn
        color="purple"
        text
        class="font-weight-bold"
        @click="route_me(id)"
      >
        Explore
      </v-btn>

      <v-spacer></v-spacer>
    </v-card-actions>


  </v-card>
</template>
<script>
export default {
  props:{
    itemTitle:{
      type:String,
    },
    itemBody:{
      type:String
    },
    id:{
      type:Number
    }
  },
  methods:{
    route_me(id){
      this.$router.push(`/posts/${id-1}`)
    }
  }
}
</script>

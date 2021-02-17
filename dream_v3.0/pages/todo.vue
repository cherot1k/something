<template>
  <div>
    <div>
      <Menu/>
    </div>
    <div class="todo-list col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <div class="input form-group ">
          <div class="form-control input_block">
            <div class="test ">
            <label for="title" class="align-middle label_form">Title: </label>
          <input  id="title" class="input-field align-middle" v-model="postTitle" v-bind:placeholder="titlePlaceholder">
            </div>
          </div>
          <div class="form-control input_block">
            <div class="test">
            <label for="post" class="label_form"> Post: </label>
            <input required   type="text" id="post" v-model="postBody" v-bind:placeholder="bodyPlaceholder">
            </div>
          </div>
          <div class="input_block">
              <div >
            <button class="btn btn-success" @click="addPost">Add post</button>
              </div>
          </div>
        </div>
        <div   class="post_block">
          <table class="table">
            <thead>
            <tr>
              <th scope="col">id   </th>
              <th scope="col">Title </th>
              <th scope="col">Post</th>
            </tr>
            </thead>
            <tbody>
            <tr  v-for="item in posts"  >

              <th scope="row" @dblclick="removePost(item.id)"> {{item.id}} </th>
              <td @dblclick="removePost(item.id)">  {{item.title}}  </td>
              <td @dblclick="removePost(item.id)">  {{item.body}}  </td>

            </tr>
            </tbody>
          </table>
          <div class=" btn-group text-center d-block">
          <span>
            <button type="button" class="btn btn-success btn-lg mx-auto" @click="savePost">SAVE POSTS</button>
         </span>
          </div>
        </div>
      <div class="container">
        <nuxt/>

      </div>
    </div>
  </div>
</template>

<script>
  import Menu from "@/components/Menu"

  export default {
    async fetch({store}) {

        await store.dispatch('posts/fetch')

    },
    data: () => ({
        postTitle: '',
        postBody : '',
        titlePlaceholder:'Input you title here',
        bodyPlaceholder :'Input post here'
    }),
    computed: {
      posts() {
        return this.$store.getters['posts/posts']
      },
      post_length(){
        return this.$store.getters['posts/post_length']
      }
    },
    methods:{
      checkPost(post){
        if(post.title && post.body){
          return true
        }else {
          return false
        }
      },
      async addPost(){
        const post = {
          id: this.post_length  + 1,
          title : this.postTitle,
          body : this.postBody
        }
        if(this.checkPost(post)) {
          await this.$store.dispatch ( 'posts/add', post )
        }
        this.postTitle =''
        this.postBody =''
        },
      async savePost(){
        const posters = this.posts
        await this.$store.dispatch('posts/savePost',posters)
      },
      async removePost(postId){



        await this.$store.dispatch('posts/removePost',postId)
      }
    },
    components:{
      Menu
    }
  }
</script>

<style scoped>
  .todo-list{
    width: 100%;
    height: 90vh;
    align-items: center;
  }
  .input{

    margin: auto;


  }
  .input_block{
    background-color: #9053c7;
    align-items: center;
    width: 100%;
    height: 60px;


    position: relative;

    display: flex;
    align-content: center;
    justify-content: center;
    overflow: auto;

  }
  .label_form{
    margin-right: 20px;
    color:#F5F5F5 ;
  }
  .form-control{
    border: 0;
  }
  .test{
    background-color: mediumslateblue;
    padding: 10px 30px 10px 10px;
    height: 100%;


  }
  .table{
    background-color: white;
  }
  input{
    border-radius: 10px;
  }
  .btn{
    width: 200px;
  }
  .post_block{

  }
  .text-center{
      align-items: center;
    display: inline-block;
  }
</style>

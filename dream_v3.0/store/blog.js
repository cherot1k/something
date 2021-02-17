export const state = () => ({
    blog_posts: [
      {title: 'The best title of the blog' ,body: 'You can find a lot of interesting information here', id:1,img:"https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",username:'me'},
      {title: 'Hmmm...' ,body: 'Man,i just dont know what are you doing here,but dont read it ',id:2,img:"https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",username:'me'},
      {title: '2Big power means big responsibility' ,body: 'Peter? Come on and see what i mean of it',id:3,img:"https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",username:'me'},
      {title: '3Big power means big responsibility' ,body: 'Peter? Come on and see what i mean of it',id:4,img:"https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",username:'me'},
      ],
   currentPost: {},
})
export const mutations = {
  SetPosts(state, posts) {
    state.blog_posts = posts
  },
  SetCurrentPost(state, id) {
    state.currentPost = state.blog_posts[id]
  },
}

export const actions = {
     async setPosts({commit},username){
     const posts = await this.$axios.get('localhost:9000/blog',username)
       commit('SetPosts',posts)
     },
    async setCurrentPost({commit},id){
      commit('SetCurrentPost', id)
    }
}

export const getters ={
  blog_posts : s => s.blog_posts,
  currentPost : s => s.currentPost
}


export const state = () => ({
  posts: [],
  currentPost:{}
})

export const mutations = {
  setUsers(state, posts) {
    state.posts = posts
  },
  addUser(state,post){
    state.posts.push(post)
  },
  removePosts(state,postId){
    state.posts =  state.posts.filter(p => {return  p.id !== postId})
  },
  editPost(state, newPost){
    state.posts[newPost.id] = newPost;
  },
  findPost(state,postId){
    state.currentPost = state.posts[postId]
  }
}

export const actions = {
  async fetch({commit},login) {
    console.log(login)
    const posts = await this.$axios.get('/posts', {params:{login}})
    console.log(posts.data)
    commit('setUsers', posts.data)
  },
  async add({commit},post){

    commit('addUser',post)
  },
  async savePost({commit},posts){
    await this.$axios.post ( '/posts', posts )
  },
  async removePost({commit},postId){
    commit('removePosts',postId)
  },
  async editPost({commit},post){
    commit('editPost',post)
  },
  async currentPost({commit},postId){
    commit('findPost',postId)
  }
}

export const getters = {
  posts: s => s.posts,
  post_length: s => s.posts.length,
  currentPost: s=> s.currentPost
}

export const state = () => ({
  user: null,
  token:null
})
export const mutations = {
  SET_TOKEN(state,token){
    state.token = token
  },
  SET_USER(state,user){
    state.user = user
  },
  CLEAR_ALL(state){
    state.token = null
    state.user = null
  }
}
export const  actions = {
  setToken({commit},token){
    commit('SET_TOKEN',token)
  },
  setUser({commit},user){
    commit('SET_USER',user)
  },
  logout({commit}){
    commit('CLEAR_ALL')
  }
}
export const getters ={
  user: s=> s.user,
  token : s=> s.token,
  loggedIn : s=>!!s.user
}

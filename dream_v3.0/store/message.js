export const state = () => ({
  massages: []
})
export const mutations = {
  SET_MESSAGES(state,massages){
    state.massages = massages
  }
}

export const actions = {
  async getMassages({commit},id){
    const massages = await this.$axios.get('/massage' , id)
    commit('SET_MASSAGES', massages)
  }
}

export const getters ={
  massages: s=> s.massages()
}

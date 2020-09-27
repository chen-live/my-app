export default {
  ACTION_A({ dispatch, commit }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        commit('INCREMENT')
        resolve();
      }, 3000);
    })
  },
  async ACTION_B({ dispatch, commit }, name) {
    await dispatch("ACTION_A")
    commit(name.dispatch)
  }
}
import Vue from "vue"
import Vuex from "vuex"
import getters from "./getters"
import mutations from "./muntations"
import actions from "./actions"
import state from "./state"
Vue.use(Vuex)
const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
})
Vue.prototype.$store = store
export default store
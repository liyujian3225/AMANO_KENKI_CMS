import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from "@/utils/storage";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: getItem("authorization")
  },
  getters: {},
  mutations: {
    setUser (state, data) {
      state.user = data;
      setItem("authorization", state.user)
    }
  },
  actions: {},
  modules: {}
})

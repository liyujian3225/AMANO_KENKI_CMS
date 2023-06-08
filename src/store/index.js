import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from "@/utils/storage";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: getItem("userInfo"),
    token: getItem("token"),
  },
  getters: {
    userInfo: state => state.userInfo,
  },
  mutations: {
    setUserInfo (state, data) {
      state.userInfo = data;
      setItem("userInfo", data)
    },
    setToken (state, data) {
      state.token = data;
      setItem("token", data)
    },
  },
  actions: {},
  modules: {}
})

import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loader:false
  },
  mutations: {
    LOADER(state,payload){
      state.loader=payload;
    }
  },
  actions: {
    //
  },
  modules: {
    auth
  }
})

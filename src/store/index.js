import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loader:false,
    berhasillogin:false,
    harusisi:false,
    berhasilsimpan:false,
    berhasilhapus: false,
    berhasiledit: false
  },
  mutations: {
    LOADER(state,payload){
      state.loader=payload;
    },
    SET_SUKSES(state,payload){
      state.berhasillogin=payload;
    },
    SET_HARUSISI(state,payload){
      state.harusisi=payload;
    },
    SET_BERHASILSIMPAN(state,payload){
      state.berhasilsimpan=payload;
    },
    SET_BERHASILHAPUS(state,payload){
      state.berhasilhapus=payload;
    },
    SET_BERHASILEDIT(state,payload){
      state.berhasiledit=payload;
    },
  },
  actions: {
    //
  },
  modules: {
    auth
  }
})

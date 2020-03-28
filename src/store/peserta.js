import axios from 'axios'

export default{
  namespaced: true,

  state: {
    pesertas: []
  },

  getters:{
      
  },

  mutations: {
    SET_PESERTAS (state,data){
      state.pesertas = data;
    }
  },
  actions: {
      async getPesertas( {commit} ){
        try{
          let response = await axios.get('peserta')
          console.log(response.data);
          commit('SET_PESERTAS', response.data);
      }catch (error){
        console.log(error)
      }
  },    
  }
}

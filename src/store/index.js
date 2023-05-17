
import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex);



export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
   
    did:'',
	
  },
  mutations: {
    
    SET_DID(state, did) {
      state.did = did
    },
  
  },
  actions: {
    setdid({
      commit
    }, did) {
      commit('SET_DID', did)

    },
    setChainType({
      commit
    }, chainType) {
      commit('SET_CHAINTYPE', chainType)
    },
    
    setSearchInput({ commit }, input) {
      commit('SET_SEARCH', input)
    },

    setList({ commit }, data = { NFTList: []}) {
      commit('SET_NFT_LIST', data)
    },
    
    setStates({ commit }, date) {
      commit('SET_SOURCE', date)
    },
  },
  getters: {
    did: state => state.info && state.info.did
  },
  modules: {},

});
import Vuex from 'vuex';
import Vue from 'vue';
import auth from './modules/userAuth'
import chat from './modules/chat'
 

Vue.use(Vuex);

export default new Vuex.Store({
  modules : {
    auth,
    chat
  }
})
import Vuex from 'vuex';
import Vue from 'vue';
import auth from './modules/userAuth'
import VueLocalStorage from 'vue-localstorage'
 
Vue.use(VueLocalStorage);
Vue.use(Vuex);

export default new Vuex.Store({
  modules : {
    auth
  }
})
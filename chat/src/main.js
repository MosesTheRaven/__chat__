
import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import firebase from 'firebase'
import store from './store/index'
import VueChatScroll from 'vue-chat-scroll'
import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import VueMq from 'vue-mq'

Vue.use(VueMq, {
  breakpoints: {
    sm: 450,
    md: 1250,
    lg: Infinity,
  }
})
Vue.use(VueChatScroll)

Vue.config.productionTip = false

var config = {
  apiKey: "AIzaSyC_pe1P_smAM6JnQHn84PHAD6zUJqnWGbM",
  authDomain: "chat-12442.firebaseapp.com",
  databaseURL: "https://chat-12442.firebaseio.com",
  projectId: "chat-12442",
  storageBucket: "chat-12442.appspot.com",
  messagingSenderId: "404707661205"
};
firebase.initializeApp(config);

new Vue({
  localStorage,
  store,
  render: h => h(App)
}).$mount('#app')
import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";
import vuetify from './plugins/vuetify'
import './assets/font/font.css'
global.Buffer = global.Buffer || require('buffer').Buffer;

// import {initWallet  } from "./wallet/index";
// initWallet();

Vue.config.productionTip = false

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App),
}).$mount('#app')

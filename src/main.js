import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import '@babel/polyfill'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@fortawesome/fontawesome-free/css/all.css'

import { auth } from '@/firebase'

import VueChatScroll from 'vue-chat-scroll'
Vue.use(VueChatScroll)

Vue.config.productionTip = false

auth.onAuthStateChanged(function (user) {
  if (user) {
    // var displayName = user.displayName
    // var email = user.email
    // var photoURL = user.photoURL
    // var uid = user.uid
    // mandamos la info de user a vuex con dispatch 
    store.dispatch('setUsuario', user)
    console.log(user.displayName)
  } 
  new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
})
  


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

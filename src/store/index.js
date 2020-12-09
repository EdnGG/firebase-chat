import Vue from 'vue'
import Vuex from 'vuex'
import { auth, db } from '@/firebase'
import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    usuario: ''
  },
  mutations: {
    nuevoUsuario(state, payload) {
      
      if (payload === null) {
        state.usuario = ''
      } else {
        state.usuario = payload
      }
    }
  },
  actions: {
    async setUsuario({ commit }, user) {
      try {
        const doc = await db.collection('usuarios').doc(user.uid).get()
        if (doc.exist) {
          commit('nuevoUsuario', doc.data())
        } else {
          const usuario = {
              nombre: user.displayName,
              email: user.email,
              uid: user.uid,
              foto: user.photoURL,
          };
          // guardar en firestore
        await db.collection("usuarios").doc(usuario.uid).set(usuario);
          console.log("usuario  registrado en firestore");
          commit('nuevoUsuario', usuario)
        }
      } catch (e) {
        console.log(e)
      }
    },
    cerrarSesion({ commit }) {
      auth.signOut()
      commit('nuevoUsuario', null)
      router.push({name: 'login'})
    }
  },
  modules: {
  }
})

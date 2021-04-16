import Vue from 'vue'
import Vuex from 'vuex'

import app from '../main'
import menu from './modules/menu'
import user from './modules/user'
import axios from 'axios'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    list: []
  },
  getters: {
  },
  mutations: {
    changeLang (state, payload) {
      app.$i18n.locale = payload
      localStorage.setItem('currentLanguage', payload)
    },
    cargar (state) {
      axios.get('http://localhost:3050/customers').then(response => {
        console.log('response primero', response)
        state.list = response.data
      }).catch(error => {
        console.log('error', error)
      })
    }
  },
  actions: {
    setLang ({ commit }, payload) {
      commit('changeLang', payload)
    }
  },
  modules: {
    menu,
    user
  }
})

store.commit('cargar') // iniciamos la tienda de datos consulta incial

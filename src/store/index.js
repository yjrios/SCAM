import Vue from 'vue'
import Vuex from 'vuex'

import app from '../main'
import menu from './modules/menu'
import user from './modules/user'
import axios from 'axios'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    list: [],
    dirapi: 'http://localhost:3050',
    auto: 'algo'
  },
  getters: {
  },
  mutations: {
    changeLang (state, payload) {
      app.$i18n.locale = payload
      localStorage.setItem('currentLanguage', payload)
    },
    cargar (state) {
      axios.get(state.dirapi + '/vehiculos').then(response => {
        console.log('response primero store', response)
        state.list = response.data
      }).catch(error => {
        console.log('error', error)
      })
    },
    buscar (state, placa) {
      axios.get(state.dirapi + '/vehiculos/' + placa).then(response => {
        console.log('response', response.data.data)
        if (response.status === 204) {
          state.auto = response.data.data
          return
        }
        state.auto = response.data.data
        console.log('datos', state.auto)
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

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
    dirapi: process.env.VUE_APP_BASE_URL,
    dirphoto: 'http://scamimg.agroinlaca.com',
    /* dirphoto: '../../assets/img', */
    auto: 'algo',
    dropdown: [],
    viaje: [],
    status: [] 
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
        state.list = response.data
      }).catch(error => {
        console.log('error', error)
      })
    },
    buscar (state, placa) {
      axios.get(state.dirapi + '/vehiculo/' + placa).then(response => {
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
    },
    llenarDropdown (state) {
      try {
        axios.get(state.dirapi + '/amc/dropdownviajes')
          .then(resp => {
            if (resp.data) {
              state.dropdown = resp.data
            }
          })
      } catch (error) {
        console.log(error)
      }
    },
    cargarViajeAmc (state) {
      try {
        axios.get(state.dirapi + '/amc/viajes')
          .then(resp => {
            if (resp.data) {
              state.viaje = resp.data
            }
          })
      } catch (error) {
        console.log(error)
      }
    },
    ObtenerStatus (state) {
      try {
        axios.get(state.dirapi + '/amc/allstatus')
          .then(resp => {
            state.status = resp.data
          })
          .catch(err => {
            console.log(err)
          })
      } catch (error) {
        console.log('ERROR ' + error)
      }
    }
  },
  actions: {
    setLang ({ commit }, payload) {
      commit('changeLang', payload)
    },
    getInfoViajes ({ commit }) {
      commit('llenarDropdown')
    },
    getInfoStatus ({ commit }) {
      commit('ObtenerStatus')
    }
  },
  modules: {
    menu,
    user
  }
})

store.commit('cargar') // iniciamos la tienda de datos con una consulta incial

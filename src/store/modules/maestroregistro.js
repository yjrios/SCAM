/* import axios from 'axios'

export default {
  namespaced: true,
  state: {
    list: []
  },
  created: function () {
    axios.get('http://localhost:3050/customers').then(response => {
      console.log('response', response)
      this.list = response.data
      console.log(this)
    }).catch(error => {
      console.log('error', error)
    })
  }
} */

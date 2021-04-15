<template>
<div>
              <b-form @submit.prevent="onBasicSubmit">
                  <b-form-group :label="'Nombre'" :description="'Aqui ingresamos nombre'">
                  <b-form-input type="text" v-model="name" :placeholder="'Pablo Puerta'" />
                  </b-form-group>
                  <b-form-group :label="'Ciudad'">
                  <b-form-input type="Text" v-model="city" :placeholder="'Barquisimeto'"/>
                  </b-form-group>
                  <b-button type="submit" variant="primary" class="mt-4" @click="guardar" @keyup.enter="guardar">Guardar</b-button>
              </b-form>
</div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'

export default {
  data: function () {
    return {
      name: '',
      city: ''
    }
  },
  methods: {
    guardar () {
      const body = {
        name: this.name,
        city: this.city
      }
      axios.post('http://localhost:3050/add', body).then(response => {
        console.log('response', response)
        // localStorage.getItem('idUser')
      }).catch(error => {
        console.log('error', error)
      })
      this.name = ''
      this.city = ''
      axios.get('http://localhost:3050/customers').then(response => {
        console.log('response', response)
        this.$emit('listactualizada', response.data)
        // localStorage.setItem('lista', this.list)
        console.log(this)
      }).catch(error => {
        console.log('error', error)
      })
    }
  }
}
</script>

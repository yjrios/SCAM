<template>
    <b-colxx xxs="12">
        <b-card class="mb-4" :title="'Formulario'">
          <b-form @submit.prevent="onBasicSubmit">
            <b-form-group :label="'Nombre'" :description="'Aqui ingresamos nombre'">
              <b-form-input type="text" v-model="name" :placeholder="'Pablo Puerta'" />
            </b-form-group>
            <b-form-group :label="'Ciudad'">
              <b-form-input type="Text" v-model="city" :placeholder="'Barquisimeto'"/>
            </b-form-group>
            <b-button type="submit" variant="primary" class="mt-4" @click="guardar">Guardar</b-button>
          </b-form>
        </b-card>
    </b-colxx>
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
    guardar: function () {
      const body = {
        name: this.name,
        city: this.city
      }
      axios.post('http://localhost:3050/add', body).then(response => {
        console.log('response', response)
      }).catch(error => {
        console.log('error', error)
      })
    }
  }
}
</script>

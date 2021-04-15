<template>
  <div>
      <b-colxx xxs="12">
        <b-tabs nav-class="separator-tabs ml-0 mb-5" content-class="tab-content" :no-fade="true">
          <b-tab :title="'LISTADO'" >
           <Lista :lista2="list"/>
          </b-tab>
          <b-tab :title="'CONSULTAR VEHICULO'">
          <b-row>
             <b-colxx xxs="12">

             </b-colxx>
          </b-row>
          </b-tab>
          <b-tab :title="'NUEVO VEHICULO'">
          <b-row>
             <b-colxx xxs="12">
              <Formulario @listactualizada="list = $event"/>
             </b-colxx>
          </b-row>
          </b-tab>
        </b-tabs>
      </b-colxx>
  </div>
</template>
<script>
import Formulario from '@/components/Formulario.vue'
import Lista from '@/components/Lista.vue'
import axios from 'axios'

export default {
  name: 'maestro',
  components: {
    Formulario,
    Lista
  },
  data () {
    return {
      list: []
    }
  },
  created () {
    axios.get('http://localhost:3050/customers').then(response => {
      console.log('response', response)
      this.list = response.data
      console.log(this)
    }).catch(error => {
      console.log('error', error)
    })
  }
}
</script>

<template>
        <b-card :title="'Listado'">
          <b-table
              id="table-transition-example"
              :items= list
              :fields="fields"
              striped
              hover
              primary-key="id"
              :tbody-transition-props="transProps">
            </b-table>
        </b-card>
</template>
<script>

import { mapState } from 'vuex'
// import store from '../store/index'

export default {
  name: 'lista',
  data: function () {
    return {
      // lista: [],
      transProps: {
        // Transition nombre
        name: 'flip-list'
      },
      fields: [{
        key: 'posicion',
        label: 'Numero',
        sortable: true
      },
      {
        key: 'placa',
        label: 'Placa',
        sortable: true
      },
      {
        key: 'modelo',
        label: 'Modelo',
        sortable: true
      },
      {
        key: 'marca',
        label: 'Marca',
        sortable: true
      }]
    }
  },
  computed: {
    ...mapState(['list'])
  },
  created () {
    console.log('aqui la lista' + this.list)
  },
  updated () {
    console.log('updated lista')
  },
  mounted () {
    console.log('mounted lista')
  }
}
</script>

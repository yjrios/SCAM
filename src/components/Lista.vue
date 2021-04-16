<template>
          <b-table
              id="table-transition-example"
              :items= list
              :fields="fields"
              striped
              hover
              primary-key="id"
              :tbody-transition-props="transProps">
            </b-table>

</template>
<script>

import { mapState } from 'vuex'
// import store from '../store/index'

export default {
  name: 'lista',
  data: function () {
    return {
      // lista: store.state.list,
      transProps: {
        // Transition nombre
        name: 'flip-list'
      },
      fields: [{
        key: 'id',
        label: 'id',
        sortable: true
      },
      {
        key: 'name',
        label: 'Nombre',
        sortable: true
      },
      {
        key: 'city',
        label: 'Ciudad',
        sortable: true
      }]
    }
  },
  computed: {
    ...mapState(['list'])
  },
  created () {
    console.log('created lista')
  },
  updated () {
    console.log('updated lista')
  },
  mounted () {
    console.log('mounted lista')
  }
}
</script>

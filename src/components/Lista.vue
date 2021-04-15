<template>
          <b-table
              id="table-transition-example"
              :items= lista2
              :fields="fields"
              striped
              hover
              primary-key="id"
              :tbody-transition-props="transProps">
            </b-table>

</template>
<script>

export default {
  name: 'lista',
  data: function () {
    return {
      // list: [],
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
  props: ['lista2'],
  created () {
    console.log('created')
  },
  updated () {
    console.log('updated')
  }
}
</script>

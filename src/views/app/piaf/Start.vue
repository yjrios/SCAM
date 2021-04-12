<template>
  <div>
    <b-row>
      <b-colxx xxs="12">
        <piaf-breadcrumb :heading="$t('menu.start')"/>
        <div class="separator mb-5"></div>
      </b-colxx>
    </b-row>
    <b-row>

      <b-colxx xxs="6">
          <b-card class="mb-12" :title="'Seleccione'" >
              <Formulario/>
          </b-card>
      </b-colxx>

      <b-colxx xxs="6">
          <b-card class="mb-12">
          <b-table
              id="table-transition-example"
              :items="list"
              :fields="fields"
              striped
              hover
              primary-key="id"
              :tbody-transition-props="transProps">
            </b-table>
        </b-card>
      </b-colxx>
    </b-row>

  </div>
</template>

<script>
// @ is an alias to /src
import Formulario from '@/components/Formulario.vue'
import axios from 'axios'

export default {
  name: 'card',
  components: {
    Formulario
  },
  data: function () {
    return {
      list: [],
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
  created: function () {
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

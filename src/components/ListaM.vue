<template>
<div>
        <b-card class="mb-2">
          <b-row>
             <b-colxx lg="12" md="12">
              <b-form @submit.prevent="cargarM" id="formu" inline>
                <div class="form-group mb-1">
                   <b-form-group :label="'Fecha inicio'" class="mx-sm-3">
                       <b-form-input type="date"
                       v-model="desde"
                       :state="fec"
                       ref="fecha"
                       />
                      </b-form-group>
                      <b-form-group :label="'Fecha Final'">
                       <b-form-input type="date"
                       v-model="hasta"
                       :state="fec"
                       ref="fecha"
                       />
                      </b-form-group>
                </div>
                <div class="form-group mx-sm-3 mb-1">
                    <b-button type="submit" variant="primary" class="mt-4" @click="cargarM()" @keyup.enter="cargarM">Mostrar</b-button>
                </div>
              </b-form>
             </b-colxx>
          </b-row>
        </b-card>
        <b-card>
          <b-table
              id="table-transition-example"
              :items= listaM
              :fields="fields"
              striped
              hover
              primary-key="fecha"
              :tbody-transition-props="transProps">
            </b-table>
        </b-card>
</div>
</template>

<script>

import { mapState } from 'vuex'
import axios from 'axios'

export default {
  name: 'listadomtto',
  data: function () {
    return {
      transProps: {
        // Transition nombre
        name: 'flip-list'
      },
      fields: [{
        key: 'fecha',
        label: 'Fecha',
        sortable: true
      },
      {
        key: 'id_mtto',
        label: 'Nro Mantenimiento',
        sortable: true
      },
      {
        key: 'categoria',
        label: 'Tipo',
        sortable: true
      },
      {
        key: 'servicio',
        label: 'Servicio realizado',
        sortable: true
      },
      {
        key: 'kilometraje',
        label: 'Kilometraje',
        sortable: true
      }],
      listaM: [],
      desde: null,
      hasta: null
    }
  },
  methods: {
    cargarM () {
      const desde = this.desde
      const hasta = this.hasta
      axios.get(this.dirapi + '/getServices?desde=' + desde + '&hasta=' + hasta).then(response => {
        console.log('response datos', response.data.data)
        this.listaM = response.data.data
      }).catch(error => {
        console.log('error', error)
      })
    }
  },
  computed: {
    ...mapState(['dirapi'])
  }
}
</script>

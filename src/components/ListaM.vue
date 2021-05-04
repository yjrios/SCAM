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
                       :state="des"
                       ref="fecha"
                       />
                      </b-form-group>
                      <b-form-group :label="'Fecha Final'">
                       <b-form-input type="date"
                       v-model="hasta"
                       :state="has"
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
        <transition name='slide-fade'>
        <b-card v-if="show">
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
        </transition>
</div>
</template>

<script>

import { mapState } from 'vuex'
import axios from 'axios'

// import DataTables from 'datatables'

import JQuery from 'jquery'
let $ = JQuery

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
        key: 'modelo',
        label: 'Modelo',
        sortable: true
      },
      {
        key: 'placa',
        label: 'Placa',
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
      }],
      listaM: [],
      desde: null,
      hasta: null,
      show: false,
      des: '',
      has: ''
    }
  },
  methods: {
    cargarM (e) {
      if (!this.desde) {
        this.des = false
        return true
      }
      if (!this.hasta) {
        this.has = false
        return true
      }
      e.preventDefault()
      const desde = this.desde
      const hasta = this.hasta
      axios.get(this.dirapi + '/getServices?desde=' + desde + '&hasta=' + hasta).then(response => {
        console.log('response datos', response.data.data)
        this.listaM = response.data.data
        this.show = true
        // this.tabla()
      }).catch(error => {
        console.log('error', error)
      })
    },
    tabla () {
      $(function () {
        $('#table-transition-example').DataTable(
          {
            dom: 'Bfrtip',
            buttons: [
              'copyHtml5',
              'excelHtml5',
              'csvHtml5',
              'pdfHtml5'
            ]
          }
        )
      })
    }
  },
  computed: {
    ...mapState(['dirapi'])
  }
}
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all .5s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>

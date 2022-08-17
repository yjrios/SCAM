<template>
  <b-card>
    <div>
    <b-row>
      <b-colxx lg="3" md="4" sm="6" xs="12">
        <b-form-group label="FECHA DESDE" class="mb-1 ml-2">
          <b-form-input
          type="date"
          v-model="desde"
          ref="fechad"
          :state="des"
          /></b-form-group>
      </b-colxx>
      <b-colxx lg="3" md="4" sm="6" xs="12">
        <b-form-group label="FECHA HASTA" class="mb-1 ml-2">
          <b-form-input
          type="date"
          v-model="hasta"
          ref="fechah"
          :state="has"
          /></b-form-group>
      </b-colxx>
      <div align="center" class="pt-4">
        <b-colxx lg="3" md="2" sm="6" xs="6">
          <b-button @click="refrescargrid" size="sm" variant="primary" class="mb-2">
            Refrescar
          </b-button>
        </b-colxx>
      </div>
      <div align="center" class="pt-4">
        <b-colxx lg="3" md="2" sm="6" xs="6">
          <b-button @click="vaijeall" size="sm" variant="primary" class="mb-2" v-if="todos">
            Todos
          </b-button>
        </b-colxx>
      </div>
    </b-row>
    </div>
    <div id="app">
      <ejs-grid ref="grid"
      :dataSource="lista"
      :enableHover="false"
      :allowPaging="true"
      :pageSettings="pageSettings"
      :allowSorting="true"
      :allowFiltering="true"
      :allowExcelExport="true"
      :toolbar="toolbarOptions"
      :toolbarClick="gridExport"
      :queryCellInfo='customiseCell'>
        <e-columns>
          <e-column field= "status" headerText="Estatus" textAlign="center" width=150></e-column>
          <e-column field= "id_viaje" headerText="Viaje" textAlign="center" width=90></e-column>
          <e-column field= "placa" headerText="Placa" textAlign="center" width=120></e-column>
          <e-column field= "sedeE" headerText="Origen" textAlign="center" width=200></e-column>
          <e-column field= "dir_sedeE" headerText="Dirección Origen" textAlign="center" width=200></e-column>
          <e-column field= "fch_Carga" headerText="Fecha Estimada C" textAlign="center" width=150 ></e-column>
          <e-column field= "sedeR" headerText="Destino" textAlign="center" width=200></e-column>
          <e-column field= "dir_sedeR" headerText="Dirección Despacho" textAlign="center" width=200 ></e-column>
          <e-column field= "fch_Entrega" headerText="Fecha Estimada D" textAlign="center" width=150 ></e-column>
          <e-column field= "categoria" headerText="Categoría" textAlign="Center" width=160 ></e-column>
          <e-column field= "cantidad" headerText="Cantidad" textAlign="Center" width=120 ></e-column>
          <e-column field= "detalles" headerText="Observaciones" textAlign="Center" width=120 ></e-column>
        </e-columns>
      </ejs-grid>
    </div>
  </b-card>
</template>

<script>
import axios from 'axios'
import { mapMutations, mapState, mapActions } from 'vuex'
import { Page, Sort, Filter, Toolbar, ExcelExport, Aggregate } from '@syncfusion/ej2-vue-grids'
var moment = require('moment')

export default {
  name: 'ListarAmc',
  data: function () {
    return {
      lista: [],
      pageSettings: { pageSize: 15 },
      toolbarOptions: ['ExcelExport'],
      descripcionO: '',
      descripcionD: '',
      direccionD: '',
      direccionO: '',
      desde: null,
      hasta: null,
      todos: false,
      mensaje: '',
      titulo: '',
      tipoM: '',
      des: '',
      has: ''
    }
  },
  provide: {
    grid: [Page, Sort, Filter, Toolbar, ExcelExport, Aggregate]
  },
  computed: {
    ...mapState(['dirapi']),
    limpiarfechas () {
      if (this.desde !== null || this.hasta !== null) {
        this.todos = true
        return this.todos
      }
    }
  },
  watch: {
    viaje (val) {
      this.cargargrid()
    }
  },
  created () {
    this.getInfoViajes()
  },
  updated () {
    this.getInfoViajes()
    this.$refs.grid.refresh()
  },
  mounted () {
    this.cargargrid()
  },
  methods: {
    ...mapMutations(['cargarViajeAmc']),
    ...mapActions(['getInfoViajes']),

    vaijeall () {
      this.desde = null
      this.hasta = null
      this.cargargrid()
      this.todos = false
    },
    addNotification (
      type = this.tipoM,
      title = this.titulo,
      message = this.mensaje
    ) {
      this.$notify(type, title, message, { duration: 3000, permanent: false })
    },

    cargargrid () {
      axios.get(this.dirapi + '/amc/viajes')
        .then(resp => {
          this.lista = resp.data.viaje.map(item => {
            resp.data.sedes.forEach(element => {
              if (item.id_SedeDestino === element.id) {
                this.descripcionD = element.descripcion
                this.direccionD = element.direccion
              }
              if (item.id_SedeOrigen === element.id) {
                this.descripcionO = element.descripcion
                this.direccionO = element.direccion
              }
            })
            let fchEcarga = ''
            let fchEdescarga = ''

            resp.data.detalle.map(ele => {
              if (ele.id_Viaje === item.id_Viaje) {
                if (ele.id_Evento === 2 && ele.fchhoraestimada_Llegada !== null) {
                  fchEcarga = moment(ele.fchhoraestimada_Llegada).format('DD-MM-YYYY')
                }
                if (ele.id_Evento === 3 && ele.fchhoraestimada_Llegada !== null) {
                  fchEdescarga = moment(ele.fchhoraestimada_Llegada).format('DD-MM-YYYY')
                }
              }
            })
            return { id_viaje: item.id_Viaje,
              placa: item.placa,
              sedeE: this.descripcionO,
              dir_sedeE: this.direccionO,
              fch_Carga: fchEcarga,
              sedeR: this.descripcionD,
              dir_sedeR: this.direccionD,
              fch_Entrega: fchEdescarga,
              categoria: item.carga,
              detalles: item.detalle,
              cantidad: item.cantidad,
              status: item.status
            }
          })
          if (this.lista.length > 0) {
            if ((this.desde || this.desde !== null) && (this.hasta || this.hasta !== null)) {
              let fecAuxDesde = new Date(this.desde)
              let fecAuxHasta = new Date(this.hasta)
              if (fecAuxDesde.toISOString() <= fecAuxHasta.toISOString()) {
                this.lista = this.lista.filter(item => {
                  let auxfecha = item.fch_Carga.split('-')
                  auxfecha = new Date(auxfecha[2] + '-'+auxfecha[1] + '-'+auxfecha[0])
                  auxfecha = auxfecha.toISOString().split('T', 1)
                  if (auxfecha[0] >= this.desde && auxfecha[0] <= this.hasta) {
                    return item
                  }
                })
                this.des = true
                this.has = true
                this.mensaje = '¡Listado Actualizado!'
                this.tipoM = 'success filled'
                this.titulo = 'Filtrado Exitoso'
                this.addNotification()
              } else {
                this.des = false
                this.has = false
                this.mensaje = '¡Fecha desde debe ser menor que fecha hasta!'
                this.tipoM = 'error filled'
                this.titulo = 'Listar por fecha'
                this.addNotification()
              }
            }
            this.lista = this.lista.sort((a,b) => b.id_viaje - a.id_viaje)
          }
        })
        .catch(e => {
          console.log(e)
        })
    },

    refrescargrid () {
      this.cargargrid()
      this.$refs.grid.refresh()
      if ((this.desde || this.desde !== null) && (this.hasta || this.hasta !== null)) {
        this.todos = true
      }
    },

    customiseCell: function (args) {
      if (args.column.field === 'status') {
        if (args.data['status'] === 'PENDIENTE') {
          args.cell.classList.add('WARNING')
        } else if (args.data['status'] === 'REALIZADO') {
          args.cell.classList.add('SUCCESS')
        } else if (args.data['status'] === 'EN PROCESO') {
          args.cell.classList.add('PRIMARY')
        } else if (args.data['status'] === 'CANCELADO') {
          args.cell.classList.add('DANGER')
        }
      }
    },

    gridExport (args) {
      if (args.item.id.includes('excelexport')) {
        let girdInst = this.$refs.grid
        if (girdInst) {
          let name = ''
          let title = ''
          let fchIni = []
          let fchFin = []
          let cantidadCancelados = this.lista.filter(item => item.status === 'CANCELADO')
          let porcentaje = 100 - ( (cantidadCancelados.length * 100) / this.lista.length )
          let m = Number( (Math.abs(porcentaje) * 100).toPrecision(15) )
          porcentaje = Math.round(m) / 100 * Math.sign(porcentaje)
          if ((this.desde && this.hasta) || (this.desde !== null && this.hasta !== null)) {
            fchIni = this.desde.split('-', 3)
            fchFin = this.hasta.split('-', 3)
            name = 'planificacion' + fchIni[2] + '-' + fchIni[1] + '-' + fchIni[0] + '_' + fchFin[2] + '-' + fchFin[1] + '-' + fchFin[0] + '.xlsx'
            title = 'VIAJES PLANIFICADOS AGL   Desde: ' + fchIni[2] + '/' + fchIni[1] + '/' + fchIni[0] + ' - Hasta: ' + fchFin[2] + '/' + fchFin[1] + '/' + fchFin[0]
          } else {
            name = 'planificacioncompleta.xlsx'
            title = 'VIAJES PLANIFICADOS AGL   (TODOS)'
          }
          girdInst.excelExport({
            fileName: name,
            header: {
              headerRows: 1,
              rows: [{
                cells: [{
                  colSpan: 8,
                  value: title,
                  style: { fontSize: 20, hAlign: 'Center', bold: true }
                }]
              }]
            },
            footer: {
              footerRows: 1,
              rows: [{
                cells: [{
                  colSpan: 5,
                  value: 'Viajes Planificados: ' + this.lista.length + ', Viajes Cancelados: ' + cantidadCancelados.length + ', Cumplimiento: ' + porcentaje + '%',
                  style: { fontSize: 15, hAlign: 'Center', bold: true }
                }]
              }]
            }
          })
        }
      }
    }
  }
}
</script>

<style>
  .SUCCESS {
    background:#007A2E;
  }
  .DANGER {
    background:#ad292f;
  }
  .WARNING {
    background:#C9C9C9;
  }
  .PRIMARY {
    background:#006BB0;
  }
</style>

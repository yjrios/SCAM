<template>
<div>
        <b-card class="mb-2" :title="'Status de la flota segun el Periodo'">
          <b-row>
             <b-colxx lg="12" md="12">
              <b-form @submit.prevent="cargarH" id="formu" inline>
                <div class="form-group mb-1">
                      <b-form-group :label="'Fecha Final'" class="mx-sm-3">
                       <b-form-input type="date"
                       v-model="hasta"
                       :state="has"
                       ref="fecha"
                       />
                      </b-form-group>
                </div>
                <div class="form-group mx-sm-3 mb-1">
                    <b-button type="submit" variant="primary" class="mt-4" @click="cargarH()" @keyup.enter="cargarM">Mostrar</b-button>
                </div>
              </b-form>
             </b-colxx>
          </b-row>
        </b-card>
        <transition name='slide-fade'>
        <div v-if="show" >
            <b-row class="estilo">
                <b-colxx lg="2" md="12">
                    <div class="icon-cards-row">
                            <icon-card
                                :title="'Fecha'"
                                icon="iconsminds-calendar-4"
                                :value="mes"
                            />
                            </div>
                </b-colxx>
                <b-colxx lg="2" md="12">
                    <div class="icon-cards-row" v-b-toggle.totalv>
                            <icon-card
                                :title="'Total de Vehiculos'"
                                icon="simple-icon-chart"
                                :value="total"
                                :nombre="'totalv'"
                                :ligera="ligera"
                                :mediana="mediana"
                                :pesada="pesada"
                            />
                            </div>
                </b-colxx>
                <b-colxx lg="2" md="12">
                    <div class="icon-cards-row" v-b-toggle.opera>
                            <icon-card
                                :title="'Vehiculos Operativos'"
                                icon="simple-icon-check"
                                :value="operativos"
                                :nombre="'opera'"
                                :ligera="opeli"
                                :mediana="opeme"
                                :pesada="opepe"
                            />
                            </div>
                </b-colxx>
                <b-colxx lg="2" md="12">
                    <div class="icon-cards-row" v-b-toggle.operaporce>
                            <icon-card
                                :title="'Porcentaje Operativos'"
                                icon="simple-icon-like"
                                :value="porop+' %'"
                                :nombre="'operaporce'"
                                :ligera="opelipor + '%'"
                                :mediana="opemepor + '%'"
                                :pesada="opepepor + '%'"
                            />
                    </div>
                </b-colxx>
                <b-colxx lg="2" md="12">
                    <div class="icon-cards-row" v-b-toggle.equis>
                            <icon-card
                                :title="'Vehiculos Inoperativos'"
                                icon="simple-icon-close"
                                :value="inoperativos"
                                :nombre="'equis'"
                                :ligera="inoli"
                                :mediana="inome"
                                :pesada="inope"
                            />
                    </div>
                </b-colxx>
                <b-colxx lg="2" md="12">
                    <div class="icon-cards-row" v-b-toggle.inoperaporce>
                            <icon-card
                                :title="'Vehiculos Inoperativos'"
                                icon="simple-icon-dislike"
                                :value="porin+' %'"
                                :nombre="'inoperaporce'"
                                :ligera="inolipor + '%'"
                                :mediana="inomepor + '%'"
                                :pesada="inopepor + '%'"
                            />
                    </div>
                </b-colxx>
            </b-row>
          <b-card>
            <div id="app">
              <ejs-grid ref="grid"
              :dataSource="listaM"
              :allowPaging="true"
              :pageSettings=pageSettings
              :allowSorting="true"
              :allowFiltering="true"
              :allowPdfExport="true"
              :allowExcelExport="true"
              :toolbar="toolbarOptions"
              :toolbarClick="gridExport">
                <e-columns>
                  <e-column field= "placa" headerText="Placa" textAlign="center" width=130></e-column>
                  <e-column field= "empresa" headerText="Sede" textAlign="center" width=150></e-column>
                  <e-column field= "modelo" headerText="Modelo" textAlign="center" width=200></e-column>
                  <e-column field= "fecha1" headerText="Fecha" textAlign="center" width=130></e-column>
                  <e-column field= "status" headerText="Status" textAlign="center" width=130></e-column>
                  <e-column field= "detalles" headerText="Motivo" textAlign="center" clipMode='EllipsisWithTooltip'></e-column>
                </e-columns>
                <!--<e-aggregates>
                  <e-aggregate>
                    <e-columns>
                    <e-column type="Sum" field="precio" :footerTemplate='footerSum'></e-column>
                    </e-columns>
                  </e-aggregate>
                </e-aggregates> -->
              </ejs-grid>
            </div>
          </b-card>

        </div>
        </transition>
</div>
</template>

<script>

import { mapState } from 'vuex'
import axios from 'axios'
// import Vue from 'vue'
import { Page, Sort, Filter, Toolbar, PdfExport, ExcelExport, Aggregate } from '@syncfusion/ej2-vue-grids'
import IconCard from '@/components/Cards/IconCard2'
var moment = require('moment')
// nuevo
// import Vue from 'vue'
// import('@syncfusion/ej2-vue-grids').PdfExportProperties

export default {
  name: 'listadomtto',
  data: function () {
    return {
      listaM: [],
      operativos: null,
      hasta: null,
      mes: null,
      inoperativos: null,
      total: null,
      porin: null,
      porop: null,
      show: false,
      des: '',
      has: '',
      pla: '',
      data: this.listaM,
      inoli: null,
      inome: null,
      inope: null,
      opeli: null,
      opeme: null,
      opepe: null,
      ligera: null,
      mediana: null,
      pesada: null,
      inolipor: null,
      inomepor: null,
      inopepor: null,
      opelipor: null,
      opemepor: null,
      opepepor: null,
      pageSettings: { pageSize: 10 },
      toolbarOptions: ['ExcelExport', 'PdfExport']
    }
  },
  components: {
    IconCard
  },
  // nuevo
  provide: {
    grid: [Page, Sort, Filter, Toolbar, PdfExport, ExcelExport, Aggregate]
  },
  methods: {
    cargarH (e) {
      if (!this.hasta) {
        this.has = false
        return true
      }
      e.preventDefault()
      const hasta = this.hasta
      axios.get(this.dirapi + '/getStatusPeriodo?hasta=' + hasta).then(response => {
        this.listaM = response.data.data
        this.show = true
        this.operativos = 0
        this.inoperativos = 0
        this.total = 0
        this.opeli = 0
        this.opeme = 0
        this.opepe = 0
        this.inoli = 0
        this.inome = 0
        this.inope = 0
        this.listaM.map(item => {
          if (item.id === 1) {
            this.operativos += 1
          } else if (item.id === 9) {
            this.inoperativos += 1
          }
          console.log('id : ' + item.id_tipo_carga)
          if (item.id_tipo_carga === 1 && item.id === 1) {
            this.opeli += 1
          } else if (item.id_tipo_carga === 2 && item.id === 1) {
            this.opeme += 1
          } else if (item.id_tipo_carga === 3 && item.id === 1) {
            this.opepe += 1
          }
          if (item.id_tipo_carga === 1 && item.id === 9) {
            this.inoli += 1
          } else if (item.id_tipo_carga === 2 && item.id === 9) {
            this.inome += 1
          } else if (item.id_tipo_carga === 3 && item.id === 9) {
            this.inope += 1
          }
        })
        this.total = this.inoperativos + this.operativos
        this.porin = ((this.inoperativos * 100) / this.total).toFixed(0)
        this.porop = ((this.operativos * 100) / this.total).toFixed(0)
        this.opelipor = ((this.opeli * 100) / this.total).toFixed(0)
        this.opemepor = ((this.opeme * 100) / this.total).toFixed(0)
        this.opepepor = ((this.opepe * 100) / this.total).toFixed(0)
        this.inolipor = ((this.inoli * 100) / this.total).toFixed(0)
        this.inomepor = ((this.inome * 100) / this.total).toFixed(0)
        this.inopepor = ((this.inope * 100) / this.total).toFixed(0)
        this.ligera = this.opeli + this.inoli
        this.mediana = this.opeme + this.inome
        this.pesada = this.opepe + this.inope
        moment.locale('es')
        var a = moment(this.hasta)
        this.mes = a.format('MMMM')
      }).catch(error => {
        console.log('error', error)
      })
    }, // nuevo
    gridExport (args) {
      var girdInst = this.$refs.grid
      if (girdInst) {
        if (args.item.id.includes('pdfexport')) {
          girdInst.pdfExport({
            fileName: 'listado.pdf',
            // exportType: 'CurrentPage',
            theme: {
              header: {
                bold: true,
                fontName: 'Calibri',
                fontSize: 10
              },
              record: {
                fontColor: '#000000',
                fontName: 'Calibri',
                fontSize: 8
              }
            },
            header: {
              fromTop: 0,
              height: 130,
              contents: [{
                type: 'Text',
                value: 'Listado de vehiculos',
                position: { x: 0, y: 50 },
                style: { fontSize: 20 }
              }]
            },
            footer: {
              contents: [{
                type: 'Text',
                value: 'FIN DE LA LISTA',
                position: { x: 0, y: 50 },
                style: { fontSize: 20 }
              }],
              fromBottom: 130,
              height: 130
            }
          })
        } else if (args.item.id.includes('excelexport')) {
          girdInst.excelExport({
            fileName: 'listado.xlsx',
            // exportType: 'CurrentPage',
            header: {
              headerRows: 1,
              rows: [{
                cells: [{
                  colSpan: 4,
                  value: 'LISTADO DE OPERATIVIDAD DEL VEHICULO',
                  style: { fontSize: 20, hAlign: 'Center', bold: true }
                }]
              }]
            },
            footer: {
              footerRows: 1,
              rows: [{
                cells: [{
                  colSpan: 4,
                  value: 'FIN DE LA LISTA',
                  style: { fontSize: 20, hAlign: 'Center', bold: true }
                }]
              }]
            }
          })
        }
      }
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

.e-grid .e-gridpager .e-currentitem{
  background-color:rgb(0, 0, 182);
}

.estilo {
    position: relative;
    width: 100%;
    min-height: 1px;
    padding-right: 10px;
    padding-left: 10px;
    padding-top: 10px;
}
</style>

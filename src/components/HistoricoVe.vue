<template>
<div>
        <b-card class="mb-2">
          <b-row>
             <b-colxx lg="12" md="12">
              <b-form @submit.prevent="cargarH" id="formu" inline>
                <div class="form-group mb-1">
                    <b-form-group :label="'Ingrese Placa'" class="mx-sm-3">
                       <b-form-input
                       placeholder="ABCDEFG"
                       v-model="placa"
                       :state="pla"
                       ref="placa"
                       />
                      </b-form-group>
                   <b-form-group :label="'Fecha inicio'" class="mx-sm-3">
                       <b-form-input type="date"
                       v-model="desde"
                       :state="des"
                       ref="fecha"
                       />
                      </b-form-group>
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
          <b-card v-if="show">
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
                  <e-column field= "placa" headerText="Placa" textAlign="center"></e-column>
                  <e-column field= "modelo" headerText="Modelo" textAlign="center"></e-column>
                  <e-column field= "fecha" headerText="Fecha" textAlign="center" ></e-column>
                  <e-column field= "status" headerText="Status" textAlign="center" ></e-column>
                  <e-column field= "detalles" headerText="Motivo" textAlign="center" ></e-column>
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
        </transition>
</div>
</template>

<script>

import { mapState } from 'vuex'
import axios from 'axios'
// import Vue from 'vue'
import { Page, Sort, Filter, Toolbar, PdfExport, ExcelExport, Aggregate } from '@syncfusion/ej2-vue-grids'

// nuevo
// import Vue from 'vue'
// import('@syncfusion/ej2-vue-grids').PdfExportProperties

export default {
  name: 'listadomtto',
  data: function () {
    return {
      listaM: [],
      desde: null,
      hasta: null,
      placa: null,
      show: false,
      des: '',
      has: '',
      pla: '',
      data: this.listaM,
      pageSettings: { pageSize: 10 },
      toolbarOptions: ['ExcelExport', 'PdfExport']
    }
  },
  // nuevo
  provide: {
    grid: [Page, Sort, Filter, Toolbar, PdfExport, ExcelExport, Aggregate]
  },
  methods: {
    cargarH (e) {
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
      const placa = this.placa
      axios.get(this.dirapi + '/getHistorico?placa=' + placa + '&desde=' + desde + '&hasta=' + hasta).then(response => {
        console.log('response datos', response.data.data)
        this.listaM = response.data.data
        this.show = true
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
                  value: 'lISTADO DE SERVICIOS REALIZADOS',
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
</style>

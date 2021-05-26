<template>
        <b-card :title="'Listado'">
            <div id="app">
              <ejs-grid ref="grid"
              :dataSource="lista"
              :enableHover= "false"
              :allowPaging="true"
              :pageSettings=pageSettings
              :allowSorting="true"
              :allowFiltering="true"
              :allowPdfExport="true"
              :allowExcelExport="true"
              :toolbar="toolbarOptions"
              :toolbarClick="gridExport"
              :queryCellInfo='customiseCell'>
                <e-columns>
                  <e-column field= "posicion" headerText="Nro" textAlign="center" width=90></e-column>
                  <e-column field= "placa" headerText="Placa" textAlign="center" width=130></e-column>
                  <e-column field= "modelo" headerText="Modelo" textAlign="center" ></e-column>
                  <e-column field= "marca" headerText="Marca" textAlign="center" width=130></e-column>
                  <e-column field= "status" headerText="Status" textAlign="center" width=130 ></e-column>
                  <e-column field= "fecha" headerText="Fecha" textAlign="center" width=120 ></e-column>
                  <e-column field= "dias" headerText="Dias Transcurridos" textAlign="Center" width=160 ></e-column>
                </e-columns>
              </ejs-grid>
            </div>
        </b-card>
</template>
<script>

import { mapState } from 'vuex'
import { Page, Sort, Filter, Toolbar, PdfExport, ExcelExport, Aggregate } from '@syncfusion/ej2-vue-grids'
var moment = require('moment')

// import store from '../store/index'

export default {
  name: 'lista',
  data: function () {
    return {
      lista: [],
      ejemplo: '',
      pageSettings: { pageSize: 10 },
      toolbarOptions: ['ExcelExport', 'PdfExport', 'Print']
    }
  },
  provide: {
    grid: [Page, Sort, Filter, Toolbar, PdfExport, ExcelExport, Aggregate]
  },
  computed: {
    ...mapState(['list'])
    /* veamos: function () {
      return console.log('updated lista')
    } */
  },
  watch: {
    list (val) {
      var hoy = moment()
      this.lista = this.list.map(item => {
        var fecha = moment(item.fecha)
        var color = item.status
        return { posicion: item.posicion,
          placa: item.placa,
          modelo: item.modelo,
          marca: item.marca,
          status: item.status,
          fecha: moment(item.fecha).format('DD-MM-YYYY'),
          dias: hoy.diff(fecha, 'days'),
          colorS: color
        }
      })
    }
  },
  created () {
  // console.log('aqui la lista' + this.list)
  },
  updated () {
    console.log('updated lista')
  },
  mounted () {
    console.log('mounted lista')
    var hoy = moment()
    this.lista = this.list.map(item => {
      var fecha = moment(item.fecha)
      var color = item.status
      return { posicion: item.posicion,
        placa: item.placa,
        modelo: item.modelo,
        marca: item.marca,
        status: item.status,
        fecha: moment(item.fecha).format('DD-MM-YYYY'),
        dias: hoy.diff(fecha, 'days'),
        colorS: color
      }
    })
  },
  methods: {
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
                  value: 'lISTADO DE FLOTA DE VEHICULOS DE AGL',
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
    },
    customiseCell: function (args) {
      if (args.column.field === 'status') {
        if (args.data['status'] === 'OPERATIVO') {
          args.cell.classList.add('OPERATIVO')
        } else if (args.data['status'] === 'INOPERATIVO') {
          args.cell.classList.add('INOPERATIVO')
        }
      }
    }
  }
}
</script>

<style>
  .OPERATIVO {
    background-color:#a3eba7;
  }
  .INOPERATIVO {
    background-color:#d86e6e;
  }
</style>

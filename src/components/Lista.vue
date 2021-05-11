<template>
        <b-card :title="'Listado'">
            <div id="app">
              <ejs-grid ref="grid"
              :dataSource="list"
              :allowPaging="true"
              :pageSettings=pageSettings
              :allowSorting="true"
              :allowFiltering="true"
              :allowPdfExport="true"
              :allowExcelExport="true"
              :toolbar="toolbarOptions"
              :toolbarClick="gridExport">
                <e-columns>
                  <e-column field= "posicion" headerText="Numero" textAlign="center"></e-column>
                  <e-column field= "placa" headerText="Placa" textAlign="center"></e-column>
                  <e-column field= "modelo" headerText="Modelo" textAlign="center" ></e-column>
                  <e-column field= "marca" headerText="Marca" textAlign="center" ></e-column>
                  <e-column field= "status" headerText="Status" textAlign="center" ></e-column>
                </e-columns>
              </ejs-grid>
            </div>
        </b-card>
</template>
<script>

import { mapState } from 'vuex'
import { Page, Sort, Filter, Toolbar, PdfExport, ExcelExport, Aggregate } from '@syncfusion/ej2-vue-grids'

// import store from '../store/index'

export default {
  name: 'lista',
  data: function () {
    return {
      // lista: [],
      pageSettings: { pageSize: 5 },
      toolbarOptions: ['ExcelExport', 'PdfExport']
    }
  },
  provide: {
    grid: [Page, Sort, Filter, Toolbar, PdfExport, ExcelExport, Aggregate]
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
    }
  }
}
</script>

<template>
<div>
  <b-row>
    <b-colxx lg="4" md="12" class="mb-4">
      <div class="position-relative">
          <img src="/assets/img/cargaligera.jpg" class="card-img-top"/>
      </div>
      <gradient-with-radial-progress-card
        icon="simple-icon-basket"
        :title="cargaligera+' Carga Ligera'"
        :detail="'Camionetas y Camiones pequeños'"
        :percent="Number(porcl)"
        :progressText="porcl + '%'"
      />
    </b-colxx>
    <b-colxx lg="4" md="12" class="mb-4">
      <div class="position-relative">
          <img src="/assets/img/cargamediana.jpg" class="card-img-top"/>
      </div>
      <gradient-with-radial-progress-card
        icon="simple-icon-basket-loaded"
        :title="cargamediana+' Carga Mediana'"
        :detail="'Camiones con capacidad maxima 10 Toneladas'"
        :percent="Number(porcm)"
        :progressText="porcm + '%'"
        />
    </b-colxx>
    <b-colxx lg="4" md="12" class="mb-4">
      <div class="position-relative">
          <img src="/assets/img/cargapesada.jpg" class="card-img-top"/>
      </div>
      <gradient-with-radial-progress-card
        icon="iconsminds-mine"
        :title="cargapesada+' Carga Pesada'"
        :detail="'Camiones con capacidad 30 Toneladas o mas'"
        :percent="Number(porcp)"
        :progressText="porcp + '%'"
      />
    </b-colxx>
  </b-row>
</div>
</template>

<script>

import { mapState } from 'vuex'
import axios from 'axios'
// import Vue from 'vue'
import GradientWithRadialProgressCard from '@/components/Cards/GradientWithRadialProgressCard'
// nuevo
// import Vue from 'vue'
// import('@syncfusion/ej2-vue-grids').PdfExportProperties

export default {
  name: 'listadomtto',
  data: function () {
    return {
      cargaligera: null,
      cargamediana: null,
      cargapesada: null,
      flota: null,
      porcl: null,
      porcm: null,
      porcp: null
    }
  },
  components: {
    GradientWithRadialProgressCard
  },
  // nuevo
  computed: {
    ...mapState(['dirapi'])
  },
  mounted () {
    axios.get(this.dirapi + '/vehiculos').then(response => {
      this.cargaligera = 0
      this.cargamediana = 0
      this.cargapesada = 0
      this.flota = 0
      response.data.map(item => {
        if (item.id_tipo_carga === 1) {
          this.cargaligera += 1
        } else if (item.id_tipo_carga === 2) {
          this.cargamediana += 1
        } else if (item.id_tipo_carga === 3) {
          this.cargapesada += 1
        }
      })
      this.flota = this.cargaligera + this.cargamediana + this.cargapesada
      this.porcl = (this.cargaligera * 100 / this.flota).toFixed(2)
      this.porcm = (this.cargamediana * 100 / this.flota).toFixed(2)
      this.porcp = (this.cargapesada * 100 / this.flota).toFixed(2)
    }).catch(error => {
      console.log('error', error)
    })
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

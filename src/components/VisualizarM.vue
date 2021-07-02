<template>
<div>
    <b-row>

        <b-colxx  lg="5" md="12">
            <b-card class="mb-5" :title="'Buscar Orden de Mtto'">

                <b-form @submit.stop.prevent inline>
                  <div class="form-group mb-1">
                    <b-form-input
                    v-model="orden"
                    :state="validacion"
                    class="mb-1 ml-sm-5 mb-sm-0"
                    placeholder="1000000001">
                    </b-form-input>
                  </div>
                  <div class="form-group mx-sm-3 mb-1">
                    <b-button type="submit" variant="primary" @click="buscar" @keyup.enter="buscar">Buscar</b-button>
                  </div>
                </b-form>
            </b-card>
         </b-colxx>

    </b-row>
<transition name="slide-fade">
    <b-row v-if="show">

        <b-colxx lg="4" md="12">
                <b-card class="mb-4" no-body>
                   <div class="position-relative">
                        <img :src="dirphoto+'/'+datos.dir_foto" class="card-img-top"/>
                        <b-badge variant="primary" pill class="position-absolute badge-top-left">TIPO DE SERVICIO </b-badge>
                        <b-badge :variant='statusc' pill class="position-absolute badge-top-left-2">{{datos.categoria}}</b-badge>
                    </div>
                    <b-card-body>
                        <h6 class="mb-4 card-subtitle">{{datos.modelo}}</h6>
                        <h6>KM DEL MTTO : {{datos.kilometraje}} KM </h6><br>
                        <p class="card-text text-muted text-small mb-0 font-weight-light">Este vehiculo Pertenece a la flota de vehiculos registrados del grupo AGROINLACA C.A</p>
                    </b-card-body>
                </b-card>
        </b-colxx>

        <b-colxx lg="8" md="12">
            <b-card class="mb-4" :title="'Orden de Mtto'">
            <b-row>
              <b-colxx  lg="6" md="12">
                <p class="azul">ORDEN DE MTTO NRO : <span class="nada">{{datos.id_mtto}}</span></p>
                <p class="azul">DOCUMENTO SAP ASOCIADO : <span class="nada"> {{datos.doc_sap}}</span></p>
                <p class="azul">TIPO DE MANTENIMIENTO : <span class="nada"> {{datos.categoria}} </span></p>
                <p class="azul">FECHA DE SOLICITUD SERVICIO :<span class="nada"> {{datos.fecha_sol}} </span></p>
                <p class="azul">STATUS DE PAGO :<span :class="pago"> {{datos.status_pago}} </span></p>
                <p class="azul">STATUS DEL MTTO :<span class="nada"> {{datos.status_mtto}} </span></p>
              </b-colxx>
              <b-colxx  lg="6" md="12">
                <p class="azul">PLACA : <span class="nada">{{datos.placa}}</span></p>
                <p class="azul">MODELO :<span class="nada"> {{datos.modelo}}</span> </p>
                <p class="azul">COLOR :<span class="nada"> {{datos.color}} </span></p>
                <p class="azul">FECHA DE EJECUCION SERVICIO :<span class="nada"> {{datos.fecha}} </span></p>
                <p class="azul">PROVEEDOR :<span class='nada'> {{datos.proveedor}} </span></p>
                <p class="azul">PRECIO :<span class="nada"> {{datos.precio}} USD</span></p>
                </b-colxx>
            </b-row>
            <div class="separator mb-3"></div>
                <p class="azul">SERVICIO : <span class="verde"> {{datos.servicio}} </span></p>
                <p class="azul">DETALLES :<span class="nada"> {{datos.observacion}} </span>  </p>
                <!--<p class="text-muted text-small mb-2">Parrafo</p>
                <h5 class="mb-4 card-title">Homemade Cheesecake with Fresh Berries and Mint</h5>
                <h6 class="mb-4 card-subtitle">Cheesecake with Fresh Berries and Mint</h6>
                <p class="card-text text-muted text-small mb-0 font-weight-light">09.04.2018</p>
                <span class="h6"> Inicio | Mantenimientos | Nuevo Mtto </span>-->
            </b-card>
        </b-colxx>
    </b-row>
</transition>
</div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'

export default ({
  name: 'buscar',
  data: function () {
    return {
      show: false, // false
      mensaje: '',
      tipo: '',
      titulo: '',
      validacion: '',
      statusc: '',
      datos: {},
      pago: ''
    }
  },
  methods: {
    buscar () {
      const orden = this.orden
      axios.get(this.dirapi + '/getMtto/' + orden).then(response => {
        console.log('response', response)
        if (response.status === 204) {
          this.show = false // false
          this.validacion = false
          this.mensaje = 'No existe Mantenimiento registrado!'
          this.tipo = 'error filled'
          this.titulo = 'Notificacion'
          this.addNotification()
          return
        }
        this.show = true
        this.validacion = true
        this.mensaje = 'Mantenimiento Encontrado!'
        this.tipo = 'success filled'
        this.titulo = 'Notificacion'
        this.addNotification()
        this.datos = response.data.data
        // console.log('aqui mi kilometraje obtenido' + this.datos.kilometraje)
        if (this.datos.categoria === 'PREVENTIVO') {
          this.statusc = 'success'
        } else {
          this.statusc = 'danger'
        }
        if (this.datos.status_pago === 'PAGADO') {
          this.pago = 'verde'
        } else if (this.datos.status_pago === 'NO PAGADO') {
          this.pago = 'rojo'
        }
      }).catch(error => {
        console.log('error', error)
      })
    },
    addNotification (
      type = this.tipo,
      title = this.titulo,
      message = this.mensaje
    ) {
      this.$notify(type, title, message, { duration: 3000, permanent: false })
    }
  },
  computed: {
    ...mapState(['dirapi', 'dirphoto'])
  }
})
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
.azul {
  color:#145388;
  font-weight: bold;
}
.nada {
  color:#000000;
  font-weight: normal;
}
.verde {
  color:#009443;
  font-weight: normal;
}
.rojo {
  color:#d10000;
  font-weight: normal;
}

</style>

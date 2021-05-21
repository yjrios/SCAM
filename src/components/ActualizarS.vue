<template>
<div>
    <b-row>

        <b-colxx  lg="4" md="12">
            <b-card class="mb-3">

                <b-form @submit.stop.prevent inline class="d-flex justify-content-center">
                  <div class="form-group">
                    <b-form-input
                    v-model="placa"
                    :state="validacion"
                    placeholder="INGRESE PLACA">
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
                <b-card class="mb-1" no-body>
                   <div class="position-relative">
                        <img src="/assets/img/silueta.jpg" class="card-img-top"/>
                        <b-badge variant="primary" pill class="position-absolute badge-top-left">CARGA {{datos.carga}}</b-badge>
                        <b-badge :variant='statusf' pill class="position-absolute badge-top-left-2">{{datos.status}}</b-badge>
                    </div>
                    <b-card-body>
                        <h6 class="mb-4 card-subtitle">{{datos.marca}} - {{datos.modelo}}</h6>
                        <h6>KILOMETROS : {{datos.km}} KM</h6><br>
                        <p class="card-text text-muted text-small mb-0 font-weight-light">Este vehiculo Pertenece a la flota de vehiculos registrados del grupo AGROINLACA C.A</p>
                    </b-card-body>
                </b-card>
        </b-colxx>

        <b-colxx lg="8" md="12">
          <b-card class="mb-1" :title="'Datos Tecnicos del Vehiculo'">
            <b-row>
              <b-colxx  lg="6" md="12">
                <p class="azul">USUARIO : <span class="nada">{{datos.responsable}}</span></p>
                <p class="azul">TIPO DE TRANSPORTE : <span class="nada"> {{datos.tipo_transporte}}</span></p>
                <p class="azul">CLASIFICACION VEHICULO : <span class="nada">CARGA {{datos.carga}} </span></p>
                <p class="azul">PLACA :<span class="nada"> {{datos.placa}} </span></p>
                <p class="azul">MARCA :<span class="nada"> {{datos.marca}} </span></p>
                <p class="azul">STATUS :<span class="nada"> {{datos.status}} DESDE {{datos.fstatus}} </span></p>
              </b-colxx>
              <b-colxx  lg="6" md="12">
                <p class="azul">MODELO : <span class="nada"> {{datos.modelo}} </span></p>
                <p class="azul">AÑO :<span class="nada"> {{datos.ano}} </span>  </p>
                <p class="azul"> COLOR :<span class="nada"> {{datos.color}}</span> </p>
                <p class="azul">KILOMETRAJE ACTUAL :<span class="nada"> {{datos.km}} km </span></p>
                </b-colxx>
            </b-row>
          </b-card>
             <b-card class="mb-1">
                 <b-row >
                    <b-colxx  lg="3" md="12"  >
                        <b-form @submit.stop.prevent>
                            <b-form-group :label="'STATUS DEL VEHICULO:'"  class="d-flex align-items-center">
                                <b-row>
                                    <b-colxx md="5" class="mt-2">
                                        <switches
                                        v-model="valor"
                                        theme="bootstrap"
                                        :color="statusc"
                                        ></switches>
                                    </b-colxx>
                                    <b-colxx md="7" class="mt-2 d-flex align-items-end" >
                                        <p class="h7">{{statusv}}</p>
                                    </b-colxx>
                                </b-row>
                             </b-form-group>
                        </b-form>
                    </b-colxx>
                    <b-colxx  lg="3" md="12"  >
                        <b-form-group :label="'FECHA DEL CAMBIO:'">
                            <b-form-input type="date"
                            v-model="fecha"
                            :state="fec"
                            ref="fecha"
                            />
                        </b-form-group>
                    </b-colxx>
                    <b-colxx  lg="6" md="12"  >
                        <b-form-group :label="'OBSERVACION Y DETALLES'">
                            <b-form-textarea placeholder="Detalle aqui las observaciones..."
                                v-model="detalle"
                                :state="det"
                                ref="detalle"
                            ></b-form-textarea>
                        </b-form-group>
                    </b-colxx>
                 </b-row>
                <b-row class="d-flex justify-content-center">
                 <div>
                            <b-button type="submit" variant="primary" @click="guardar" @keyup.enter="guardar">Actualizar</b-button>
                </div>
                </b-row>
             </b-card>
        </b-colxx>
    </b-row>
</transition>
</div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
import switches from 'vue-switches'

export default ({
  name: 'buscar',
  components: {
    switches
  },
  data: function () {
    return {
      show: false, // false
      mensaje: '',
      tipo: '',
      titulo: '',
      validacion: '',
      statusc: '',
      statusf: '',
      status_v: '',
      datos: {},
      det: '',
      fec: '',
      detalle: null,
      valor: null,
      fecha: null,
      placa: null,
      statusv: ''
    }
  },
  methods: {
    buscar () {
      const placav = this.placa
      axios.get(this.dirapi + '/kilometraje/' + placav).then(response => {
        console.log('response', response)
        if (response.status === 204) {
          this.show = false // false
          this.validacion = false
          this.mensaje = 'No existe placa registrada!'
          this.tipo = 'error filled'
          this.titulo = 'Notificacion'
          this.addNotification()
          return
        }
        this.show = true
        this.validacion = true
        this.mensaje = 'Vehiculo Encontrado!'
        this.tipo = 'success filled'
        this.titulo = 'Notificacion'
        this.addNotification()
        this.datos = response.data.data
        if (this.datos.id_status === '1') {
          this.statusf = 'success'
          this.valor = true
        } else {
          this.statusf = 'danger'
          this.valor = false
        }
      }).catch(error => {
        console.log('error', error)
      })
    },
    guardar (e) {
      if (this.valor) { // para darle el valor del id del status ya que el swich devuelve false o true
        this.status_v = '1'
      } else {
        this.status_v = '9'
      }
      if (!this.fecha) {
        this.fec = false
        this.$refs.fecha.focus()
        return true
      }
      if (!this.detalle) {
        this.det = false
        this.$refs.detalle.focus()
        return true
      }
      // console.log('tipo de dato front' + typeof this.status_v)
      // console.log('tipo de dato bd' + typeof this.datos.id_status)
      if (this.status_v === this.datos.id_status) {
        console.log('entro : ')
        this.mensaje = 'Error, Debe cambiar el status'
        this.tipo = 'error filled'
        this.titulo = 'Notificacion'
        this.addNotification()
        return true
      }
      e.preventDefault()
      const body = {
        placa: this.datos.placa,
        id_status: this.status_v,
        detalle: this.detalle,
        fecha: this.fecha,
        fechanterior: this.datos.fstatus,
        id_ultimo_status: this.datos.id_ultimo_s
      }
      axios.post(this.dirapi + '/actualizarst/', body).then(response => {
        console.log('response', response)
        if (response.data.message === 'Fecha menor!') {
          this.mensaje = 'Prohibido! Fecha menor.'
          this.tipo = 'error filled'
          this.titulo = 'Notificacion'
          this.addNotification()
          return
        }
        this.show = false
        this.validacion = true
        this.mensaje = 'Status actualizado!'
        this.tipo = 'success filled'
        this.titulo = 'Notificacion'
        this.detalle = null
        this.valor = null
        this.fecha = null
        this.det = ''
        this.fec = ''
        this.addNotification()
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
    ...mapState(['dirapi'])
  },
  watch: {
    valor (val) {
      if (val) {
        this.statusv = 'OPERATIVO'
        this.statusc = 'success'
      } else {
        this.statusv = 'INOPERATIVO'
        this.statusc = 'danger'
      }
    }
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
  color:#00aa1c;
  font-weight: bold;
}
</style>

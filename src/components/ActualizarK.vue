<template>
<div>
    <b-row>

        <b-colxx  lg="5" md="12">
            <b-card class="mb-4">

                <b-form @submit.stop.prevent inline>
                  <div class="form-group mb-1">
                    <b-form-input
                    v-model="placa"
                    :state="validacion"
                    class="mb-1 ml-sm-5 mb-sm-0"
                    placeholder="INGRESE PLACA">
                    </b-form-input>
                  </div>
                  <div class="form-group mx-sm-3 mb-1">
                    <b-button type="submit" variant="primary" @click="buscar" @keyup.enter="buscar">Buscar</b-button>
                  </div>
                </b-form>
            </b-card>
         </b-colxx>
         <b-colxx v-if="show" lg="5" md="12" >
             <b-card class="mb-5">
             <b-form @submit.stop.prevent inline>
                  <div class="form-group mb-1">
                    <b-form-input
                    v-model="NKilometraje"
                    :state="kil"
                    class="mb-1 ml-sm-5 mb-sm-0"
                    placeholder="150000 KM"
                    :type="'number'"
                    >
                    </b-form-input>
                  </div>
                  <div class="form-group mx-sm-3 mb-1">
                    <b-button type="submit" variant="success" @click="actualizar" @keyup.enter="actualizar">Actualizar</b-button>
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
                        <img src="/assets/img/silueta.jpg" class="card-img-top"/>
                        <b-badge variant="primary" pill class="position-absolute badge-top-left">CARGA {{datos.carga}}</b-badge>
                        <b-badge :variant='statusc' pill class="position-absolute badge-top-left-2">{{datos.status}}</b-badge>
                    </div>
                    <b-card-body>
                        <h6 class="mb-4 card-subtitle">{{datos.marca}} - {{datos.modelo}}</h6>
                        <h6>KILOMETROS : {{datos.km}} KM</h6><br>
                        <!-- YEISON -->
                        <p class="card-text text-muted text-small mb-0 font-weight-light">Este vehiculo Pertenece a la flota de vehiculos registrados de {{ datos.empresa }}</p>
                        <!-- YEISON -->
                    </b-card-body>
                </b-card>
        </b-colxx>

        <b-colxx lg="8" md="12">
          <b-card class="mb-4" :title="'Datos Tecnicos del Vehiculo'">
            <b-row>
              <b-colxx  lg="6" md="12">
                <p class="azul">USUARIO : <span class="nada">{{datos.responsable}}</span></p>
                <p class="azul">TIPO DE TRANSPORTE : <span class="nada"> {{datos.tipo_transporte}}</span></p>
                <p class="azul">CLASIFICACION VEHICULO : <span class="nada">CARGA {{datos.carga}} </span></p>
                <p class="azul">PLACA :<span class="nada"> {{datos.placa}} </span></p>
                <p class="azul">MARCA :<span class="nada"> {{datos.marca}} </span></p>
              </b-colxx>
              <b-colxx  lg="6" md="12">
                <p class="azul">MODELO : <span class="nada"> {{datos.modelo}} </span></p>
                <p class="azul">AÑO :<span class="nada"> {{datos.ano}} </span>  </p>
                <p class="azul"> COLOR :<span class="nada"> {{datos.color}}</span> </p>
                <p class="azul">KILOMETRAJE ACTUAL :<span class="verde"> {{datos.km}} km </span></p>
                <p class="azul">ULTIMA ACTUALIZACION :<span class="verde">  {{datos.fecha}}</span></p>
                </b-colxx>
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
      kil: '',
      NKilometraje: null,
      placa: null
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
        if (this.datos.id_status === 1) {
          this.statusc = 'success'
        } else {
          this.statusc = 'danger'
        }
      }).catch(error => {
        console.log('error', error)
      })
    },
    actualizar (e) {
      if (!this.NKilometraje) {
        this.kil = false
        return true
      }
      e.preventDefault()
      const body = {
        id_vehiculo: this.datos.id_v,
        km: this.NKilometraje
      }
      axios.post(this.dirapi + '/actualizarkm/', body).then(response => {
        console.log('response', response)
        if (response.data.message === 'Kilometraje menor!') {
          this.mensaje = 'Prohibido! Kilometraje menor.'
          this.tipo = 'error filled'
          this.titulo = 'Notificacion'
          this.addNotification()
          return
        }
        this.show = false
        this.validacion = true
        this.mensaje = 'Kilometraje actualizado!'
        this.tipo = 'success filled'
        this.titulo = 'Notificacion'
        this.addNotification()
        this.datos.km = this.NKilometraje
        this.datos.fecha = response.data.data
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

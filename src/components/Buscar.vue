<template>
<div>
    <b-row>

        <b-colxx  lg="5" md="12">
            <b-card class="mb-5">

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
                        <h6>KILOMETROS : 350.000 KM </h6><br>
                        <p class="card-text text-muted text-small mb-0 font-weight-light">Este vehiculo Pertenece a la flota de vehiculos registrados del grupo AGROINLACA C.A</p>
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
                <p class="azul">TIPO : <span class="nada">{{datos.tipo}}</span></p>
                <p class="azul"> COLOR :<span class="nada"> {{datos.color}}</span> </p>
                <p class="azul">MOTOR :<span class="nada"> {{datos.motor}} </span></p>
                </b-colxx>
            </b-row>
            <b-row>
              <b-colxx  lg="6" md="12">
                <p class="azul">TRANSMISION : <span class="nada">{{datos.transmision}} </span> </p>
                <p class="azul">NUMERO DE EJES :<span class="nada"> {{datos.ejes}} </span></p>
                <p class="azul">CAUCHOS : <span class="nada"> {{datos.cauchos}}</span></p>
                <p class="azul">SISTEMA ELECTRICO : <span class="nada"> {{datos.sistema_electrico}} </span></p>
                <p class="azul">BATERIA :<span class="nada"> {{datos.bateria}}</span></p>
                <p class="azul">SUSPENSION DELANTERA : <span class="nada"> {{datos.suspension_del}}</span> </p>
                </b-colxx>
            <b-colxx  lg="6" md="12">
                <p class="azul">SUSPENSION TRASERA :<span class="nada">  {{datos.suspension_tra}}</span></p>
                <p class="azul">PRESION DE CAUCHOS :<span class="nada">  {{datos.presion_cauchos}}</span></p>
                <p class="azul">ACEITE DE MOTOR :<span class="nada">  {{datos.aceite_motor}}</span></p>
                <p class="azul">ACEITE DE CAJA :<span class="nada">  {{datos.aceite_caja}}</span></p>
                <p class="azul">ACEITE DE DIFERENCIAL :<span class="nada">  {{datos.aceite_diferencial}}</span></p>
                </b-colxx>
            </b-row>
                <!--<p class="text-muted text-small mb-2">Parrafo</p>
                <h5 class="mb-4 card-title">Homemade Cheesecake with Fresh Berries and Mint</h5>
                <h6 class="mb-4 card-subtitle">Cheesecake with Fresh Berries and Mint</h6>
                <p class="card-text text-muted text-small mb-0 font-weight-light">09.04.2018</p>-->
            </b-card>
        </b-colxx>
    </b-row>
</transition>
</div>
</template>

<script>
import axios from 'axios'

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
      datos: {}
    }
  },
  methods: {
    buscar () {
      const placav = this.placa
      axios.get('http://localhost:3050/vehiculos/' + placav).then(response => {
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
          this.statusc = 'success'
        } else {
          this.statusc = 'danger'
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

</style>

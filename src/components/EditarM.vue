<template>
<div>
    <b-row>

        <b-colxx  lg="4" md="12">
            <b-card class="mb-3" :title="'Seleccione Nro de Orden de Mtto'">

                <b-form @submit.stop.prevent inline class="d-flex justify-content-center">
                  <div class="form-group">
                    <b-form-input
                    v-model="orden"
                    :state="validacion"
                    placeholder="1000000001">
                    </b-form-input>
                  </div>
                  <div class="form-group mx-sm-3 mb-1">
                    <b-button type="submit" variant="primary" @click="buscar" @keyup.enter="buscar">Buscar</b-button>
                  </div>
                </b-form>
            </b-card>
         </b-colxx>
         <b-colxx v-if="show" lg="8" md="12" >
             <b-card class="mb-3" :title="'Guarde los cambios'">
             <b-form @submit.stop.prevent inline class="d-flex justify-content-center">
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
                        <img src="/assets/img/mtto.jpg" class="card-img-top"/>
                        <b-badge variant="primary" pill class="position-absolute badge-top-left">TIPO DE SERVICIO </b-badge>
                        <b-badge :variant='statusc' pill class="position-absolute badge-top-left-2">{{datos.categoria}}</b-badge>
                    </div>
                    <b-card-body>
                        <h6 class="mb-4 card-subtitle">{{datos.modelo}}</h6>
                        <h6>KM DEL MTTO : {{datos.kilometraje}} KM </h6><br>
                        <div>
                            <b-form-group label="Desea actualizar el km?">
                            <b-form-radio v-model="actualizark" name="some-radios" value="1">Si, Actualizar ( {{kmactual}} km )</b-form-radio>
                            <b-form-radio v-model="actualizark" name="some-radios" value="2">No, dejar el de la solicitud</b-form-radio>
                            </b-form-group>
                        </div>
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
                <p class="azul">FECHA DEL SERVICIO :<span class="nada"> {{datos.fecha}} </span></p>
                <p class="azul">SERVICIO : <span class="nada"> {{datos.servicio}} </span></p>
              </b-colxx>
              <b-colxx  lg="6" md="12">
                <p class="azul">PLACA : <span class="nada">{{datos.placa}}</span></p>
                <p class="azul">MODELO :<span class="nada"> {{datos.modelo}}</span> </p>
                <p class="azul">COLOR :<span class="nada"> {{datos.color}} </span></p>
                <p class="azul">PROVEEDOR :<span class='nada'> {{datos.proveedor}} </span></p>
                <p class="azul">STATUS DEL MANTENIMIENTO:<span class="nada"> {{datos.status_mtto}} </span></p>
                </b-colxx>
            </b-row>
            <b-row>
                <b-colxx  lg="12" md="12">
                    <div class="separator mb-3"></div>
                    <p class="azul">DETALLES : </p>
                    <b-form-textarea
                            v-model="observacion"
                            :state="obs"
                            ref="observacion"
                        ></b-form-textarea>
                    </b-colxx>
            </b-row><br>
                <b-row>
                    <b-colxx  lg="6" md="12">
                        <p class="azul">STATUS DE MTTO :<span >
                        <b-form-select
                            class="form-select"
                            :options="opciones_mtto"
                            v-model="id_status_mtto"
                            :disabled="bloqueo"
                        ></b-form-select> </span></p>
                    </b-colxx>
                    <b-colxx  lg="6" md="12">
                        <p class="azul">STATUS DE PAGO :<span >
                        <b-form-select
                            class="form-select"
                            :options="opciones_pago"
                            v-model="id_status_pago"
                            ref="status"
                        ></b-form-select> </span></p>
                    </b-colxx>
                </b-row>
                <b-row>
                  <b-colxx  lg="6" md="12">
                     <p class="azul">FECHA DE SOLICITUD :<span >
                                <b-form-input type="date"
                                v-model="fecha_sol"
                                ref="fecha"
                                :disabled="true"
                                />
                        </span></p>
                  </b-colxx>
                  <b-colxx  lg="6" md="12">
                    <p class="azul">FECHA DE EJECUCION :<span >
                    <b-form-input type="date"
                       v-model="fecha"
                       ref="fecha"
                       />
                    </span></p>
                  </b-colxx>
                </b-row>
                <b-row>
                    <b-colxx  lg="6" md="12">
                      <p class="azul">PROVEEDOR :<span >
                        <b-form-select
                            class="form-select"
                            :options="opciones_proveedores"
                            v-model="id_proveedor"
                            ref="status"
                        ></b-form-select> </span></p>
                    </b-colxx>
                    <b-colxx  lg="6" md="12">
                        <p class="azul">PRECIO USD :<span class="nada">
                        <b-form-input
                        v-model="precio"
                        :state="pre"
                        placeholder="100,00 USD"
                        :type="'number'"
                        step=".01"
                        ref="precio"
                        >
                        </b-form-input>
                        </span></p>
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
import { mapState } from 'vuex'

export default ({
  name: 'buscar',
  data: function () {
    return {
      show: false, // false
      bloqueo: false,
      mensaje: '',
      tipo: '',
      titulo: '',
      validacion: '',
      pre: '',
      kmactual: '',
      id_km: '',
      statusc: '',
      datos: {},
      opciones_pago: [],
      opciones_mtto: [],
      opciones_proveedores: [],
      id_proveedor: null,
      id_status_pago: null,
      id_status_mtto: null,
      fecha_sol: null,
      fecha: null,
      precio: null,
      observacion: null,
      actualizark: 2
    }
  },
  methods: {
    buscar () { // METODO BUSCAR SERVICIO
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
        this.obtenerk(this.datos.placa)
        // console.log('aqui mi kilometraje obtenido' + this.datos.kilometraje)
        if (this.datos.categoria === 'PREVENTIVO') {
          this.statusc = 'success'
        } else {
          this.statusc = 'danger'
        }
        console.log('status : ' + this.datos.status)
        if (this.datos.status === 2) {
          console.log('paso por el if')
          this.bloqueo = true
        } else {
          console.log('paso por el else')
          this.bloqueo = false
        }
        this.id_proveedor = this.datos.id_pro
        this.id_status_pago = this.datos.id_p
        this.id_status_mtto = this.datos.status
        this.precio = this.datos.precio
        this.fecha = this.datos.fecha
        this.fecha_sol = this.datos.fecha_sol
        this.observacion = this.datos.observacion
      }).catch(error => {
        console.log('error', error)
      })
    },
    actualizar (e) { // METODO ACTUALIZAR KILOMETRAJE
      if (!this.precio) {
        this.pre = false
        this.$refs.precio.focus()
        this.mensaje = 'Precio no puede esta vacio!'
        this.tipo = 'error filled'
        this.titulo = 'Actualizar'
        this.addNotification()
        return true
      }
      e.preventDefault()
      const body = {
        placa: this.datos.placa,
        actualizak: this.actualizark,
        id_km: this.id_km,
        precio: this.precio,
        id_status_pago: this.id_status_pago,
        fecha: this.fecha,
        id_mtto: this.datos.id_mtto,
        id_servicio: this.datos.id_servicio,
        observacion: this.observacion,
        id_status_mtto: this.id_status_mtto,
        id_proveedor: this.id_proveedor
      }
      axios.put(this.dirapi + '/actualizarmtto', body).then(response => {
        console.log('response servicio', response)
        if (response.data.message === 'Actualizado!') {
          this.mensaje = 'Mantenimiento actualizado con exito!'
          this.tipoM = 'success filled'
          this.titulo = 'Guardar'
          this.addNotification()
          this.show = false
          // this.name = '' // limpiar
          this.id_v = null
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
    },
    obtenerk (placa) {
      axios.get(this.dirapi + '/kilometraje/' + placa).then(response => {
        console.log('kilometraje aqui', response)
        this.kmactual = response.data.data.km
        this.id_km = response.data.data.id_km
      }).catch(error => {
        console.log('error', error)
      })
    }
  },
  computed: {
    ...mapState(['dirapi'])
  },
  mounted () {
    axios.get(this.dirapi + '/statuspago').then(response => {
      console.log('response', response)
      const opciones = response.data.map(item => {
        return { text: item.status_pago, value: item.id }
      })
      this.opciones_pago = [...opciones]
    }).catch(error => {
      console.log('error', error)
    })
    axios.get(this.dirapi + '/statusmtto').then(response => {
      console.log('response', response)
      const opciones = response.data.map(item => {
        return { text: item.status_mtto, value: item.id }
      })
      this.opciones_mtto = [...opciones]
    }).catch(error => {
      console.log('error', error)
    })
    axios.get(this.dirapi + '/proveedores').then(response => {
      console.log('response', response)
      const proveedores = response.data.map(item => {
        return { text: item.proveedor, value: item.id }
      })
      this.opciones_proveedores = [...proveedores]
    }).catch(error => {
      console.log('error', error)
    })
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

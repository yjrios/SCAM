<template>
    <div >
      <b-row>
      <b-colxx lg="4" md="12" >
        <b-card class="mb-2">
                <b-form @submit.stop.prevent inline  class="d-flex justify-content-center">
                  <b-form-group :label="'Vehiculo a Realizar el Mtto'">
                    <b-form-input
                    v-model="placa"
                    :state="pla"
                    class=""
                    placeholder="INGRESE PLACA"
                     >
                    </b-form-input>
                     <b-button class="mx-sm-2 m-1" type="submit" variant="primary" @click="buscar" @keyup.enter="buscar">Asignar</b-button>
                  </b-form-group>
                </b-form>
        </b-card>
      </b-colxx>
      <transition name="slide-fade">
      <b-colxx lg="8" md="12" v-if="show">
        <b-card class="mb-2">
         <b-row>
              <b-colxx  lg="6" md="12">
                <p class="azul h6">USUARIO : <span class="nada">{{datos.responsable}}</span></p>
                <p class="azul h6">MODELO : <span class="nada"> {{datos.modelo}} </span></p>
                <p class="azul h6">AÑO :<span class="nada"> {{datos.ano}} </span>  </p>
                <p class="azul h6">MARCA :<span class="nada"> {{datos.marca}} </span>  </p>
              </b-colxx>
              <b-colxx  lg="6" md="12">
                <p class="verde h6">KILOMETRAJE ACTUAL :<span class="verde"> {{datos.km}} KM </span> </p>
                <p class="azul h6">PlACA :<span class="nada"> {{datos.placa}} </span>  </p>
                <p class="azul h6">COLOR :<span class="nada"> {{datos.color}} </span>  </p>
                </b-colxx>
            </b-row>
        </b-card>
      </b-colxx>
      </transition>
      </b-row>
      <transition name="slide-fade">
      <b-card v-if="show">
        <p class="azul h6">Datos del servicio</p><br>
              <b-form @submit.prevent="guardar" id="formu">
                 <b-row>
                  <b-colxx lg="2" md="12" >
                    <b-form-group :label="'FECHA SOLICITUD'">
                       <b-form-input type="date"
                       v-model="fecha_sol"
                       :state="fecS"
                       ref="fecha_sol"
                       />
                    </b-form-group>
                  </b-colxx>
                   <b-colxx lg="2" md="12">
                    <div>
                      <b-form-group :label="'FECHA EJECUCION'">
                       <b-form-input type="date"
                       v-model="fecha"
                       :state="fec"
                       ref="fecha"
                       />
                      </b-form-group>
                    </div>
                  </b-colxx>
                  <b-colxx lg="7" md="12" >
                    <b-form-group :label="'SERVICIO'">
                      <b-form-select
                        class="form-select"
                        :options="servicios"
                        v-model="id_tipo_servicio"
                        :state="tipS"
                        ref="id_tipo_servicio"
                      ></b-form-select>
                    </b-form-group>
                  </b-colxx>
                 </b-row>
                 <b-row>
                  <b-colxx lg="2" md="12" >
                    <b-form-group :label="'TIPO DE MANTENIMIENTO'">
                      <b-form-select
                        class="form-select"
                        :options="tipos"
                        v-model="id_tipo_mantenimiento"
                        :state="tipM"
                        ref="id_tipo_mantenimiento"
                      ></b-form-select>
                    </b-form-group>
                  </b-colxx>
                  <b-colxx lg="3" md="12" >
                    <b-form-group :label="'PROVEEDOR DEL SERVICIO'">
                    <b-form-select
                        class="form-select"
                        :options="proveedores"
                        v-model="id_proveedor"
                        :state="pro"
                        ref="proveedor"
                      ></b-form-select>
                    </b-form-group>
                  </b-colxx>
                   <b-colxx lg="6" md="12">
                    <b-form-group :label="'OBSERVACION Y DETALLES'">
                      <b-form-textarea placeholder="Detalle aqui las observaciones..."
                        v-model="observacion"
                        :state="obs"
                        ref="observacion"
                      ></b-form-textarea>
                    </b-form-group>
                  </b-colxx>
                 </b-row>
                 <b-row>
                  <b-colxx lg="2" md="12">
                    <b-form-group :label="'PRECIO USD'">
                      <b-form-input
                      v-model="precio"
                      :state="pre"
                      placeholder="100,00 USD"
                      :type="'number'"
                      step=".01"
                      ref="precio"
                      >
                      </b-form-input>
                    </b-form-group>
                  </b-colxx>
                  <b-colxx lg="2" md="12">
                    <b-form-group :label="'STATUS DE PAGO'">
                       <b-form-select
                        class="form-select"
                        :options="opciones_pago"
                        v-model="id_status_pago"
                        :state="sta"
                        ref="status"
                      ></b-form-select>
                    </b-form-group>
                  </b-colxx>
                  <b-colxx lg=3 md="12">
                    <b-form-group :label="'DOCUMENTO SAP'" :description="'ORDEN DE COMPRA O SOLPED'">
                      <b-form-input type="text"
                      v-model="doc_sap"
                      :placeholder="'450003054'"
                      :state="doc"
                      ref="doc_sap"/>
                    </b-form-group>
                  </b-colxx>
                 </b-row>
                  <b-button type="submit" variant="primary" class="mt-4" @click="guardar()" @keyup.enter="guardar">Guardar</b-button>
              </b-form>
   </b-card>
  </transition>
      </div>
</template>

<script>

import axios from 'axios'
import { mapState } from 'vuex'
import moment from 'moment'

export default ({
  name: 'formulariomtto',
  data: function () {
    return {
      placa: null,
      doc_sap: null,
      id_tipo_mantenimiento: null,
      id_tipo_servicio: null,
      fecha: null,
      fecha_sol: null,
      status: null,
      id_proveedor: null,
      observacion: null,
      id_status_pago: null,
      precio: null, // hasta aqui formulario
      pla: '',
      doc: '',
      tipM: '',
      tipS: '',
      fecS: '',
      pro: '',
      obs: '',
      pre: '',
      sta: '',
      show: false,
      mensaje: '',
      tipo: '',
      titulo: '',
      tipos: [],
      servicios: [],
      proveedores: [],
      opciones_pago: []
    }
  },
  methods: {
    buscar () {
      axios.get(this.dirapi + '/kilometraje/' + this.placa).then(response => {
        console.log('response', response)
        if (response.status === 204) {
          this.show = false // false
          this.pla = false
          this.mensaje = 'No existe placa registrada!'
          this.tipo = 'error filled'
          this.titulo = 'Notificacion'
          this.addNotification()
          return
        }
        this.show = true
        this.pla = true
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
      this.$notify(type, title, message, { duration: 6000, permanent: false })
    },
    formato (date) {
      return moment(date).format('DD-MM-YYYY')
    },
    guardar (e) {
      if (!this.fecha_sol) {
        this.fecS = false
        this.$refs.fecha_sol.focus()
        return true
      }
      if (!this.fecha) {
        this.fecha = ''
        this.status = 1
      }
      if (this.fecha) {
        this.status = 2
      }
      if (!this.id_tipo_mantenimiento) {
        this.tipM = false
        return true
      }
      if (!this.id_tipo_servicio) {
        this.tipS = false
        this.$refs.id_tipo_servicio.focus()
        return true
      }
      if (!this.id_proveedor) {
        this.pro = false
        this.$refs.proveedor.focus()
        return true
      }
      if (!this.observacion) {
        this.obs = false
        this.$refs.observacion.focus()
        return true
      }
      if (!this.precio) {
        this.pre = false
        this.$refs.precio.focus()
        return true
      }
      if (!this.id_status_pago) {
        this.est = false
        this.$refs.status.focus()
        return true
      }
      if (!this.doc_sap) {
        this.doc = false
        this.$refs.doc_sap.focus()
        return true
      }
      e.preventDefault()
      const body = {
        id_vehiculo: this.datos.id_v,
        id_kilometraje: this.datos.id_km,
        doc_sap: this.doc_sap,
        id_tipo: this.id_tipo_mantenimiento,
        id_servicio: this.id_tipo_servicio,
        fecha: this.fecha,
        fecha_sol: this.fecha_sol,
        id_proveedor: this.id_proveedor,
        observacion: this.observacion,
        id_status_pago: this.id_status_pago,
        precio: this.precio,
        status: this.status
      }
      axios.post(this.dirapi + '/addService', body).then(response => {
        console.log('response servicio', response)
        if (response.data.message === 'Exito!') {
          this.mensaje = 'Mantenimiento registrado con exito numero:  ' + response.data.doc
          this.tipoM = 'success filled'
          this.titulo = 'Guardar'
          this.addNotification()
          this.show = false
          // this.name = '' // limpiar
          this.id_v = null
          this.id_km = null
          this.doc_sap = null
          this.id_tipo_mantenimiento = null
          this.id_tipo_servicio = null
          this.fecha = null
          this.id_proveedor = null
          this.observacion = null
          this.id_status_pago = null
          this.precio = null
        }
      }).catch(error => {
        console.log('error', error)
      })
    }
  },
  computed: {
    ...mapState(['dirapi'])
  },
  mounted () {
    axios.get(this.dirapi + '/tipos_mtto').then(response => {
      console.log('response', response)
      const tipos = response.data.map(item => {
        return { value: item.id, text: item.categoria }
      })
      this.tipos = [{ value: null, text: 'SELECCIONE' }, ...tipos]
    }).catch(error => {
      console.log('error', error)
    })
    axios.get(this.dirapi + '/servicios').then(response => {
      console.log('response', response)
      const servicios = response.data.map(item => {
        return { text: item.servicio, value: item.id }
      })
      this.servicios = [{ text: 'SELECCIONE', value: null }, ...servicios]
    }).catch(error => {
      console.log('error', error)
    })
    axios.get(this.dirapi + '/proveedores').then(response => {
      console.log('response', response)
      const proveedores = response.data.map(item => {
        return { text: item.proveedor, value: item.id }
      })
      this.proveedores = [{ text: 'SELECCIONE', value: null }, ...proveedores]
    }).catch(error => {
      console.log('error', error)
    })
    axios.get(this.dirapi + '/statuspago').then(response => {
      console.log('response', response)
      const opciones = response.data.map(item => {
        return { text: item.status_pago, value: item.id }
      })
      this.opciones_pago = [{ text: 'SELECCIONE', value: null }, ...opciones]
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

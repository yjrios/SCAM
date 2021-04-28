<template>
    <div >
      <b-row>
      <b-colxx lg="4" md="12" >
        <b-card class="mb-2">
                <b-form @submit.stop.prevent inline  class="d-flex justify-content-center">
                  <b-form-group :label="'Vehiculo a Realizar el Mtto'">
                    <b-form-input
                    v-model="placa"
                    :state="validacion"
                    class=""
                    placeholder="INGRESE PLACA"
                     >
                    </b-form-input>
                     <b-button class="mx-sm-2 m-1" type="submit" variant="primary" @click="buscar" @keyup.enter="buscar">Asignar</b-button>
                  </b-form-group>
                </b-form>
        </b-card>
      </b-colxx>
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
      </b-row>
      <b-card v-if="show">
        <p class="azul h6">Datos del servicio</p><br>
              <b-form @submit.prevent="guardar" id="formu">
                 <b-row>
                  <b-colxx lg="3" md="12" >
                    <b-form-group :label="'Documento Sap'" :description="'ORDEN DE COMPRA O SOLPED'">
                    <b-form-input type="text" :state="doc" v-model="doc_sap" :placeholder="'450003054'" />
                    </b-form-group>
                  </b-colxx>
                   <b-colxx lg="4" md="12">
                    <b-form-group :label="'Tipo de Mantenimiento'">
                      <b-form-select
                        class="form-select"
                        :options="tipos"
                        v-model="id_tipo_mantenimiento"
                        :state="cla"
                      ></b-form-select>
                    </b-form-group>
                  </b-colxx>
                  <b-colxx lg="3" md="12" >
                    <b-form-group :label="'Servicio'">
                      <b-form-select
                        class="form-select"
                        :options="servicios"
                        v-model="id_tipo_servicio"
                        :state="cla"
                      ></b-form-select>
                    </b-form-group>
                  </b-colxx>
                 </b-row>
                 <b-row>
                  <b-colxx lg="2" md="12" >
                    <div>
                      <b-form-group :label="'Fecha del servicio'">
                       <b-form-input type="date"
                       v-model="fecha"
                       :state="fec"
                       />
                      </b-form-group>
                    </div>
                  </b-colxx>
                   <b-colxx lg="6" md="12">
                    <b-form-group :label="'Observacion y Detalles'">
                      <b-form-input type="text"
                        v-model="id_marca"
                        :state="mar"
                      ></b-form-input>
                    </b-form-group>
                  </b-colxx>
                  <b-colxx lg="4" md="12">
                  </b-colxx>
                 </b-row>
                  <b-button type="submit" variant="primary" class="mt-4" @click="guardar()" @keyup.enter="guardar">Guardar</b-button>
              </b-form>
   </b-card>

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
      placa: '',
      validacion: '',
      show: false,
      mensaje: '',
      tipo: '',
      titulo: '',
      id_tipo_mantenimiento: null,
      id_tipo_servicio: null,
      tipos: [],
      servicios: [],
      fecha: ''
    }
  },
  methods: {
    buscar () {
      axios.get(this.dirapi + '/kilometraje/' + this.placa).then(response => {
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
    },
    formato (date) {
      return moment(date).format('DD-MM-YYYY')
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

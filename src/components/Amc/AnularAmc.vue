<template>
  <div>
    <b-card title="Anulando Viaje">
      <b-form @submit.prevent="" id="formu">
        <template>
          <div>
            <b-row colspan="12">
              <b-colxx lg="6" md="12" sm="12" xs="12">
                <b-card class="mb-5">
                  <b-form @submit.stop.prevent inline class="row justify-content-center">
                    <div class="form-group mb-1">
                      <b-form-input
                      v-model.number="nroviaje_Search"
                      :state="validacion"
                      class="mb-1 ml-sm-5 mb-sm-0"
                      placeholder="INGRESE NRO DE VIAJE"
                      ref="viaje"
                      :disabled="disable">
                      </b-form-input>
                    </div>
                    <div class="form-group mx-sm-3 mb-1 " >
                      <b-button type="submit" name="search" :hidden="disable" variant="primary" @click="buscar" @keyup.enter="buscar">Buscar</b-button>
                    </div>
                  </b-form>
                </b-card>
              </b-colxx>
              <b-colxx lg="6" md="12" sm="12" xs="12">
                <b-card class="mb-5" :hidden="!disable">
                  <b-form @submit.stop.prevent inline id="formu" class="row justify-content-center px-0 mr-ml-0">
                    <div class="form-group mb-1">
                      <b-form-group>
                      <b-form-input type="text" placeholder="ANULAR" disabled ref="centro"/>
                      </b-form-group>
                    </div>
                    <div class="form-group mx-sm-3 mb-1 " >
                      <b-button type="submit" class="form-group" ref="btnenviar" variant="success" @click="cambiarstatus">ANULAR</b-button>
                    </div>
                  </b-form>
                </b-card>
              </b-colxx>
            </b-row>
            <transition name="slide-fade">
              <b-row v-if="show">
                <b-colxx lg="3" md="6" sm="12" xs="12">
                  <b-tabs nav-class="separator-tabs ml-0 mb-4" content-class="tab-content" :no-fade="true">
                    <b-tab title="INFORMACIÓN PARA LA CARGA">
                      <b-colxx lg="20" md="12">
                        <b-form-group label="GRANJA O ALMACÉN">
                          <b-form-input type="text" :state="orig" v-model="centroEnvio" placeholder="Dirección" disabled/>
                        </b-form-group>

                        <b-form-group label="DIRECCIÓN">
                          <b-form-input type="text" :state="dir" v-model="dir_centro" placeholder="Dirección" disabled/>
                        </b-form-group>

                        <b-form-group label="FECHA CARGA ESTIMADA">
                          <b-form-input type="text" :state="des" v-model="desde" disabled/>
                        </b-form-group>

                        <b-form-group label="HORA CARGA ESTIMADA">
                          <b-form-input type="text" :state="has" v-model="horad" disabled/>
                        </b-form-group>

                      </b-colxx>
                    </b-tab>
                  </b-tabs>
                </b-colxx>
                <b-colxx lg="3" md="6" sm="12" xs="12">
                  <b-tabs nav-class="separator-tabs ml-2 mb-4 mr-2" content-class="tab-content" :no-fade="true">
                    <b-tab title="INFORMACIÓN PARA LA ENTREGA">
                      <b-colxx lg="20" md="12">
                        <b-form-group label="ALMACÉN / CLIENTE">
                          <b-form-input type="text" :state="dest" v-model="centroDestino" disabled/>
                        </b-form-group>

                        <b-form-group label="DIRECCIÓN">
                          <b-form-input type="text" :state="dirdestino" v-model="dir_centroD" disabled/>
                        </b-form-group>

                        <b-form-group label="FECHA DESCARGA ESTIMADA">
                          <b-form-input type="text" :state="has" v-model="hasta" disabled/>
                        </b-form-group>

                        <b-form-group label="HORA DESCARGA ESTIMADA">
                          <b-form-input type="text" :state="has" v-model="horah" disabled/>
                        </b-form-group>
                      </b-colxx>
                    </b-tab>
                  </b-tabs>
                </b-colxx>
                <b-colxx lg="3" md="6" sm="12" xs="12">
                  <b-tabs nav-class="separator-tabs ml-2 mb-4 mr-2" content-class="tab-content" :no-fade="true">
                    <b-tab title="CHOFER O RESPONSABLE">
                      <b-colxx lg="20" md="12">
                        <b-form-group label="PLACA DEL VEHÍCULO">
                        <b-form-input type="text" v-model="placa" :state="pla" placeholder="Vehículo" disabled/>
                        </b-form-group>

                        <b-form-group label="DESCRIPCIÓN DEL VEHÍCULO">
                        <b-form-input type="text" v-model="tipoVehiculo" :state="tpvh" placeholder="Vehículo" disabled/>
                        </b-form-group>

                        <b-form-group label="CÉDULA">
                        <b-form-input type="text" v-model="cedula" :state="ced" placeholder="identidad" disabled/>
                        </b-form-group>

                        <b-form-group label="CHOFER">
                        <b-form-input type="text" v-model="nombreChofer" :state="chof" placeholder="Nombre y apellido" disabled/>
                        </b-form-group>
                      </b-colxx>
                    </b-tab>
                  </b-tabs>
                </b-colxx>
                <b-colxx lg="3" md="6" sm="12" xs="12">
                  <b-tabs nav-class="separator-tabs ml-2 mb-4 mr-2" content-class="tab-content" :no-fade="true">
                    <b-tab title="MERCANCÍA A DISTRIBUIR">
                      <b-colxx lg="20" md="12">
                        <b-form-group label="CATEGORÍA">
                          <b-form-input type="text" v-model="mercancia" :state="merca" placeholder="Ingrese tipo de mercancía" disabled/>
                        </b-form-group>

                        <b-form-group label="CANTIDAD">
                          <b-form-input type="text" v-model="cantidad" :state="cajasp" placeholder="Cantidad" disabled/>
                        </b-form-group>

                        <b-form-group label="OBSERVACIONES">
                          <b-form-textarea
                            id="textarea-small"
                            v-model="observaciones"
                            size="sm"
                            placeholder="Describa sus observaciones"
                            :state="obser"
                            disabled
                          ></b-form-textarea>
                        </b-form-group>
                      </b-colxx>
                    </b-tab>
                  </b-tabs>
                </b-colxx>
              </b-row>
            </transition>
          </div>
        </template>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'AnularAmc',
  data () {
    return {
      horad: '',
      horah: '',
      statusAnulado: 0,
      validacion: true,
      nroviaje_Search: null,
      disable: false,
      show: false,
      centroDestino: '',
      placa: null,
      mensaje: '',
      titulo: '',
      centroEnvio: '',
      mercancia: '',
      merca: '',
      cantidad: '',
      cajasp: '',
      tipoVehiculo: '',
      tpvh: '',
      cedula: 0,
      ced: '',
      chof: '',
      nombreChofer: '',
      dest: '',
      orig: '',
      dir: '',
      dir_centro: '',
      dir_centroD: '',
      des: '',
      has: '',
      desde: null,
      hasta: null,
      dirdestino: '',
      observaciones: '',
      obser: '',
      pla: '',
      tipoM: ''
    }
  },
  methods: {
    ...mapActions(['getInfoStatus']),

    async cambiarstatus () {
      if (this.disable) {
        const payload = { id_Viaje: this.nroviaje_Search, id_Status: this.statusAnulado }
        axios.put(`${this.dirapi}/amc/anular/${payload.id_Viaje}`, payload)
          .then(resp => {
            if (resp.data.statuscode === 200 || resp.data.message === 'Anulado Exitosamente') {
              this.validacion = true
              this.mensaje = '¡Viaje ' + this.nroviaje_Search + ' ' + resp.data.message + '!'
              this.tipoM = 'success filled'
              this.titulo = 'Notificacion'
              this.addNotification()
              this.limpiar()
            } else {
              this.validacion = true
              this.mensaje = 'Error al anular viaje ' + this.nroviaje_Search
              this.tipoM = 'error filled'
              this.titulo = 'Notificacion'
              this.addNotification()
            }
          })
          .catch(error => {
            this.validacion = true
            this.mensaje = 'Error en el servidor'
            this.tipoM = 'error filled'
            this.titulo = 'Notificacion'
            this.addNotification()
          })
      }
    },
    limpiar () {
      this.placa = ''
      this.tipoVehiculo = ''
      this.nro_viajes = ''
      this.cantidad = ''
      this.cedula = ''
      this.nombreChofer = ''
      this.mercancia = ''
      this.observaciones = ''
      this.nroviaje_Search = null
      this.centroEnvio = ''
      this.dir_centro = ''
      this.centroDestino = ''
      this.dir_centroD = ''
      this.disable = false
      this.show = false
    },
    cargarStatusCombo () {
      this.status.forEach(item => {
        if (item.status === 'ANULADO') {
          this.statusAnulado = item.id
        }
      })
    },
    buscar () {
      if (!this.nroviaje_Search) {
        this.pre = false
        this.$refs.viaje.focus()
        this.mensaje = '¡Nro. de viaje no puede ser vacío!'
        this.tipoM = 'error filled'
        this.titulo = 'Error al buscar'
        this.addNotification()
        return true
      } else {
        this.cargarStatusCombo()
        this.$refs.btnenviar.focus()
        axios.get(this.dirapi + '/amc/buscarviaje/' + this.nroviaje_Search)
          .then(resp => {
            if (resp.data.message === 'NO HAY DATA') {
              this.show = false
              this.validacion = false
              this.mensaje = '¡No existe el viaje ' + this.nroviaje_Search + '!'
              this.tipoM = 'error filled'
              this.titulo = 'Notificacion'
              this.addNotification()
              this.nroviaje_Search = ''
            } else {
              this.disable = true
              this.validacion = true
              this.mensaje = '¡Viaje ' + this.nroviaje_Search + ' Encontrado!'
              this.tipoM = 'success filled'
              this.titulo = 'Notificacion'
              this.addNotification()

              resp.data.viaje.forEach(element => {
                this.placa = element.placa
                this.tipoVehiculo = element.tipo
                this.cantidad = element.cantidad
                this.cedula = element.cedula
                this.nombreChofer = element.nombre
                this.mercancia = element.carga
                this.observaciones = element.detalle
                resp.data.sedes.forEach(item => {
                  if (element.id_SedeOrigen === item.id) {
                    this.centroEnvio = item.descripcion
                    this.dir_centro = item.direccion
                  }
                  if (element.id_SedeDestino === item.id) {
                    this.centroDestino = item.descripcion
                    this.dir_centroD = item.direccion
                  }
                })
                resp.data.detalle.map(ele => {
                  if (ele.id_Viaje === element.id_Viaje) {
                    if (ele.id_Evento === 2 && ele.fchhoraestimada_Llegada !== null) {
                      let fechaini = new Date(ele.fchhoraestimada_Llegada).toLocaleString()
                      let array = fechaini.split(',')
                      let divfecha = array[0].split('/')
                      let divHora = array[1].split(':')
                      if (divHora[0] < 10) {
                        this.horad = '0' + array[1].substr(1, 4)
                      } else {
                        this.horad = array[1].substr(1, 5)
                      }
                      if (divfecha[0] > 9 && divfecha[1] > 9) {
                        this.desde = divfecha[0] + '-' + divfecha[1] + '-' + divfecha[2]
                      }
                      if (divfecha[0] <= 9 && divfecha[1] > 9) {
                        this.desde = '0' + divfecha[0] + '-' + divfecha[1] + '-' + divfecha[2]
                      }
                      if (divfecha[0] > 9 && divfecha[1] <= 9) {
                        this.desde = divfecha[0] + '-0' + divfecha[1] + '-' + divfecha[2]
                      }
                      if (divfecha[0] <= 9 && divfecha[1] <= 9) {
                        this.desde = '0' + divfecha[0] + '-0' + divfecha[1] + '-' + divfecha[2]
                      }
                    }
                    if (ele.id_Evento === 3 && ele.fchhoraestimada_Llegada !== null) {
                      let fechaini = new Date(ele.fchhoraestimada_Llegada).toLocaleString()
                      let array = fechaini.split(',')
                      let divfecha = array[0].split('/')
                      let divHora = array[1].split(':')
                      if (divHora[0] < 10) {
                        this.horah = '0' + array[1].substr(1, 4)
                      } else {
                        this.horah = array[1].substr(1, 5)
                      }

                      if (divfecha[0] <= 9 && divfecha[1] > 9) {
                        this.hasta = '0' + divfecha[0] + '-' + divfecha[1] + '-' + divfecha[2]
                      }
                      if (divfecha[0] > 9 && divfecha[1] <= 9) {
                        this.hasta = divfecha[0] + '-0' + divfecha[1] + '-' + divfecha[2]
                      }
                      if (divfecha[0] > 9 && divfecha[1] > 9) {
                        this.hasta = divfecha[0] + '-' + divfecha[1] + '-' + divfecha[2]
                      }
                      if (divfecha[0] <= 9 && divfecha[1] <= 9) {
                        this.hasta = '0' + divfecha[0] + '-0' + divfecha[1] + '-' + divfecha[2]
                      }
                    }
                  }
                })
                this.show = true
              })
            }
          })
          .catch(error => {
            if (error.reponse && error.reponse.status === 500) {
              this.show = false // false
              this.validacion = false
              this.mensaje = 'Error en el servidor'
              this.tipoM = 'error filled'
              this.titulo = 'Notificacion'
              this.addNotification()
              this.nroviaje_Search = ''
            }
          })
      }
    },
    addNotification (
      type = this.tipoM,
      title = this.titulo,
      message = this.mensaje
    ) {
      this.$notify(type, title, message, { duration: 3000, permanent: false })
    }
  },
  computed: {
    ...mapState(['dirapi', 'dirphoto', 'status', 'viaje'])
  },
  mounted () {
    this.getInfoStatus()
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
.azul {
  color:#145388;
  font-weight: bold;
}
.nada {
  color:#000000;
  font-weight: normal;
}

</style>

<template>
<div>
  <b-card title="Modificando Viaje">
    <b-form @submit.prevent id="formu">
      <template>
        <div>
          <b-row>
            <b-colxx lg="5" md="12" >
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
                  <div class="form-group mx-sm-3 mb-1">
                    <b-button type="submit" name="search" :hidden="disable" variant="primary" @click="buscar" @keyup.enter="buscar">Buscar</b-button>
                  </div>
                </b-form>
              </b-card>
            </b-colxx>
            <b-colxx lg="6" md="12" sm="12" xs="12">
              <b-card class="mb-3" :hidden="!disable">
                <div class="mx-sm-3 mb-1" align="center">
                  <b-button type="submit" ref="btnlimpiar" variant="success" @click="limpiarVar">Limpiar</b-button>
                </div>
              </b-card>
            </b-colxx>
          </b-row>
          <transition name="slide-fade">
            <b-form id="formu" @submit.prevent="guardar">
              <b-row v-if="show">
                <b-colxx lg="3" md="6" sm="12" xs="12">
                  <b-tabs nav-class="separator-tabs ml-0 mb-4" content-class="tab-content" :no-fade="true">
                    <b-tab title="INFORMACIÓN PARA LA CARGA">
                      <b-colxx lg="20" md="12">
                        <b-form-group label="GRANJA O ALMACÉN">
                          <b-form-select
                          class="form-select"
                          :options="tiposCentros"
                          v-model="centroEnvio"
                          :state="orig"
                          @change="SetDirEnvio()"
                          ></b-form-select>
                        </b-form-group>

                        <b-form-group label="DIRECCIÓN">
                          <b-form-input type="text" :state="dir" v-model="dir_centro" placeholder="Dirección" disabled/>
                        </b-form-group>

                        <b-form-group label="FECHA CARGA ESTIMADA">
                          <b-form-input type="date"
                          v-model="desde"
                          :state="des"
                          ref="fecha"
                          />
                        </b-form-group>

                        <b-form-group label="HORA CARGA ESTIMADA">
                          <b-form-input
                          v-model="value1"
                          locale="en"
                          type="time"
                          :state="hora1"
                          ></b-form-input>
                        </b-form-group>
                      </b-colxx>
                    </b-tab>
                  </b-tabs>
                </b-colxx>
                <b-colxx lg="3" md="6" sm="12" xs="12">
                  <b-tabs nav-class="separator-tabs ml-2 mb-4 mr-2" content-class="tab-content" :no-fade="true">
                    <b-tab title="INFORMACIÓN PARA LA ENTREGA">
                      <b-colxx lg="20" md="12" >
                        <b-form-group label="ALMACÉN / CLIENTE">
                          <b-form-select
                          class="form-select"
                          :options="tiposCentros"
                          v-model="centroDestino"
                          :state="dest"
                          @change="SetDirDestino()"
                          ></b-form-select>
                        </b-form-group>

                        <b-form-group label="DIRECCIÓN">
                          <b-form-input type="text" :state="dirdestino" v-model="dir_centroD" placeholder="Dirección" disabled/>
                        </b-form-group>

                        <b-form-group label="FECHA DESCARGA ESTIMADA">
                          <b-form-input type="date"
                          v-model="hasta"
                          :state="has"
                          ref="fecha"
                          />
                        </b-form-group>

                        <b-form-group label="HORA DESCARGA ESTIMADA">
                          <b-form-input
                          v-model="value2"
                          type="time"
                          :state="hora2"
                          />
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
                          <b-form-select
                          class="form-select"
                          :options="tiposPlacas"
                          v-model="placa"
                          :state="pla"
                          @change="SetTpoVehiculo()"
                          ></b-form-select>
                        </b-form-group>

                        <b-form-group label="DESCRIPCIÓN DEL VEHÍCULO">
                        <b-form-input type="text" v-model="tipoVehiculo" :state="tpvh" placeholder="Vehículo" disabled/>
                        </b-form-group>

                        <b-form-group label="CÉDULA">
                        <b-form-input type="text" v-model="cedula" :state="ced" placeholder="ingrese identidad"/>
                        </b-form-group>

                        <b-form-group label="CHOFER">
                        <b-form-input type="text" @change="findPersonal" v-model="nombreChofer" :state="chof" placeholder="Nombre y apellido" disabled/>
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
                          <b-form-input type="text" @keyup="mercancia ? uppercaseMerca : mercancia = ''" v-model="mercancia" :state="merca" placeholder="Ingrese tipo de mercancía"/>
                        </b-form-group>

                        <b-form-group label="CANTIDAD">
                          <b-form-input type="text" @keyup="cantidad ? uppercaseCanti : cantidad = ''" v-model="cantidad" :state="cajasp" placeholder="Cantidad"/>
                        </b-form-group>

                        <b-form-group label="OBSERVACIONES">
                          <b-form-textarea
                            id="textarea-small"
                            v-model="observaciones"
                            size="sm"
                            placeholder="Describa sus observaciones"
                            :state="obser"
                          ></b-form-textarea>
                        </b-form-group>

                        <b-form-group label="NRO VIAJE ANTERIOR">
                          <b-form-input type="number" :state="asoc" v-model.number="asociado" placeholder="Nro de viaje anterior"/>
                        </b-form-group>
                      </b-colxx>
                    </b-tab>
                  </b-tabs>
                </b-colxx>
              </b-row>
              <div class="justify-content-rigth" v-if="show">
                <b-button type="submit" variant="success" class="mt-4" @click="guardar" @keyup.enter="guardar">Modificar</b-button>
              </div>
            </b-form>
          </transition>
        </div>
      </template>
    </b-form>
  </b-card>
</div>
</template>

<script>
import axios from 'axios'
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'EditarAmc',
  data () {
    return {
      asociado: 0,
      asoc: '',
      value1: '',
      value2: '',
      hora1: '',
      hora2: '',
      show: false,
      personal: [],
      vehiculos: [],
      sedes: [],
      validacion: true,
      disable: false,
      nroviaje_Search: null,
      centroDestino: null,
      placa: null,
      mensaje: '',
      titulo: '',
      tiposCentros: [],
      centroEnvio: null,
      mercancia: '',
      merca: '',
      cantidad: '',
      cajasp: '',
      tiposPlacas: [],
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
      desde: '',
      hasta: '',
      dirdestino: '',
      observaciones: '',
      obser: '',
      pla: '',
      id_cedula: null
    }
  },
  methods: {
    ...mapMutations(['cargarViajeAmc']),
    async buscar (e) {
      if (!this.nroviaje_Search || this.nroviaje_Search === 0) {
        this.$refs.viaje.focus()
        this.mensaje = '¡Nro. de viaje no puede ser vacío!'
        this.tipoM = 'error filled'
        this.titulo = 'Notificacion'
        this.addNotification()
        return true
      } else {
        if (typeof this.nroviaje_Search === 'string') {
          this.pre = false
          this.$refs.viaje.focus()
          this.mensaje = '¡El dato ingresado no es válido!'
          this.tipoM = 'error filled'
          this.titulo = 'Notificacion'
          this.addNotification()
        } else {
          await axios.get(this.dirapi + '/amc/buscarviaje/' + this.nroviaje_Search)
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
                  this.tiposPlacas.map(item => {
                    if (item.text === element.placa) {
                      this.placa = item.value
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
                          this.value1 = '0' + array[1].substr(1, 4)
                        } else {
                          this.value1 = array[1].substr(1, 5)
                        }

                        if (divfecha[0] > 9 && divfecha[1] > 9) {
                          this.desde = divfecha[2] + '-' + divfecha[1] + '-' + divfecha[0]
                        }
                        if (divfecha[0] <= 9 && divfecha[1] > 9) {
                          this.desde = divfecha[2] + '-' + divfecha[1] + '-0' + divfecha[0]
                        }
                        if (divfecha[0] > 9 && divfecha[1] <= 9) {
                          this.desde = divfecha[2] + '-0' + divfecha[1] + '-' + divfecha[0]
                        }
                        if (divfecha[0] <= 9 && divfecha[1] <= 9) {
                          this.desde = divfecha[2] + '-0' + divfecha[1] + '-0' + divfecha[0]
                        }
                      }
                      if (ele.id_Evento === 3 && ele.fchhoraestimada_Llegada !== null) {
                        let fechaini = new Date(ele.fchhoraestimada_Llegada).toLocaleString()
                        let array = fechaini.split(',')
                        let divfecha = array[0].split('/')
                        let divHora = array[1].split(':')

                        if (divHora[0] < 10) {
                          this.value2 = '0' + array[1].substr(1, 4)
                        } else {
                          this.value2 = array[1].substr(1, 5)
                        }

                        if (divfecha[0] <= 9 && divfecha[1] > 9) {
                          this.hasta = divfecha[2] + '-' + divfecha[1] + '-0' + divfecha[0]
                        }
                        if (divfecha[0] > 9 && divfecha[1] <= 9) {
                          this.hasta = divfecha[2] + '-0' + divfecha[1] + '-' + divfecha[0]
                        }
                        if (divfecha[0] > 9 && divfecha[1] > 9) {
                          this.hasta = divfecha[2] + '-' + divfecha[1] + '-' + divfecha[0]
                        }
                        if (divfecha[0] <= 9 && divfecha[1] <= 9) {
                          this.hasta = divfecha[2] + '-0' + divfecha[1] + '-0' + divfecha[0]
                        }
                      }
                    }
                  })
                  this.tipoVehiculo = element.tipo
                  this.cantidad = element.cantidad
                  this.cedula = element.cedula
                  this.nombreChofer = element.nombre
                  this.mercancia = element.carga
                  this.observaciones = element.detalle
                  if (element.Viaje_Asoc !== '' && element.Viaje_Asoc !== null) {
                    this.asociado = element.Viaje_Asoc.split('-', 2)
                    this.asociado = Number(this.asociado[1])
                  }
                  resp.data.sedes.map(item => {
                    if (item.id === element.id_SedeOrigen) {
                      this.centroEnvio = element.id_SedeOrigen
                      this.dir_centro = item.direccion
                    }
                    if (item.id === element.id_SedeDestino) {
                      this.centroDestino = element.id_SedeDestino
                      this.dir_centroD = item.direccion
                    }
                  })
                  this.show = true
                })
              }
            })
            .catch(error => {
              if (error.response && error.response.status === 500) {
                this.show = false
                this.validacion = false
                this.mensaje = 'Error en el servidor, intentar más tarde!'
                this.tipoM = 'error filled'
                this.titulo = 'Notificacion'
                this.addNotification()
                this.nroviaje_Search = ''
              }
            })
        }
      }
    },
    async cargarCombos () {
      await axios.get(this.dirapi + '/amc/dropdownviajes')
        .then(resp => {
          this.tiposCentros = resp.data.sedes.map(item => {
            return { value: item.id, text: item.descripcion }
          })

          this.tiposPlacas = resp.data.vehiculos.map(item => {
            return { value: item.ID, text: item.PLACA }
          })

          this.personal = resp.data.personal
          this.vehiculos = resp.data.vehiculos
          this.sedes = resp.data.sedes
        })
        .catch(er => {
          console.log(er)
        })
    },
    SetDirEnvio () {
      this.sedes.forEach(element => {
        if (element.id === this.centroEnvio) {
          this.dir_centro = element.direccion
        }
        return this.dir_centro
      })
    },
    SetDirDestino () {
      this.sedes.forEach(element => {
        if (element.id === this.centroDestino) {
          this.dir_centroD = element.direccion
        }
        return this.dir_centroD
      })
    },
    SetTpoVehiculo () {
      this.vehiculos.forEach(item => {
        if (item.ID === this.placa) {
          this.tipoVehiculo = item.TIPO
          return this.tipoVehiculo
        }
      })
    },
    addNotification (
      type = this.tipoM,
      title = this.titulo,
      message = this.mensaje
    ) {
      this.$notify(type, title, message, { duration: 3000, permanent: false })
    },
    async guardar (e) {
      if (!this.nombreChofer) {
        this.chof = false
        return true
      }
      if (!this.placa) {
        this.pla = false
        return true
      }
      if (!this.tipoVehiculo) {
        this.tpvh = false
        return true
      }
      if (!this.desde) {
        this.des = false
        return true
      }
      if (!this.hasta) {
        this.has = false
        return true
      }
      if (this.desde > this.hasta) {
        this.des = false
        this.has = false
        return true
      }
      if (!this.dir_centro) {
        this.dir = false
        return true
      }
      if (!this.dir_centroD) {
        this.dirdestino = false
        return true
      }
      if (!this.cantidad) {
        this.cajasp = false
        return true
      }
      if (!this.centroEnvio) {
        this.orig = false
        return true
      }
      if (!this.centroDestino) {
        this.dest = false
        return true
      }
      if (!this.cedula) {
        this.ced = false
        return true
      }
      if (!this.mercancia) {
        this.merca = false
        return true
      }
      if (!this.value1) {
        this.hora1 = false
        return true
      }
      if (!this.value2) {
        this.hora2 = false
        return true
      }
      e.preventDefault()
      this.personal.forEach(item => {
        if (item.cedula === this.cedula) {
          this.id_cedula = item.id
        }
      })
      let fchCarga = new Date(this.desde + ' ' + this.value1)
      let fchDescarga = new Date(this.hasta + ' ' + this.value2)
      let viajeAsoc = ''
      if (this.asociado !== null && this.asociado !== 0 && this.asociado !== '') {
        let Asoc = this.vehiculos.filter(i => i.ID === this.placa)
        viajeAsoc = Asoc[0].PLACA + '-' + this.asociado
      }
      const body = {
        id_Vehiculo: this.placa,
        id_Personal: this.id_cedula,
        id_SedeOrigen: this.centroEnvio,
        id_SedeDestino: this.centroDestino,
        carga: this.mercancia,
        detalle: this.observaciones,
        cantidad: this.cantidad,
        fchhoraestimada_Carga: fchCarga,
        fchhoraestimada_Descarga: fchDescarga,
        Viaje_Asoc: viajeAsoc
      }
      axios.put(`${this.dirapi}/amc/editarviaje/${this.nroviaje_Search}`, body)
        .then(resp => {
          if (resp.data.message === 'Modificacion Exitosa') {
            this.limpiarVar()
            this.mensaje = '¡Viaje ' + this.nroviaje_Search + ' actualizado con exito!'
            this.tipoM = 'success filled'
            this.titulo = 'Notificacion'
            this.addNotification()
          }
          if (resp.data.message === 'YA EXISTE VIAJE ASOCIADO') {
            this.validacion = false
            this.mensaje = '¡El viaje número ' + this.asociado + ' ya posee un asociado como anterior!'
            this.tipoM = 'error filled'
            this.titulo = 'Notificacion'
            this.addNotification()
          }
          if (resp.data.message === 'NO EXISTE VIAJE') {
            this.validacion = false
            this.mensaje = '¡El viaje anterior número ' + this.asociado + ' no existe!'
            this.tipoM = 'error filled'
            this.titulo = 'Notificacion'
            this.addNotification()
          }
          if (resp.data.message === 'PLACAS DIFERENTES') {
            this.validacion = false
            this.mensaje = '¡La placa del viaje ' + this.nroviaje_Search + ' y el viaje anterior no coinciden!'
            this.tipoM = 'error filled'
            this.titulo = 'Notificacion'
            this.addNotification()
          }
        })
        .catch(error => {
          if (error.response && error.response.status === 404) {
            this.validacion = false
            this.mensaje = error.response.message
            this.tipoM = 'error filled'
            this.titulo = 'Notificacion'
            this.addNotification()
          }
          if (error.response && error.response.status === 500) {
            this.validacion = false
            this.mensaje = '¡Error en el servidor!'
            this.tipoM = 'error filled'
            this.titulo = 'Notificacion'
            this.addNotification()
          }
        })
    },
    limpiarVar () {
      this.disable = false
      this.show = false
      this.validacion = true
      this.nroviaje_Search = ''
      this.validacion = true
      this.placa = ''
      this.pla = true
      this.cedula = ''
      this.ced = true
      this.centroEnvio = ''
      this.orig = true
      this.centroDestino = ''
      this.dest = true
      this.mercancia = ''
      this.merca = true
      this.observaciones = ''
      this.obser = true
      this.cantidad = ''
      this.cajasp = true
      this.nombreChofer = ''
      this.chof = true
      this.dir_centro = ''
      this.dir = true
      this.dir_centroD = ''
      this.dirdestino = true
      this.desde = ''
      this.des = true
      this.hasta = ''
      this.has = true
      this.tipoVehiculo = ''
      this.tpvh = true
      this.value1 = ''
      this.value2 = ''
      this.hora1 = true
      this.hora2 = true
      this.asociado = 0
    }
  },
  computed: {
    ...mapState(['dirapi', 'dirphoto', 'dropdown']),

    uppercaseMerca () {
      this.mercancia = this.mercancia.toUpperCase()
      return this.mercancia
    },
    uppercaseCanti () {
      this.cantidad = this.cantidad.toUpperCase()
      return this.cantidad
    },
    findPersonal () {
      if (this.cedula > 7) {
        this.personal.forEach(element => {
          if (element.cedula === this.cedula) {
            this.nombreChofer = element.nombre
          }
        })
      } else {
        this.nombreChofer = ''
      }
      return this.nombreChofer
    }
  },
  mounted () {
    this.cargarCombos()
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
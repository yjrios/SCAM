<template>
  <div>
    <b-card title="Nuevo Viaje">
      <b-form @submit.prevent="guardar" id="formu">
        <b-row>
          <b-colxx lg="3" md="6" sm="12" xs="12">
            <b-tabs nav-class="separator-tabs ml-0 mb-4" content-class="tab-content" :no-fade="true">
              <b-tab title="INFORMACIÓN PARA LA CARGA">
                <b-form-group label="GRANJA O ALMACÉN">
                  <b-form-select
                  class="form-select"
                  :options="tipoCentros"
                  v-model="centroEnvio"
                  :state="orig"
                  @change="SetDirEnvio()"
                  ></b-form-select>
                </b-form-group>

                <b-form-group label="DIRECCIÓN">
                  <b-form-input type="text" :state="dir" v-model="dir_centro" placeholder="Dirección Carga" disabled/>
                </b-form-group>

                <b-form-group label="FECHA CARGA ESTIMADA">
                  <b-form-input
                  type="date"
                  v-model="desde"
                  :state="des"
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
              </b-tab>
            </b-tabs>
          </b-colxx>
          <b-colxx lg="3" md="6" sm="12" xs="12">
            <b-tabs nav-class="separator-tabs ml-2 mb-4 mr-2" content-class="tab-content" :no-fade="true">
              <b-tab title="INFORMACIÓN PARA LA ENTREGA">
                <b-form-group label="ALMACÉN / CLIENTE">
                  <b-form-select
                  class="form-select"
                  :options="tipoCentros"
                  v-model="centroDestino"
                  :state="dest"
                  @change="SetDirDestino()"
                  ></b-form-select>
                </b-form-group>

                <b-form-group label="DIRECCIÓN">
                  <b-form-input type="text" :state="dirdestino" v-model="dir_centroD" placeholder="Dirección Descarga" disabled/>
                </b-form-group>

                <b-form-group label="FECHA DESCARGA ESTIMADA">
                  <b-form-input
                  type="date"
                  v-model="hasta"
                  :state="has"
                  />
                </b-form-group>

                <b-form-group label="HORA DESCARGA ESTIMADA">
                  <b-form-input
                  v-model="value2"
                  :state="hora2"
                  type="time"
                  />
                </b-form-group>
              </b-tab>
            </b-tabs>
          </b-colxx>
          <b-colxx lg="3" md="6" sm="12" xs="12">
            <b-tabs nav-class="separator-tabs ml-2 mb-4 mr-2" content-class="tab-content" :no-fade="true">
              <b-tab title="CHOFER O RESPONSABLE">
                <template>
                <b-form-group label="PLACA DEL VEHÍCULO">
                  <b-form-select
                  class="form-select"
                  :options="tiposPlacas"
                  v-model="placa"
                  :state="pla"
                  @change="SetTpoVehiculo()"
                  ></b-form-select>
                </b-form-group>
                </template>

                <b-form-group label="DESCRIPCIÓN DEL VEHÍCULO">
                <b-form-input type="text" v-model="tipoVehiculo" :state="tpvh" placeholder="Vehículo" disabled/>
                </b-form-group>

                <b-form-group label="CÉDULA">
                <b-form-input type="text" v-model="cedula" :state="ced" placeholder="ingrese identidad"/>
                </b-form-group>

                <b-form-group label="CHOFER">
                <b-form-input  type="text" @change="findPersonal" v-model="nombreChofer" :state="chof" placeholder="Ingrese nombre y apellido" disabled/>
                </b-form-group>

              </b-tab>
            </b-tabs>
          </b-colxx>
          <b-colxx lg="3" md="6" sm="12" xs="12">
            <b-tabs nav-class="separator-tabs ml-2 mb-4 mr-2" content-class="tab-content" :no-fade="true">
              <b-tab title="MERCANCÍA A DISTRIBUIR">
                <b-form-group label="CATEGORÍA">
                  <b-form-input @keyup="mercancia ? uppercaseMerca : mercancia = ''" type="text" v-model="mercancia" :state="merca" placeholder="Ingrese tipo de mercancía"/>
                </b-form-group>

                <b-form-group label="CANTIDAD">
                  <b-form-input type="text" @keyup="cantidad ? uppercaseCanti : cantidad = ''" v-model="cantidad" :state="cajasp" placeholder="Cantidad"/>
                </b-form-group>

                <b-form-group label="OBSERVACIONES">
                  <b-form-textarea
                    id="textarea-small"
                    v-model="observaciones"
                    :state="obser"
                    size="sm"
                    placeholder="Describa sus observaciones"
                  ></b-form-textarea>
                </b-form-group>                
              </b-tab>
            </b-tabs>
          </b-colxx>
        </b-row>
        <b-button type="submit" variant="primary" class="mt-4" @click="guardar" @keyup.enter="guardar">Guardar</b-button>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import axios from 'axios'
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'RegistrarAmc',
  data () {
    return {
      hora1: '',
      hora2: '',
      value1: null,
      value2: null,
      id_cedula: 0,
      centroDestino: null,
      placa: null,
      id_status: 1,
      mensaje: '',
      titulo: '',
      tipoM: '',
      sedes: [],
      centroEnvio: null,
      mercancia: '',
      merca: '',
      cantidad: '',
      cajasp: '',
      tiposPlacas: [],
      tipoVehiculo: '',
      tpvh: '',
      cedula: '',
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
      personal: [],
      vehiculos: [],
      tipoCentros: []
    }
  },
  methods: {
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
    async guardar (e) {
      if (!this.centroEnvio) {
        this.orig = false
        return true
      }
      if (!this.desde) {
        this.des = false
        return true
      }
      if (!this.placa) {
        this.pla = false
        return true
      }
      if (!this.dir_centro) {
        this.dir = false
        return true
      }
      if (!this.centroDestino) {
        this.dest = false
        return true
      }
      if (!this.dir_centroD) {
        this.dirdestino = false
        return true
      }
      if (!this.hasta) {
        this.has = false
        return true
      }
      if (!this.tipoVehiculo) {
        this.tpvh = false
        return true
      }
      if (!this.cedula) {
        this.ced = false
        return true
      }
      if (!this.nombreChofer) {
        this.chof = false
        return true
      }
      if (!this.mercancia) {
        this.merca = false
        return true
      }
      if (!this.cantidad) {
        this.cajasp = false
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
      if (this.desde > this.hasta) {
        this.des = false
        this.has = false
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

      const body = {
        id_Vehiculo: this.placa,
        cantidad: this.cantidad,
        id_Personal: this.id_cedula,
        id_SedeDestino: this.centroDestino,
        id_SedeOrigen: this.centroEnvio,
        id_Status: this.id_status,
        carga: this.mercancia,
        detalle: this.observaciones,
        fchhoraestimada_Carga: fchCarga,
        fchhoraestimada_Descarga: fchDescarga
      }
      await axios.post(this.dirapi + '/amc/registrar', body)
        .then(resp => {
          if (resp.status === 200) {
            this.mensaje = '¡Registro Viaje Exitoso!'
            this.tipoM = 'success filled'
            this.titulo = 'Agregar'
            this.addNotification()
            this.limpiarVar()
          }
        })
        .catch(error => {
          if (error.response.status === 400) {
            this.mensaje = '¡Error al registrar, intente nuevamente!'
            this.tipoM = 'error filled'
            this.titulo = 'Error'
            this.addNotification()
          } else {
            this.mensaje = '¡Error del servidor, intente luego!'
            this.tipoM = 'error filled'
            this.titulo = 'Error'
            this.addNotification()
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
    limpiarVar () {
      this.value1 = ''
      this.value2 = ''
      this.hora1 = true
      this.hora2 = true
      this.placa = null
      this.pla = true
      this.cedula = ''
      this.ced = true
      this.centroEnvio = null
      this.orig = true
      this.centroDestino = null
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
    },
    ...mapMutations(['cargar'])
  },
  created () {
    axios.get(this.dirapi + '/amc/dropdownviajes')
      .then(resp => {
        if (resp.data) {
          this.personal = resp.data.personal
          this.vehiculos = resp.data.vehiculos
          this.sedes = resp.data.sedes
          const centros = resp.data.sedes.map(item => {
            return { value: item.id, text: item.descripcion }
          })
          this.tipoCentros = [{ value: null, text: 'SELECCIONE' }, ...centros]
          const placasAll = resp.data.vehiculos.map(item => {
            return { value: item.ID, text: item.PLACA }
          })
          this.tiposPlacas = [{ value: null, text: 'SELECCIONE' }, ...placasAll]//              CARGO COMBOBOX TODAS LAS PLACAS
        }
      })
      .catch(e => {
        console.log(e)
      })
  },
  computed: {
    ...mapState(['dirapi', 'dropdown']),
    findPersonal () {
      if (this.cedula > 7) {
        this.personal.forEach(element => {
          if (element.cedula === this.cedula) {
            this.nombreChofer = element.nombre
          }
        })
      }
      return this.nombreChofer
    },
    uppercaseMerca () {
      this.mercancia = this.mercancia.toUpperCase()
      return this.mercancia
    },
    uppercaseCanti () {
      this.cantidad = this.cantidad.toUpperCase()
      return this.cantidad
    },
  }
}
</script>

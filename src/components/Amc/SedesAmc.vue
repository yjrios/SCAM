<template>
  <div>
    <b-card title="Registrando Centro">
      <b-form @submit.prevent>
        <b-row colspan="12">
          <b-colxx lg="5" md="6">
            <b-form-group label="DESCRIPCIÓN">
              <b-form-input @keyup="descripcion ? uppercaseDes : descripcion = ''" type="text" :state="des" v-model="descripcion" placeholder="Ingrese una descripción"/>
            </b-form-group>
          </b-colxx>
          <b-colxx lg="5" md="6">
            <b-form-group label="DIRECCIÓN">
              <b-form-input @keyup="dir_centro ? uppercaseDir : dir_centro = ''" type="text" :state="dir" v-model="dir_centro" placeholder="Ingrese una dirección"/>
            </b-form-group>
          </b-colxx>
          <b-colxx lg="2" md="12" sm="12" xs="12">
            <div class="form-group mx-sm-3 mb-1">
              <b-button type="submit" variant="primary" block class="mt-4" @click="guardar()" @keyup.enter="guardar">Guardar</b-button>
            </div>
          </b-colxx>
        </b-row>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'

export default {
  name: 'SedesAmc',
  data () {
    return {
      validacion: false,
      mensaje: '',
      tipoM: '',
      titulo: '',
      descripcion: '',
      dir_centro: '',
      dir: '',
      des: ''
    }
  },
  methods: {
    guardar () {
      if (this.descripcion !== '' && this.dir_centro !== '') {
        axios.post(this.dirapi + '/amc/registrar/centros', { descripcion: this.descripcion, direccion: this.dir_centro })
          .then(resp => {
            if (resp.status === 200) {
              this.validacion = true
              this.mensaje = '¡Registro de centro exitoso!'
              this.tipoM = 'success filled'
              this.titulo = 'Notificacion'
              this.addNotification()
              this.limpiarcampos()
            }
          })
          .catch(err => {
            if (err) {
              this.validacion = true
              this.mensaje = '¡Error al registrar!'
              this.tipoM = 'error filled'
              this.titulo = 'Notificacion'
              this.addNotification()
            }
          })
      } else {
        this.des = false
        this.dir = false
        this.validacion = true
        this.mensaje = '¡Error al registrar centro, campos no pueden ser vacíos!'
        this.tipoM = 'error filled'
        this.titulo = 'Notificacion'
        this.addNotification()
      }
    },
    addNotification (
      type = this.tipoM,
      title = this.titulo,
      message = this.mensaje
    ) {
      this.$notify(type, title, message, { duration: 3000, permanent: false })
    },
    limpiarcampos () {
      this.des = true
      this.dir = true
      this.descripcion = ''
      this.dir_centro = ''
      this.validacion = false
    }
  },
  computed: {
    ...mapState(['dirapi']),
    uppercaseDir () {
      this.dir_centro = this.dir_centro.toUpperCase()
      return this.dir_centro
    },
    uppercaseDes () {
      this.descripcion = this.descripcion.toUpperCase()
      return this.descripcion
    }
  }
}
</script>

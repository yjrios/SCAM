<template>
<div>
    <b-row class="">

      <b-colxx  lg="4" md="12" >
          <b-card class="mb-3">
              <b-form @submit.stop.prevent inline class="row justify-content-center">
                <div class="form-group mb-1">
                  <b-form-input
                  v-model="placa"
                  :state="validacion"
                  class="mb-1 ml-sm-5 mb-sm-0"
                  placeholder="INGRESE PLACA"
                  ref="placa">
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
        <b-colxx lg="9" md="12">
            <b-card class="mb-4" :title="'Datos Tecnicos del Vehiculo'">
                <b-form @submit.prevent="guardar" id="formu">
                  <b-row>
                    <!-- YEISON -->
                    <!-- <b-colxx lg="4" md="12" >
                      <b-form-group :label="'Piloto o Responsable'" :description="'Nombre del chofer'">
                      <b-form-input type="text" :state="resp" v-model="responsable" :placeholder="'Pablo Puerta'" />
                      </b-form-group>
                    </b-colxx> -->
                    <b-colxx lg="6" md="12" >
                      <b-form-group :label="'Placa'">
                      <b-form-input type="text" v-model="placa" :state="pla" :placeholder="'ABCDEF'" :disabled="true"/>
                      </b-form-group>
                    </b-colxx>

                    <b-colxx lg="6" md="12" >
                      <b-form-group :label="'Sede'">
                        <b-form-select
                          class="form-select"
                          :options="empresas"
                          v-model="id_empresa"
                          :state="sede"
                        ></b-form-select>
                      </b-form-group>
                    </b-colxx>
                    <!-- YEISON -->
                  </b-row>
                  <b-row>
                    <!-- YEISON -->
                    <b-colxx lg="3" md="12" >
                      <b-form-group :label="'Piloto o Responsable'" :description="'Nombre del chofer'">
                      <b-form-input type="text" :state="resp" v-model="responsable" :placeholder="'Pablo Puerta'" />
                      </b-form-group>
                    </b-colxx>
                    <!-- YEISON -->
                    <b-colxx lg="4" md="12">
                      <b-form-group :label="'Clasificacion del vehículo'">
                        <b-form-select
                          class="form-select"
                          :options="tipos"
                          v-model="id_tipo_carga"
                          :state="cla"
                        ></b-form-select>
                      </b-form-group>
                    </b-colxx>
                    <b-colxx lg="4" md="12" >
                      <b-form-group :label="'Tipo de Transporte '">
                      <b-form-input type="text" v-model="tipo_transporte" :state="tipT" :placeholder="'PERSONAL'" />
                      </b-form-group>
                    </b-colxx>
                    <b-colxx lg="4" md="12">
                      <b-form-group :label="'Marca'">
                        <b-form-select
                          class="form-select"
                          :options="marcas"
                          v-model="id_marca"
                          :state="mar"
                        ></b-form-select>
                      </b-form-group>
                    </b-colxx>
                    <b-colxx lg="4" md="12">
                      <b-form-group :label="'Modelo'">
                      <b-form-input type="text" v-model="modelo" :state="mod" :placeholder="'CHEYENNE 4X2'"/>
                      </b-form-group>
                    </b-colxx>
                    <b-colxx lg="2" md="12">
                      <b-form-group :label="'Ano'">
                      <b-form-input type="text" v-model="ano" :state="an" :placeholder="'1992'"/>
                      </b-form-group>
                    </b-colxx>
                  </b-row>
                  <b-row>
                    <b-colxx lg="3" md="12" >
                      <b-form-group :label="'Tipo'" >
                      <b-form-input type="text" v-model="tipov" :state="tip" :placeholder="'PICK UP'" />
                      </b-form-group>
                    </b-colxx>
                    <b-colxx lg="2" md="12">
                      <b-form-group :label="'Color'">
                      <b-form-input type="text" v-model="color" :state="col" :placeholder="'BLANCO'"/>
                      </b-form-group>
                    </b-colxx>
                    <b-colxx lg="6" md="12">
                      <b-form-group :label="'Motor'">
                      <b-form-input type="text" v-model="motor" :state="mot" :placeholder="'VORTEC 5.3L 325'"/>
                      </b-form-group>
                    </b-colxx>
                    <b-colxx lg="1" md="12">
                      <b-form-group :label="'Ejes'">
                      <b-form-input type="text" v-model="ejes" :state="eje" :placeholder="'2'"/>
                      </b-form-group>
                    </b-colxx>
                  </b-row>
                  <b-row>
                    <b-colxx lg="3" md="12" >
                      <b-form-group :label="'Transmision'" >
                      <b-form-input type="text" v-model="transmision" :state="tra" :placeholder="'AUTOMATICA 4L60E'" />
                      </b-form-group>
                    </b-colxx>
                    <b-colxx lg="4" md="12">
                      <b-form-group :label="'Cauchos'">
                      <b-form-input type="text" v-model="cauchos" :state="cau" :placeholder="'265/70R17 CARRETERA'"/>
                      </b-form-group>
                    </b-colxx>
                    <b-colxx lg="2" md="12">
                      <b-form-group :label="'Sistema Electrico'">
                      <b-form-input type="text" v-model="sistema_electrico" :state="sis" :placeholder="'12V'"/>
                      </b-form-group>
                    </b-colxx>
                    <b-colxx lg="2" md="12">
                      <b-form-group :label="'Bateria'">
                      <b-form-input type="text" v-model="bateria" :state="bat" :placeholder="'GRUPO 24'"/>
                      </b-form-group>
                    </b-colxx>
                  </b-row>
                  <b-row>
                    <b-colxx lg="5" md="12" >
                      <b-form-group :label="'Suspension Delantera'" >
                      <b-form-input type="text" v-model="suspension_del" :state="susD" :placeholder="'INDEPENDIENTE ESPIRAL Y MESETA'" />
                      </b-form-group>
                    </b-colxx>
                    <b-colxx lg="5" md="12">
                      <b-form-group :label="'Suspension Trasera'">
                      <b-form-input type="text" v-model="suspension_tra" :state="susT" :placeholder="'BALLESTAS Y AMORTIGUADORES'"/>
                      </b-form-group>
                    </b-colxx>
                  </b-row>
                  <b-row>
                    <b-colxx lg="2" md="12">
                      <b-form-group :label="'Presion de Cauchos'">
                      <b-form-input type="text" v-model="presion_cauchos" :state="pre" :placeholder="'35 PSI'"/>
                      </b-form-group>
                    </b-colxx>
                    <b-colxx lg="4" md="12" >
                      <b-form-group :label="'Aceite de Motor'" >
                      <b-form-input type="text" v-model="aceite_motor" :state="aceM" :placeholder="'ACEITE PARA MOTOR GASOLINA SAE 15W40'" />
                      </b-form-group>
                    </b-colxx>
                    <b-colxx lg="6" md="12">
                      <b-form-group :label="'Aceite de Caja'">
                      <b-form-input type="text" v-model="aceite_caja" :state="aceC"  :placeholder="'ACEITE PARA TRANSMISIONES AUTOMATICAS DEXR 3'"/>
                      </b-form-group>
                    </b-colxx>
                  </b-row>
                  <b-row>
                    <b-colxx lg="6" md="12" >
                      <b-form-group :label="'Aceite Diferencial'" >
                      <b-form-input type="text" v-model="aceite_diferencial" :state="aceD" :placeholder="'ACEITE PARA TRANSMISIONES SAE 80W90 API GL-5'" />
                      </b-form-group>
                    </b-colxx>
                  </b-row>
                 <div class="row justify-content-center">
                  <b-button type="submit" variant="primary" class="mt-4" @keyup.enter="guardar">Guardar Cambios</b-button>
                 </div>
              </b-form>
            </b-card>
        </b-colxx>
        <b-colxx lg="3" md="12">
          <form enctype="multipart/form-data">
                <b-card class="mb-0" no-body>
                   <div class="position-relative border p-2">
                                <template>
                                    <div class="border p-1 mt-1" >
                                        <img :src="preview" class="img-fluid" />
                                        <b-badge variant="primary" pill class="position-absolute badge-top-left">CARGA {{datos.carga}}</b-badge>
                                        <b-badge :variant='statusc' pill class="position-absolute badge-top-left-2">{{datos.status}}</b-badge>
                                        <h6 class="m-2 card-subtitle row justify-content-center">{{datos.marca}} - {{datos.modelo}}</h6>
                                    </div>
                                    <div v-if="file2">
                                        <p class="card-text text-muted mb-0 font-weight-light p-1">Nombre de la foto: {{ image.name }}</p>
                                        <p class="card-text text-muted mb-0 font-weight-light p-1">Tamaño: {{ (image.size/1048576).toFixed(2) }} MB</p>
                                    </div>
                                </template>
                                </div>
                                <div class="p-2">
                            <b-input-group >
                            <b-form-file type="file" accept="image/*" @change="previewImage" class="form-control-file" :placeholder="'Sin imagen nueva...'" v-model="file2">
                            </b-form-file>
                            </b-input-group>
                    </div>
                </b-card>
          </form>
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
  data () {
    return {
      empresas: [],
      id_empresa: null,
      placa: null,
      show: false, // false
      mensaje: '',
      titulo: '',
      tipoM: '',
      validacion: '',
      statusc: '',
      datos: {},
      id_marca: null,
      modelo: null,
      tipov: null,
      motor: null,
      transmision: null,
      ejes: null,
      cauchos: null,
      sistema_electrico: null,
      bateria: null,
      suspension_del: null,
      suspension_tra: null,
      presion_cauchos: null,
      aceite_motor: null,
      aceite_caja: null,
      aceite_diferencial: null,
      dir_foto: '',
      id_tipo_carga: null,
      color: null,
      responsable: null,
      tipo_transporte: null,
      ano: null,
      file2: null,
      preview: null,
      image: null,
      marcas: [],
      tipos: [],
      resp: '',
      cla: '',
      tipT: '',
      pla: '',
      mar: '',
      mod: '',
      an: '',
      tip: '',
      col: '',
      sede: '',
      mot: '',
      eje: '',
      tra: '',
      cau: '',
      sis: '',
      bat: '',
      susD: '',
      susT: '',
      pre: '',
      aceM: '',
      aceC: '',
      aceD: ''
    }
  },

  methods: {
    buscar (e) {
      if (!this.placa) {
        this.pre = false
        this.$refs.placa.focus()
        this.mensaje = 'Placa no puede esta vacio!'
        this.tipoM = 'error filled'
        this.titulo = 'Buscar'
        this.addNotification()
        return true
      }
      e.preventDefault()
      const placav = this.placa
      axios.get(this.dirapi + '/vehiculo/' + placav).then(response => {
        console.log('response', response)
        if (response.status === 204) {
          this.show = false // false
          this.validacion = false
          this.mensaje = 'No existe placa registrada!'
          this.tipoM = 'error filled'
          this.titulo = 'Notificacion'
          this.addNotification()
          return
        }
        this.show = true
        this.validacion = true
        this.mensaje = 'Vehiculo Encontrado!'
        this.tipoM = 'success filled'
        this.titulo = 'Notificacion'
        this.addNotification()
        this.datos = response.data.data
        /* this.empresas = response.data.empresas */

        /* const empresasAll = response.data.empresas.map(item => {
        return { text: item.empresa, value: item.id }
      }) */
      this.empresas = response.data.empresas.map(item => {
        return { text: item.empresa, value: item.id }
      })


        // console.log('aqui mi kilometraje obtenido' + this.datos.kilometraje)
        if (this.datos.id_status === 1) {
          this.statusc = 'success'
        } else {
          this.statusc = 'danger'
        }
        this.responsable = this.datos.responsable
        this.bateria = this.datos.bateria
        this.tipo_transporte = this.datos.tipo_transporte
        this.modelo = this.datos.modelo
        this.ano = this.datos.ano
        this.tipov = this.datos.tipo
        this.color = this.datos.color
        this.motor = this.datos.motor
        this.ejes = this.datos.ejes
        this.transmision = this.datos.transmision
        this.cauchos = this.datos.cauchos
        this.sistema_electrico = this.datos.sistema_electrico
        this.suspension_del = this.datos.suspension_del
        this.suspension_tra = this.datos.suspension_tra
        this.presion_cauchos = this.datos.presion_cauchos
        this.aceite_motor = this.datos.aceite_motor
        this.aceite_caja = this.datos.aceite_caja
        this.aceite_diferencial = this.datos.aceite_diferencial
        this.id_marca = this.datos.id_marca
        this.id_tipo_carga = this.datos.id_tipo_carga
        this.dir_foto = this.datos.dir_foto
        this.preview = this.dirphoto + '/' + this.datos.dir_foto
        /* //YEISON */
        this.id_empresa = this.datos.id_empresa
        /* //YEISON */
      }).catch(error => {
        console.log('error', error)
      })
    },
    addNotification (
      type = this.tipoM,
      title = this.titulo,
      message = this.mensaje
    ) {
      this.$notify(type, title, message, { duration: 3000, permanent: false })
    },
    seleccionfoto () {
      this.file = this.$refs.file.files[0]
    },
    previewImage (event) {
      var input = event.target
      if (input.files) {
        var reader = new FileReader()
        reader.onload = (e) => {
          this.preview = e.target.result
        }
        this.image = input.files[0]
        reader.readAsDataURL(input.files[0])
      }
    },
    reset () {
      this.image = null
      this.preview = null
    },
    async guardar (e) {
      if (!this.id_empresa) {
        this.sede = false
        return true
      }
      if (!this.responsable) {
        this.resp = false
        return true
      }
      if (!this.id_tipo_carga) {
        this.cla = false
        return true
      }
      if (!this.placa) {
        this.pla = false
        return true
      }
      if (!this.id_marca) {
        this.mar = false
        return true
      }
      if (!this.modelo) {
        this.mod = false
        return true
      }
      if (!this.tipov) {
        this.tip = false
        return true
      }
      if (!this.motor) {
        this.mot = false
        return true
      }
      if (!this.transmision) {
        this.tra = false
        return true
      }
      if (!this.ejes) {
        this.eje = false
        return true
      }
      if (!this.cauchos) {
        this.cau = false
        return true
      }
      if (!this.sistema_electrico) {
        this.sis = false
        return true
      }
      if (!this.bateria) {
        this.bat = false
        return true
      }
      if (!this.suspension_del) {
        this.susD = false
        return true
      }
      if (!this.suspension_tra) {
        this.susT = false
        return true
      }
      if (!this.presion_cauchos) {
        this.pre = false
        return true
      }
      if (!this.aceite_motor) {
        this.aceM = false
        return true
      }
      if (!this.aceite_caja) {
        this.aceC = false
        return true
      }
      if (!this.aceite_diferencial) {
        this.aceD = false
        return true
      }
      if (!this.color) {
        this.col = false
        return true
      }
      if (!this.tipo_transporte) {
        this.tipT = false
        return true
      }
      if (!this.ano) {
        this.an = false
        return true
      }
      if (this.image) {
        if ((this.image.size / 1048576) > 2) {
          this.mensaje = 'Imagen no debe pesar mayor a 2 MB!'
          this.tipoM = 'error filled'
          this.titulo = 'Tamaño de imagen'
          this.addNotification()
          return true
        }
      }
      e.preventDefault()
      const body = {
        placa: this.placa,
        id_marca: this.id_marca,
        modelo: this.modelo,
        tipo: this.tipov,
        motor: this.motor,
        transmision: this.transmision,
        ejes: this.ejes,
        cauchos: this.cauchos,
        sistema_electrico: this.sistema_electrico,
        bateria: this.bateria,
        suspension_del: this.suspension_del,
        suspension_tra: this.suspension_tra,
        presion_cauchos: this.cauchos,
        aceite_motor: this.aceite_motor,
        aceite_caja: this.aceite_caja,
        aceite_diferencial: this.aceite_diferencial,
        dir_foto: this.dir_foto,
        id_tipo_carga: this.id_tipo_carga,
        color: this.color,
        responsable: this.responsable,
        tipo_transporte: this.tipo_transporte,
        ano: this.ano,
        id_empresa: this.id_empresa
      }
      axios.put(this.dirapi + '/updatecar/' + this.placa, body).then(response => {
        console.log('response', response)
        if (response.data.message === 'Exito!') {
          this.$store.commit('cargar')
          this.mensaje = 'Vehiculo actualizado con exito!'
          this.tipoM = 'success filled'
          this.titulo = 'Guardar'
          this.addNotification()
          this.show = false
        // localStorage.getItem('idUser')
        }
        if (response.data.message === 'Placa existe!') {
          this.mensaje = 'Vehiculo ya se encuentra registrado'
          this.tipoM = 'error filled'
          this.titulo = 'Guardar'
          this.addNotification()
        }
      }).catch(error => {
        console.log('error', error)
      })
      console.log('subir')
      const formData = new FormData()
      formData.append('file', this.file2)

      try {
        await axios.post(this.dirapi + '/upload/' + this.placa, formData)
        this.file2 = null
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {
    ...mapState(['dirapi', 'dirphoto'])
  },
  mounted () {
    axios.get(this.dirapi + '/marcas').then(response => {
      const marcas = response.data.map(item => {
        return { text: item.marca, value: item.id }
      })
      this.marcas = [...marcas]
    }).catch(error => {
      console.log('error', error)
    })
    axios.get(this.dirapi + '/tipos_carga').then(response => {
      const tiposc = response.data.map(item => {
        return { text: item.carga, value: item.id }
      })
      this.tipos = [...tiposc]
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

</style>

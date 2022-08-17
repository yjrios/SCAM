<template>
<div>
   <b-card :title="'Nuevo Vehiculo'">
              <b-form @submit.prevent="guardar" id="formu">
                 <b-row>
                  <b-colxx lg="3" md="12" >
                    <b-form-group :label="'Piloto o Responsable'" :description="'Nombre del chofer'">
                    <b-form-input type="text" :state="resp" v-model="responsable" :placeholder="'Pablo Puerta'" />
                    </b-form-group>
                  </b-colxx>
                   <b-colxx lg="4" md="12">
                    <b-form-group :label="'Clasificacion del vehiculo'">
                      <b-form-select
                        class="form-select"
                        :options="tipos"
                        v-model="id_tipo_carga"
                        :state="cla"
                      ></b-form-select>
                    </b-form-group>
                  </b-colxx>
                  <b-colxx lg="3" md="12" >
                    <b-form-group :label="'Tipo de Transporte '">
                    <b-form-input type="text" v-model="tipo_transporte" :state="tipT" :placeholder="'PERSONAL'" />
                    </b-form-group>
                  </b-colxx>
                 </b-row>
                 <b-row>
                  <b-colxx lg="2" md="12" >
                    <b-form-group :label="'Placa'">
                    <b-form-input type="text" v-model="placa" :state="pla" :placeholder="'ABCDEF'" />
                    </b-form-group>
                  </b-colxx>
                   <b-colxx lg="3" md="12">
                    <b-form-group :label="'Marca'">
                      <b-form-select
                        class="form-select"
                        :options="marcas"
                        v-model="id_marca"
                        :state="mar"
                      ></b-form-select>
                    </b-form-group>
                  </b-colxx>
                  <b-colxx lg="3" md="12">
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
                    <b-form-input type="text" v-model="tipo" :state="tip" :placeholder="'PICK UP'" />
                    </b-form-group>
                  </b-colxx>
                   <b-colxx lg="2" md="12">
                    <b-form-group :label="'Color'">
                    <b-form-input type="text" v-model="color" :state="col" :placeholder="'BLANCO'"/>
                    </b-form-group>
                  </b-colxx>
                  <b-colxx lg="4" md="12">
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
                 </b-row>
                 <b-row>
                  <b-colxx lg="2" md="12">
                    <b-form-group :label="'Bateria'">
                    <b-form-input type="text" v-model="bateria" :state="bat" :placeholder="'GRUPO 24'"/>
                    </b-form-group>
                  </b-colxx>
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
                  <b-button type="submit" variant="primary" class="mt-4" @click="guardar()" @keyup.enter="guardar">Guardar</b-button>
              </b-form>
   </b-card>
</div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
import { mapMutations, mapState } from 'vuex'

export default {
  data: function () {
    return {
      placa: null,
      id_marca: null,
      modelo: null,
      tipo: null,
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
      id_status: 1, // hasta aqui variables formulario
      mensaje: '',
      titulo: '',
      tipoM: '',
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
    guardar (e) {
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
      if (!this.tipo) {
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
      e.preventDefault()
      const body = {
        placa: this.placa,
        id_marca: this.id_marca,
        modelo: this.modelo,
        tipo: this.tipo,
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
        id_status: 1
      }
      axios.post(this.dirapi + '/add', body).then(response => {
        console.log('response', response)
        if (response.data.message === 'Exito!') {
          this.name = '' // limpiar
          this.$store.commit('cargar')
          this.mensaje = 'Vehiculo registrado con exito!'
          this.tipoM = 'success filled'
          this.titulo = 'Guardar'
          this.addNotification()
          this.placa = null
          this.id_marca = null
          this.modelo = null
          this.tipo = null
          this.motor = null
          this.transmision = null
          this.ejes = null
          this.cauchos = null
          this.sistema_electrico = null
          this.bateria = null
          this.suspension_del = null
          this.suspension_tra = null
          this.presion_cauchos = null
          this.aceite_motor = null
          this.aceite_caja = null
          this.aceite_diferencial = null
          this.id_tipo_carga = null
          this.color = null
          this.responsable = null
          this.tipo_transporte = null
          this.ano = null
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
    },
    addNotification (
      type = this.tipoM,
      title = this.titulo,
      message = this.mensaje
    ) {
      this.$notify(type, title, message, { duration: 3000, permanent: false })
    },
    ...mapMutations(['cargar'])
  },
  mounted () {
    axios.get(this.dirapi + '/tipos_carga').then(response => {
      console.log('response', response)
      const tipos = response.data.map(item => {
        return { value: item.id, text: item.carga }
      })
      this.tipos = [{ value: null, text: 'SELECCIONE' }, ...tipos]
    }).catch(error => {
      console.log('error', error)
    })
    axios.get(this.dirapi + '/marcas').then(response => {
      console.log('response', response)
      const marcas = response.data.map(item => {
        return { text: item.marca, value: item.id }
      })
      this.marcas = [{ text: 'SELECCIONE', value: null }, ...marcas]
    }).catch(error => {
      console.log('error', error)
    })
  },
  computed: {
    ...mapState(['dirapi'])
  }
}
</script>

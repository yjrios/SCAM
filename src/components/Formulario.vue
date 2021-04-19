<template>
<div>
   <b-card :title="'Nuevo Vehiculo'">
              <b-form @submit.prevent="onBasicSubmit">
                 <b-row>
                  <b-colxx lg="3" md="12" >
                    <b-form-group :label="'Piloto o Responsable'" :description="'Nombre del chofer'">
                    <b-form-input type="text" v-model="responsable" :placeholder="'Pablo Puerta'" />
                    </b-form-group>
                  </b-colxx>
                   <b-colxx lg="4" md="12">
                    <b-form-group :label="'Clsificacion del vehiculo'">
                      <b-form-select
                        class="form-select"
                        :options="tipos"
                        v-model="id_tipo_carga"
                      ></b-form-select>
                    </b-form-group>
                  </b-colxx>
                  <b-colxx lg="3" md="12" >
                    <b-form-group :label="'Tipo de Transporte '">
                    <b-form-input type="text" v-model="tipo_transporte" :placeholder="'PERSONAL'" />
                    </b-form-group>
                  </b-colxx>
                 </b-row>
                 <b-row>
                  <b-colxx lg="2" md="12" >
                    <b-form-group :label="'Placa'">
                    <b-form-input type="text" v-model="placa" :placeholder="'ABCDEF'" />
                    </b-form-group>
                  </b-colxx>
                   <b-colxx lg="3" md="12">
                    <b-form-group :label="'Marca'">
                      <b-form-select
                        class="form-select"
                        :options="marcas"
                        v-model="id_marca"
                      ></b-form-select>
                    </b-form-group>
                  </b-colxx>
                  <b-colxx lg="3" md="12">
                    <b-form-group :label="'Modelo'">
                    <b-form-input type="Text" v-model="modelo" :placeholder="'CHEYENNE 4X2'"/>
                    </b-form-group>
                  </b-colxx>
                  <b-colxx lg="2" md="12">
                    <b-form-group :label="'Ano'">
                    <b-form-input type="Text" v-model="ano" :placeholder="'1992'"/>
                    </b-form-group>
                  </b-colxx>
                 </b-row>
                 <b-row>
                  <b-colxx lg="3" md="12" >
                    <b-form-group :label="'Tipo'" >
                    <b-form-input type="text" v-model="tipo" :placeholder="'PICK UP'" />
                    </b-form-group>
                  </b-colxx>
                   <b-colxx lg="2" md="12">
                    <b-form-group :label="'Color'">
                    <b-form-input type="Text" v-model="color" :placeholder="'BLANCO'"/>
                    </b-form-group>
                  </b-colxx>
                  <b-colxx lg="4" md="12">
                    <b-form-group :label="'Motor'">
                    <b-form-input type="Text" v-model="motor" :placeholder="'VORTEC 5.3L 325'"/>
                    </b-form-group>
                  </b-colxx>
                  <b-colxx lg="1" md="12">
                    <b-form-group :label="'Ejes'">
                    <b-form-input type="Text" v-model="ejes" :placeholder="'2'"/>
                    </b-form-group>
                  </b-colxx>
                 </b-row>
                 <b-row>
                  <b-colxx lg="3" md="12" >
                    <b-form-group :label="'Transmision'" >
                    <b-form-input type="text" v-model="transmision" :placeholder="'AUTOMATICA 4L60E'" />
                    </b-form-group>
                  </b-colxx>
                   <b-colxx lg="4" md="12">
                    <b-form-group :label="'Cauchos'">
                    <b-form-input type="Text" v-model="cauchos" :placeholder="'265/70R17 CARRETERA'"/>
                    </b-form-group>
                  </b-colxx>
                  <b-colxx lg="2" md="12">
                    <b-form-group :label="'Sistema Electrico'">
                    <b-form-input type="Text" v-model="sistema_electrico" :placeholder="'12V'"/>
                    </b-form-group>
                  </b-colxx>
                 </b-row>
                 <b-row>
                  <b-colxx lg="2" md="12">
                    <b-form-group :label="'Bateria'">
                    <b-form-input type="Text" v-model="bateria" :placeholder="'GRUPO 24'"/>
                    </b-form-group>
                  </b-colxx>
                  <b-colxx lg="5" md="12" >
                    <b-form-group :label="'Suspension Delantera'" >
                    <b-form-input type="text" v-model="suspension_del" :placeholder="'INDEPENDIENTE ESPIRAL Y MESETA'" />
                    </b-form-group>
                  </b-colxx>
                   <b-colxx lg="5" md="12">
                    <b-form-group :label="'Suspension Trasera'">
                    <b-form-input type="Text" v-model="suspension_tra" :placeholder="'BALLESTAS Y AMORTIGUADORES'"/>
                    </b-form-group>
                  </b-colxx>
                 </b-row>
                 <b-row>
                  <b-colxx lg="2" md="12">
                    <b-form-group :label="'Presion de Cauchos'">
                    <b-form-input type="Text" v-model="presion_cauchos" :placeholder="'35 PSI'"/>
                    </b-form-group>
                  </b-colxx>
                  <b-colxx lg="4" md="12" >
                    <b-form-group :label="'Aceite de Motor'" >
                    <b-form-input type="text" v-model="aceite_motor" :placeholder="'ACEITE PARA MOTOR GASOLINA SAE 15W40'" />
                    </b-form-group>
                  </b-colxx>
                  <b-colxx lg="6" md="12">
                    <b-form-group :label="'Aceite de Caja'">
                    <b-form-input type="Text" v-model="aceite_caja" :placeholder="'ACEITE PARA TRANSMISIONES AUTOMATICAS DEXR 3'"/>
                    </b-form-group>
                  </b-colxx>
                 </b-row>
                 <b-row>
                  <b-colxx lg="6" md="12" >
                    <b-form-group :label="'Aceite Diferencial'" >
                    <b-form-input type="text" v-model="aceite_diferencial" :placeholder="'ACEITE PARA TRANSMISIONES SAE 80W90 API GL-5'" />
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
import { mapMutations } from 'vuex'

export default {
  data: function () {
    return {
      placa: '',
      id_marca: '',
      modelo: '',
      tipo: '',
      motor: '',
      transmision: '',
      ejes: '',
      cauchos: '',
      sistema_electrico: '',
      bateria: '',
      suspension_del: '',
      suspension_tra: '',
      presion_cauchos: '',
      aceite_motor: '',
      aceite_caja: '',
      aceite_diferencial: '',
      dir_foto: '',
      id_tipo_carga: '',
      color: '',
      responsable: '',
      tipo_transporte: '',
      ano: '',
      id_status: 1, // hasta aqui variables formulario
      mensaje: '',
      titulo: '',
      tipoM: '',
      marcas: [],
      tipos: []
    }
  },
  methods: {
    guardar () {
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
      axios.post('http://localhost:3050/add', body).then(response => {
        console.log('response', response)
        this.name = '' // limpiar
        this.$store.commit('cargar')
        this.mensaje = 'Vehiculo registrado con exito!'
        this.tipoM = 'success filled'
        this.titulo = 'Guardar'
        this.addNotification()
        // localStorage.getItem('idUser')
      }).catch(error => {
        console.log('error', error)
        this.mensaje = 'Vehiculo ya se encuentra registrado'
        this.tipoM = 'error filled'
        this.titulo = 'Guardar'
        this.addNotification()
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
    axios.get('http://localhost:3050/tipos_carga').then(response => {
      console.log('response', response)
      const tipos = response.data.map(item => {
        return { text: item.carga, value: item.id }
      })
      this.tipos = [{ text: 'SELECCIONE', value: null }, ...tipos]
    }).catch(error => {
      console.log('error', error)
    })
    axios.get('http://localhost:3050/marcas').then(response => {
      console.log('response', response)
      const marcas = response.data.map(item => {
        return { text: item.marca, value: item.id }
      })
      this.marcas = [{ text: 'SELECCIONE', value: null }, ...marcas]
    }).catch(error => {
      console.log('error', error)
    })
  }
}
</script>

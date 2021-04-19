<template>
  <div>
      <b-colxx xxs="12">
        <b-tabs nav-class="separator-tabs ml-0 mb-5" content-class="tab-content" :no-fade="true">
          <b-tab :title="'LISTADO'">
           <Lista/>
          </b-tab>
          <b-tab :title="'CONSULTAR VEHICULO'">
          <b-row>
             <b-colxx xxs="12">
                   <Buscar/>
             </b-colxx>
          </b-row>
          </b-tab>
          <b-tab :title="'NUEVO VEHICULO'">
          <b-row>
             <b-colxx xxs="12">
              <Formulario/>
             </b-colxx>
          </b-row>
          </b-tab>
        </b-tabs>
      </b-colxx>
  </div>
</template>
<script>
import Formulario from '@/components/Formulario.vue'
import Lista from '@/components/Lista.vue'
import Buscar from '@/components/Buscar.vue'

export default {
  name: 'maestro',
  components: {
    Formulario,
    Lista,
    Buscar
  }
}
</script>

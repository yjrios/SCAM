<template>
  <div>
      <b-colxx xxs="12">
        <b-tabs nav-class="separator-tabs ml-0 mb-3" content-class="tab-content" :no-fade="true">
          <!--<b-tab :title="'CONSOLIDADO'">
            <Consolidado/>
          </b-tab> -->
          <b-tab :title="'LISTADO DE VEHICULOS'">
           <Lista/>
          </b-tab>
          <b-tab :title="'BUSCAR VEHICULO'">
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
          <b-tab :title="'EDITAR VEHICULOS'">
          <b-row>
             <b-colxx xxs="12">
              <EditarV/>
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
import EditarV from './EditarV.vue'
// import Consolidado from '@/components/Consolidado.vue'

export default {
  name: 'maestro',
  components: {
    Formulario,
    Lista,
    Buscar,
    EditarV
    // Consolidado
  }
}
</script>

<template>
  <div>
    <b-colxx xxs="12">
      <b-tabs nav-class="separator-tabs ml-0 mb-3" content-class="tab-content" :no-fade="true">
        <b-tab title="LISTADO DE VIAJES">
          <ListarAmc />
        </b-tab>
        <b-tab title="REGISTRAR VIAJE">
          <RegistrarAmc />
        </b-tab>
        <b-tab title="MODIFICAR VIAJE">
          <EditarAmc />
        </b-tab>
        <b-tab title="CANCELAR VIAJE">
          <CancelarAmc />
        </b-tab>
        <b-tab title="ANULAR VIAJE">
          <AnularAmc />
        </b-tab>
        <b-tab title="REGISTRAR CENTRO">
          <SedesAmc />
        </b-tab>
      </b-tabs>
    </b-colxx>
  </div>
</template>

<script>
import EditarAmc from '@/components/Amc/ModificarAmc.vue'
import RegistrarAmc from '@/components/Amc/AgendaMaestraCarga.vue'
import ListarAmc from '@/components/Amc/DisplayAmc.vue'
import AnularAmc from '@/components/Amc/AnularAmc.vue'
import SedesAmc from '@/components/Amc/SedesAmc.vue'
import CancelarAmc from '@/components/Amc/CancelarViaje.vue'

export default {
  name: 'PanelAgenda',
  components: {
    EditarAmc,
    RegistrarAmc,
    ListarAmc,
    AnularAmc,
    SedesAmc,
    CancelarAmc
  }
}
</script>

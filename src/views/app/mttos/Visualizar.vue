<template>
    <div>
    <b-row>
      <b-colxx xxs="12">
          <h3>Inicio | Mantenimientos | Visualizar Mttos </h3>
        <div class="separator mb-5"></div>
      </b-colxx>
    </b-row>
    <b-row>
      <b-colxx xxs="12">
          <Visualizar/>
      </b-colxx>
    </b-row>
  </div>
</template>

<script>
import Visualizar from '@/components/VisualizarM.vue'

export default {
  name: 'listadommto',
  components: {
    Visualizar
  }
}
</script>

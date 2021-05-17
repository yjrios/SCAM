<template>
    <div>
    <b-row>
      <b-colxx xxs="12">
          <h3>Inicio | Mantenimientos | Editar Mtto </h3>
        <div class="separator mb-5"></div>
      </b-colxx>
    </b-row>
    <b-row>
      <b-colxx xxs="12">
          <Editar/>
      </b-colxx>
    </b-row>
  </div>
</template>

<script>
import Editar from '@/components/EditarM.vue'

export default {
  name: 'listadommto',
  components: {
    Editar
  }
}
</script>

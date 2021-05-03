<template>
    <div>
    <b-row>
      <b-colxx xxs="12">
          <h3>Inicio | Mantenimientos | Listado de Mttos </h3>
        <div class="separator mb-5"></div>
      </b-colxx>
    </b-row>
    <b-row>
      <b-colxx xxs="12" >
          <Listado/>
      </b-colxx>
    </b-row>
  </div>
</template>

<script>
import Listado from '@/components/ListaM.vue'

export default {
  name: 'listadommto',
  components: {
    Listado
  }
}
</script>

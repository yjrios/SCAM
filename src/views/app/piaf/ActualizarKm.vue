<template>
  <div>
    <b-row>
      <b-colxx xxs="12">
        <h2 class="mb-1 text-black">Actualizar Kilometraje <span class="h6"> Inicio | Control & Admin | <span class="card-text text-muted text-small mb-0 font-weight-light">Actualizar KM</span> </span></h2>
        <div class="separator mb-5"></div>
      </b-colxx>
    </b-row>
    <b-row>
      <b-colxx xxs="12">
        <!---<b-card :title="'Registro de nuevo Kilometraje'">-->
          <ActualizarK/>
       <!--- </b-card>-->
      </b-colxx>
    </b-row>
  </div>
</template>

<script>
// @ is an alias to /src
import ActualizarK from '@/components/ActualizarK.vue'
/* import axios from 'axios' */

export default {
  name: 'card',
  components: {
    ActualizarK
  }
}
</script>

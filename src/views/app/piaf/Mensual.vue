<template>
  <div>
    <b-row>
      <b-colxx xxs="12">
          <h2 class="mb-4 text-black">Status de Vehiculos <span class="h6"> Inicio | Control & Admin | <span class="card-text text-muted text-small mb-0 font-weight-light">Historico de Vehiculo</span> </span></h2>
        <div class="separator mb-5"></div>
      </b-colxx>
    </b-row>
    <b-row>
      <b-colxx xxs="12">
        <!---<b-card :title="'Registro de nuevo Kilometraje'">-->
          <StatusMe/>
       <!--- </b-card>-->
      </b-colxx>
    </b-row>
  </div>
</template>

<script>
// @ is an alias to /src
import StatusMe from '@/components/StatusMe.vue'
/* import axios from 'axios' */

export default {
  name: 'card',
  components: {
    StatusMe
  }
}
</script>

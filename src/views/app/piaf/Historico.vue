<template>
  <div>
    <b-row>
      <b-colxx xxs="12">
          <h2 class="mb-4 text-black">Status de Vehiculos <span class="h6"> Inicio | Control | <span class="card-text text-muted text-small mb-0 font-weight-light">Historico de Vehiculo</span> </span></h2>
        <div class="separator mb-5"></div>
      </b-colxx>
    </b-row>
    <b-row>
      <b-colxx xxs="12">
        <!---<b-card :title="'Registro de nuevo Kilometraje'">-->
          <Historico/>
       <!--- </b-card>-->
      </b-colxx>
    </b-row>
  </div>
</template>

<script>
// @ is an alias to /src
import Historico from '@/components/HistoricoVe.vue'
/* import axios from 'axios' */

export default {
  name: 'card',
  components: {
    Historico
  }
}
</script>

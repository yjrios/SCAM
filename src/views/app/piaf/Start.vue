<template>
  <div>
    <b-row>
      <b-colxx xxs="12">
          <h2 class="mb-1 text-black">General <span class="h6"> Inicio | Control & Admin | <span class="card-text text-muted text-small mb-0 font-weight-light">General</span> </span></h2>
        <div class="separator mb-5"></div>
      </b-colxx>
    </b-row>
    <b-row>
      <b-colxx xxs="12">
        <!---<b-card :title="'Registro de nuevo Kilometraje'">-->
          <General/>
       <!--- </b-card>-->
      </b-colxx>
    </b-row>
  </div>
</template>

<script>
// @ is an alias to /src
import General from '@/components/General.vue'
/* import axios from 'axios' */

export default {
  name: 'card',
  components: {
    General
  }
}
</script>

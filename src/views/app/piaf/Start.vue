<template>
  <div>
    <b-row>
      <b-colxx xxs="12">
        <piaf-breadcrumb :heading="$t('menu.start')"/>
        <div class="separator mb-5"></div>
      </b-colxx>
    </b-row>
    <b-row>
      <b-colxx xxs="12">
        <b-card :title="'Registro de nuevo Kilometraje'"
            <ActualizarK/>     
        </b-card>
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

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
        <b-card :title="'Registro de nuevo Kilometraje'">
          <b-row>
            <b-colxx xxs="4">
              <Formulario2/>
            </b-colxx>
          </b-row>
        </b-card>
      </b-colxx>
    </b-row>
  </div>
</template>

<script>
// @ is an alias to /src
import Formulario2 from '@/components/Formulario2.vue'
/* import axios from 'axios' */

export default {
  name: 'card',
  components: {
    Formulario2
  }
}
</script>

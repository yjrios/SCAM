<template>
    <div>
    <b-row>
      <b-colxx xxs="12">
          <h3>Inicio | Mantenimientos | Nuevo Mtto </h3>
        <div class="separator mb-5"></div>
      </b-colxx>
    </b-row>
    <b-row >
      <b-colxx xxs="12" >
        <b-card class="mb-2 equis">
            <h4>Registro de Nuevo Mtto</h4>
        </b-card>
      </b-colxx>
    </b-row>
    <NuevoMtto/>

  </div>
</template>

<script>
import NuevoMtto from '@/components/FormNuevoMtto.vue'

export default {
  name: 'Vehiculo',
  components: {
    NuevoMtto
  }
}
</script>

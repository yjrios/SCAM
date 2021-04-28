<template>
    <div>
    <b-row>
      <b-colxx xxs="12">
          <h3>Inicio | Servicios | Nuevo de Servicio </h3>
        <div class="separator mb-5"></div>
      </b-colxx>
    </b-row>
    <b-row>
      <b-colxx xxs="12" >
        <b-card class="mb-2">
            <h4>Registro de Servicio Nuevo</h4>
        </b-card>
        <b-card>
            <NuevoMtto/>
        </b-card>
      </b-colxx>
    </b-row>
  </div>
</template>

<script>
import NuevoMtto from '@/components/Nuevo_Mtto.vue'

export default {
  name: 'Vehiculo',
  components: {
    NuevoMtto
  }
}
</script>


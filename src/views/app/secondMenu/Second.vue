<template>
<div>
  <b-row>
    <b-colxx xxs="12">
      <piaf-breadcrumb :heading="$t('menu.second')" />
      <!--<div class="separator mb-5"></div>--><br><br>
    </b-colxx>
  </b-row>
  <b-row>
    <b-colxx xxs="12">
      <Maestro/>
    </b-colxx>
  </b-row>
</div>

</template>

<script>
import Maestro from '@/components/Maestro.vue'

export default {
  name: 'Vehiculo',
  components: {
    Maestro
  }
}
</script>

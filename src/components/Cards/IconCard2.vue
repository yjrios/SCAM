<template>
  <div class="icon-row-item">
    <b-card class="mb-4 text-center">
      <i :class="icon"/>
      <p class="card-text font-weight-semibold mb-0">{{ title }}</p>
      <p class="lead text-center">{{ value }}</p>
      <b-collapse :id="nombre" class="mb-0">
          <div class="separator mt-4"></div>
                                      <p class="mt-4 estilocarta">
                                        CARGA LIGERA&nbsp;&nbsp;&nbsp;&nbsp;{{ligera}}
                                      </p>
                                      <p class=" estilocarta">
                                        CARGA MEDIANA {{mediana}}
                                      </p>
                                      <p class="estilocarta mb-0">
                                        CARGA PESADA&nbsp;&nbsp; {{pesada}}
                                      </p>
        </b-collapse>
    </b-card>
  </div>
</template>
<script>
export default {
  props: {
    title: { type: String, default: 'icon-card-title' },
    icon: { type: String, default: 'iconsminds-clock' },
    value: { type: Number, default: 0 },
    nombre: { type: String, default: '' },
    ligera: { type: Number, default: 0 },
    mediana: { type: Number, default: 0 },
    pesada: { type: Number, default: 0 }
  }
}
</script>

<style scoped>
        .estilocarta {
      height: 8px;
      line-height: 18px;
      color: rgb(155, 155, 155)
    }
</style>

<template>
  <div class="h-100">
    <router-view/>
    <ColorSwitcher/>
  </div>
</template>
<script>
import ColorSwitcher from '@/components/Common/ColorSwitcher'
import { getDirection } from '@/utils'
import { mapMutations } from 'vuex'

export default {
  components: {
    ColorSwitcher
  },
  beforeMount () {
    const direction = getDirection()
    if (direction.isRtl) {
      document.body.classList.add('rtl')
      document.dir = 'rtl'
      document.body.classList.remove('ltr')
    } else {
      document.body.classList.add('ltr')
      document.dir = 'ltr'
      document.body.classList.remove('rtl')
    }
  },
  created () {
    this.cargar()
  },
  methods: {
    ...mapMutations(['cargar'])
  }
}
</script>

<style>
@import '../node_modules/@syncfusion/ej2-base/styles/material.css';
@import '../node_modules/@syncfusion/ej2-buttons/styles/material.css';
@import '../node_modules/@syncfusion/ej2-calendars/styles/material.css';
@import '../node_modules/@syncfusion/ej2-dropdowns/styles/material.css';
@import '../node_modules/@syncfusion/ej2-inputs/styles/material.css';
@import '../node_modules/@syncfusion/ej2-navigations/styles/material.css';
@import '../node_modules/@syncfusion/ej2-popups/styles/material.css';
@import '../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css';
@import "../node_modules/@syncfusion/ej2-vue-grids/styles/material.css";
.e-grid .e-gridpager .e-currentitem{
  background-color:#00325c;
}
.e-grid .e-filterbarcell .e-input-group.e-input-focus::after,
.e-grid .e-filterbarcell .e-input-group.e-input-focus::before{
      background-color: #00325c;
}
  </style>

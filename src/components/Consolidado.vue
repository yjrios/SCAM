<template>
<div>
        <b-row>
          <b-colxx lg="4" xl="12" class="mb-4">
            <gradient-with-radial-progress-card
              icon="iconsminds-clock"
              :title="`5 files`"
              :detail="'PENDIENTES'"
              :percent="5*100/12"
              progressText="5/12"
            />
          </b-colxx>
          <b-colxx lg="4" xl="12" class="mb-4">
            <gradient-with-radial-progress-card
              icon="iconsminds-male"
              :title="`4 ${$t('dashboards.orders')}`"
              :detail="$t('dashboards.on-approval-process')"
              :percent="4*100/6"
              progressText="4/6"
            />
          </b-colxx>
          <b-colxx lg="4" xl="12" class="mb-4">
            <gradient-with-radial-progress-card
              icon="iconsminds-bell"
              :title="`8 ${$t('dashboards.alerts')}`"
              :detail="$t('dashboards.waiting-for-notice')"
              :percent="8*100/10"
              progressText="8/10"
            />
          </b-colxx>
        </b-row>
</div>
</template>

<script>

export default {
  name: 'conso'
}
</script>

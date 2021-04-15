<template>
<div>
              <b-form @submit.prevent="onBasicSubmit">
                  <b-form-group :label="'Placa'" :description="'Aqui ingresamos Placa'">
                  <b-form-input type="text" v-model="name" :placeholder="'ABCDEF'" />
                  </b-form-group>
                  <b-form-group :label="'Kilometraje'">
                  <b-form-input type="Text" v-model="city" :placeholder="'343.000 KM'"/>
                  </b-form-group>
                  <b-button type="submit" variant="primary" class="mt-4" @click="guardar" @keyup.enter="guardar">Guardar</b-button>
              </b-form>
</div>
</template>

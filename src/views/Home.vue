<template>
  <v-container fill-height class="pa-0">
    <v-layout text-xs-center wrap>
      <v-flex xs12>
        <v-img :src="require('./../assets/home.jpg')" height="100%" width="100%" contain></v-img>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
export default {
  name: 'home'
}
</script>

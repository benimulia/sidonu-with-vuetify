<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/ukdw.png')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Welcome to sidonu
        </h1>

        <p class="subheading font-weight-regular">
          Ini adalah Sistem Informasi Donasi UKDW
          <br>Semoga Anda mendapatkan pengalaman menarik bersama aplikasi ini!
        </p>
      </v-col>

      
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'HelloWorld',

    data: () => ({
    }),
  }
</script>
<style>
</style>
<template>
  <v-app style="background-image: linear-gradient(to top, #d5d4d0 0%, #d5d4d0 1%, #eeeeec 31%, #efeeec 75%, #e9e9e7 100%);">
    <component :is="layout">
      <router-view :layout.sync="layout"/>
    </component>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {
    
  },

  data: () => ({
    layout:`div`,
  }),
};
</script>


<template>
      <v-container fluid>
        <h1>INI JENIS PESERTA</h1>
      </v-container>
</template>

<script>
import AdminDashLayout from '../../layouts/AdminDashLayout'

export default {
  name: 'Peserta',

  components: {
  },
  created(){
      this.$emit(`update:layout`, AdminDashLayout)
  },

  data: () => ({
    //
  }),
};
</script>
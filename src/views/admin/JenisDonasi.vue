<template>
      <v-container fluid>
        <h1>INI JENIS DONASI</h1>
      </v-container>
</template>

<script>
import AdminDashLayout from '../../layouts/AdminDashLayout'

export default {
  name: 'Donasi',

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
<template>
      <v-container fluid>
        <h1>INI KEGIATAN</h1>
      </v-container>
</template>

<script>
import AdminDashLayout from '../../layouts/AdminDashLayout'

export default {
  name: 'Kegiatan',

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
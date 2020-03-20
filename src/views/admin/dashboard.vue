<template>
  <section class="container">
        <h3 align="center">Chart</h3> <br> <br>
        <line-chart></line-chart>
  </section>
</template>

<script>
import LineChart from '../../components/LineChart'
import AdminDashLayout from '../../layouts/AdminDashLayout'

export default {
  name: 'Dashboard',

  components: {
    LineChart
  },
  created(){
      this.$emit(`update:layout`, AdminDashLayout)
  },

  data: () => ({
    //
  }),
};
</script>
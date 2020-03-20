<template>
    <HelloWorld />
</template>

<script>
import HelloWorld from '../components/HelloWorld'
import DashboardLayout from '../layouts/DashboardLayout'

export default {
  name: 'Home',

  components: {
    HelloWorld,
  },
  created(){
      this.$emit(`update:layout`, DashboardLayout)
  },

  data: () => ({
    //
  }),
};
</script>
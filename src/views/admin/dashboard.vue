<template>
  <div>
    
  </div>
</template>

<script>
import AdminDashLayout from '../../layouts/AdminDashLayout'

export default {
  name: 'Dashboard',

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
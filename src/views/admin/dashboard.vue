<template>
      <v-container fluid>
        <v-row dense> 
          <v-col
            v-for="card in cards"
            :key="card.title"
            :cols="card.flex"
          >
            <v-card>
              <v-img
                :src="card.src"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="200px"
              >
                <v-card-title v-text="card.title"></v-card-title>
              </v-img>
            </v-card>
          </v-col>
        </v-row>        
          <br><br>
        <v-row>          
          <v-col cols="12">
            <LineChart></LineChart>
          </v-col>
        </v-row>
      </v-container>
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
    cards: [
      { title: 'Kegiatan', src: 'https://www.nicepng.com/png/detail/831-8319932_event-management-event-icon-purple.png', flex: 4 },
      { title: 'Peserta', src: 'https://lh4.googleusercontent.com/proxy/sSSnpHpkkBLqI0GJ6D3D3tzY_Nxb6z4vvPfrf3NdOiXZ303wHCf917TGx2EQXQeXq9bzzQYAaXGzI5DYf2QeaXUo_Y4fyZSH_e-TcbPoGkXz4SRa8Lr5S83HocdvkuGV4k9CHTqC92Qar3YAp9aXoJqu', flex: 4 },
      { title: 'Laporan', src: 'https://cdn0.iconfinder.com/data/icons/longshadowset/504/report.png', flex: 4 },
    ],
  }),
};
</script>
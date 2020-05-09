<template>
    <v-container fluid>
        <h4>PILIH MENU: </h4>
        <v-row dense> 
            <v-col
            v-for="card in cards"
            :key="card.title"
            :cols="card.flex"
            >
                <v-card>
                    <router-link :to="card.link" style="text-decoration: none">
                        <v-img
                        :src="card.src"
                        class="white--text align-end"
                        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                        height="200px"
                        >
                            <v-card-title v-text="card.title"></v-card-title>
                        </v-img>
                    </router-link>
                </v-card>
            </v-col>
        </v-row> 
    </v-container>
</template>

<script>
import AdminDashLayout from '../../layouts/AdminDashLayout'


export default {
  name: 'Report',


  components: {

  },

  created(){
      this.$emit(`update:layout`, AdminDashLayout)
  },

  data: () => ({
    cards: [
      { title: 'Laporan Semua Kegiatan', src: 'https://www.vippng.com/png/detail/190-1909061_vector-check-list-clipart-png-download-report-buttons.png', flex: 6, link:'../admin/reportallkegiatan' },
      { title: 'Laporan Per Kegiatan', src: 'https://www.vippng.com/png/detail/190-1909061_vector-check-list-clipart-png-download-report-buttons.png', flex: 6, link:'../admin/reportperkegiatan' },
    ],
  }),
};
</script>
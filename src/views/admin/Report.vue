<template>
    <div class="col-12">
    <v-row>          
        <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>
    </v-row>
    <br><br>
    <h4>PILIH MENU LAPORAN: </h4>
    <v-row> 
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
    </div>
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
      { title: 'Laporan Semua Kegiatan', src: require('../../assets/reportallkegiatan.png'), flex: 6, link:'../admin/reportallkegiatan' },
      { title: 'Laporan Per Kegiatan', src: require('../../assets/reportperkegiatan.png'), flex: 6, link:'../admin/reportperkegiatan' },
      { title: 'Laporan Data Peserta', src: require('../../assets/multiple-people.png'), flex: 6, link:'../admin/reportpeserta' },
    ],
      breadcrumbs:[
        {
        text: 'Dashboard',
        disabled: false,
        href: 'dashboard',
        },
        {
          text: 'Report',
          disabled: true,
          href: '#',
        }
      ]
  }),
};
</script>
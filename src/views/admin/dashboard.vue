<template>
      <v-container fluid>
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
          <br><br>
        <div ref="content">
        <v-row>          
          <v-col cols="12">
            <BarChart 
              :chart-id="'chart'"
              :chartData="arrDonasi"
              label="Donasi"
              :options="chartOptions"
              v-if="arrDonasi.length > 0"
            ></BarChart>
          <br>
          <p v-if="arrDonasi.length > 0"><a @click="download">Klik Disini!</a> untuk mengunduh grafik</p> 
          </v-col>
        </v-row>        
        </div>
        
      </v-container>
</template>

<script>
import AdminDashLayout from '../../layouts/AdminDashLayout'
import jspdf from 'jspdf'
import moment from 'moment'
import axios from 'axios'
import BarChart from '../../components/BarChart'

export default {
  name: 'Dashboard',

  methods:{
    download(){
      const doc = new jspdf('l', 'mm', "a4"); //for landscape
      doc.setFontSize(9);
      doc.text("©" + new Date().getFullYear() + " sidonu - by Monica & Beni", 10, 10);
      doc.setFontSize(20);
      doc.setFont("helvetica");
      doc.text("Grafik Perolehan 10 Kegiatan Terakhir ", 90, 30); //at x,y at def.units 2cm

      let canvas = document.getElementById("chart")
      let chartURL = canvas.toDataURL()
      // const html = this.$refs.content.innerHTML
      //a4 page is 209mm, adds at 4cm top, 2cm left, for 15cm in size
      doc.addImage(chartURL,'PNG',50,50,200,100)
      doc.setFontSize(9);
      doc.text("Dicetak pada tanggal "+ this.tglharini, 190, 190);
      // doc.fromHTML(html,20,20,{
      //   width: 150
      // })
      doc.save("GrafikKegiatan.pdf")
    }
  },

  components: {
    BarChart
  },
  async created(){
      this.$emit(`update:layout`, AdminDashLayout);
      this.arrDonasi = [];
      const {data} = await axios.get("/donasiLaporanGrafik");
      console.log(data);
      data.donasis.forEach(d => {
        const name = d.nama_kegiatan;
        const { 
          jumlah_donasi
         } = d;
        this.arrDonasi.push({ name, total: jumlah_donasi });
      });
  },

  data: () => ({
    cards: [
      { title: 'Kegiatan', src: 'https://www.nicepng.com/png/detail/831-8319932_event-management-event-icon-purple.png', flex: 4, link:'../admin/kegiatan' },
      { title: 'Peserta', src: 'https://lh3.googleusercontent.com/proxy/RCCGroAx03OdztNbGpbGlqRqXobIfx9eiRpfJw8NHwc20HY073IkLr9sFI63W32F5dNXLtlc5YcPHaLWTMddrl5h6xRWKPdghLseNIMFWUih7-Q-X-3vZ4tURBEOvVdkT_41FNFEKQ7bKrXe-B1gzn6GPpZPX34', flex: 4, link:'../admin/peserta' },
      { title: 'Laporan', src: 'https://www.vippng.com/png/detail/190-1909061_vector-check-list-clipart-png-download-report-buttons.png', flex: 4, link:'../admin/report' },
    ],
    tglharini: moment().format('LLL'),
    arrDonasi:[],
    chartOptions:{
      scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: true
              }
            }],
            xAxes: [{
              gridLines: {
                display: false
              }
            }]
          },
          legend: {
            display: true
          },
          responsive: true,
          maintainAspectRatio: false
    }
  }),
};
</script>
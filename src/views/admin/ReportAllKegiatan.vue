<template>
    <div class="container-fluid" v-if="this.results.length>0">
    <v-row>          
        <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>
    </v-row>
      <div class="row">
        <div class="col-md-12">
          <v-btn class="info mb-6" @click="download"><v-icon class="mr-2">save_alt</v-icon>UNDUH LAPORAN</v-btn> <br>
          <center><h5 class="mb-4 center">Grafik Perolehan Donasi 10 Kegiatan Terakhir</h5></center>
            <BarChart 
              :chart-id="'chart'"
              :chartData="arrDonasi"
              label="Donasi"
              :options="chartOptions"
              v-if="arrDonasi.length > 0"
            ></BarChart>
        </div>
        <br><br>
      </div>
        <div class="row">
          <div class="col-md-12">            
            <center><h5>Tabel Perolehan Donasi Seluruh Kegiatan</h5></center>
              <div class="table-responsive">
                <!-- table -->
                <table class="table" id="table">
                  <thead class="thead-light">
                    <tr>
                    <th>ID</th>
                    <th>Nama Kegiatan</th>
                    <th>Tempat Kegiatan</th>
                    <th>Tanggal</th>
                    <th>Jumlah Donasi</th>
                    </tr>
                  </thead>
                  <tbody>
                  <tr v-for="item in results" :key="item.id_kegiatan">
                    <td>{{item.id_kegiatan}}</td>
                    <td>{{item.nama_kegiatan}}</td>
                    <td>{{item.tempat_kegiatan}}</td>
                    <td>{{item.tgl_kegiatan}}</td>
                    <td>{{item.jumlah_donasi}}</td>
                  </tr>
                  <tr>
                    <td colspan="4" style="text-align:center;">Total</td>
                    <td>{{this.total}}</td>
                  </tr>
                  </tbody>
                </table>
                <!-- .end table -->
              </div>
            </div>
          </div>          
          <div class="row">
            <div class="col-md-6">
              <b><p>Keterangan Jumlah Donasi:</p> </b>
              <div class="table-responsive">
                <!-- table -->
                <table class="table" id="tabledua">
                  <thead class="thead-light">
                    <tr>
                    <th>Jenis Donasi</th>
                    <th>Jumlah</th>
                    </tr>
                  </thead>
                  <tbody>
                  <tr v-for="jenis in jeniDonasis" :key="jenis.id_jenis_donasi">
                    <td>{{jenis.nama_jenis_donasi}}</td>
                    <td>{{jenis.total_jenis_donasi}}</td>
                  </tr>
                  <tr>
                    <td colspan="1" style="text-align:center;">Total</td>
                    <td>{{this.total}}</td>
                  </tr>
                  </tbody>
                </table>
                <!-- .end table -->
              </div>
            </div>
          </div>
        </div>
        <div v-else class="container-fluid">
          <center><img src="https://i.ya-webdesign.com/images/image-not-found-png-8.png" alt=""></center>
        </div>
</template>

<script>
import axios from 'axios';
import AdminDashLayout from '../../layouts/AdminDashLayout'
import jspdf from 'jspdf'
import 'jspdf-autotable'
import BarChart from '../../components/BarChart'
import moment from 'moment'

export default {
  name: 'ReportAllKegiatan',

    data () {
      return {
        results: [],
        jeniDonasis:[],
        total:'',
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
        },
        breadcrumbs:[
          {
          text: 'Dashboard',
          disabled: false,
          href: 'dashboard',
          },
          {
            text: 'Report',
            disabled: false,
            href: 'report',
          },
          {
            text: 'Report Semua Kegiatan',
            disabled: true,
            href: 'ReportAllKegiatan',
          },
        ]
      }
    },
    components:{
      BarChart
    },
    methods: {
      getItem() {
        axios.get("/donasiSemuaKegiatan")
        .then(
          response => {
            this.results = response.data.donasis;
            this.total = response.data.data
          },  
          )
        .catch(e => {
        this.errors.push(e)
        });
      },
      getJenisDonasi(){
        axios.get("/donasiLaporanJenisDonasiSemuaKegiatan")
        .then(
          response => {
            this.jeniDonasis = response.data.data;
            console.log(response.data)
          },  
          )
        .catch(e => {
          this.errors.push(e)
        });
      },
      download(){

        let doc = new jspdf('l', 'mm', "a4"); //for landscape
        doc.setFontSize(9);
        doc.text("©" + new Date().getFullYear() + " sidonu - by Monica & Beni", 10, 10);
        doc.setFontSize(20);
        doc.setFont("helvetica");
        doc.text("Grafik Perolehan 10 Kegiatan Terakhir ", 90, 30); //at x,y at def.units 2cm
        
        let canvas = document.getElementById("chart");
        let chartURL = canvas.toDataURL();
        doc.addImage(chartURL,'PNG',50,50,200,100)
        doc.addPage();
        doc.setFontSize(9);
        doc.text("©" + new Date().getFullYear() + " sidonu - by Monica & Beni", 10, 10);
        doc.setFontSize(20);
        doc.setFont("helvetica");
        doc.text("Tabel Perolehan Donasi ", 150, 20,'center'); //at x,y at def.units 2cm
        var res = doc.autoTableHtmlToJson(document.getElementById('table'));
        doc.autoTable(res.columns, res.data);
        var res2 = doc.autoTableHtmlToJson(document.getElementById('tabledua'));
        doc.autoTable(res2.columns, res2.data, {
            startY: doc.lastAutoTable.finalY + 20
        });
        
        // PAGE NUMBERING
        // Add Page number at bottom-right
        // Get the number of pages
        const pageCount = doc.internal.getNumberOfPages();

        // For each page, print the page number and the total pages
        for(var i = 1; i <= pageCount; i++) {
            // Go to page i
            doc.setPage(i);
            doc.setFontSize(9);
            //Print Page 1 of 4 for example
            doc.text("Page " + String(i) + " dari " + String(pageCount),250,180,'right');
            doc.text("Dicetak pada tanggal " + moment().format('LLL'), 250,190,'right')
        }

        doc.save('Perolehan Donasi per '+moment().format('ll')+'.pdf');
      },
    },
    mounted() {
      this.getItem();
      this.getJenisDonasi();
    },
    async created(){
      this.$emit(`update:layout`, AdminDashLayout);
      this.arrDonasi = [];
      const {data} = await axios.get("/donasiLaporanGrafik");
      //console.log(data);
      data.donasis.forEach(d => {
        const name = d.nama_kegiatan;
        const { 
          jumlah_donasi
        } = d;
        this.arrDonasi.push({ name, total: jumlah_donasi });
      });
    },
}
</script>
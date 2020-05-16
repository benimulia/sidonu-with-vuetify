<template>
    <div class="container-fluid" v-if="this.tableListHasil.length>0">
    <v-row>          
        <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>
    </v-row>
        <div class="row">
            <div class="col-md-12">                
                <v-btn class="info mb-6" @click="download"><v-icon class="mr-2">save_alt</v-icon>UNDUH LAPORAN</v-btn> <br>
                    <v-autocomplete
                        :items="kegiatans"
                        item-text="nama_kegiatan"
                        item-value="id_kegiatan"
                        label="Pilih Kegiatan"
                        solo
                        v-model="selected"
                        v-on:change="onChange"
                      ></v-autocomplete>
            </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <template v-if="kegiatans">
              <h4>Tabel Perolehan Donasi {{kegiatans[this.selected-1].nama_kegiatan}}</h4>
            </template>
            
              <div class="table-responsive">
                <!-- table -->
                <table class="table" id="table">
                  <thead class="thead-light">
                    <tr>
                    <th>ID</th>
                    <th>Nama Donatur</th>
                    <th>Jenis Donasi</th>
                    <th>Keterangan</th>
                    <th>Jumlah Donasi (Taksir)</th>
                    </tr>
                  </thead>
                  <tbody>
                  <tr v-for="item in tableListHasil" :key="item.id_donatur">
                    <td>{{item.id_donatur}}</td>
                    <td>{{item.nama_donatur}}</td>
                    <td>{{item.nama_jenis_donasi}}</td>
                    <td>{{item.keterangan}}</td>
                    <td>{{item.jumlah_donasi_donatur}}</td>
                  </tr>
                  <tr  v-for="item in total" :key="item.id_kegiatan">
                    <td colspan="4" style="text-align:center;">Total</td>
                    <td>{{item.jumlah_donasi}}</td>
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
                <table class="table" id="table">
                  <thead class="thead-light">
                    <tr>
                    <th>Jenis Donasi</th>
                    <th>Jumlah</th>
                    </tr>
                  </thead>
                  <tbody>
                  <tr v-for="jenis in jenisDonasis" :key="jenis.id_kegiatan">
                    <td>{{jenis.nama_jenis_donasi}}</td>
                    <td>{{jenis.total_jenis_donasi}}</td>
                  </tr>
                  <tr  v-for="item in total" :key="item.id_kegiatan">
                    <td colspan="1" style="text-align:center;">Total</td>
                    <td>{{item.jumlah_donasi}}</td>
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
import moment from 'moment'

export default {
  name: 'ReportPerKegiatan',

    data () {
      return {
        tableListHasil: [],
        jenisDonasis:[],
        kegiatans:[
          {
            nama_kegiatan:''
          }
        ],
        selected:1,
        total:[],
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
            text: 'Report Per Kegiatan',
            disabled: true,
            href: 'reportperkegiatan',
          },
        ]
      }
    },
    components:{
      
    },
    methods: {
      async onChange(){
        //console.log(this.selected);
        const { data } = await axios.get("/donasiLaporanPerKegiatan/" + this.selected);
        this.tableListHasil = data.donasis;
        this.total = data.data;
        this.jenisDonasis = data.donasi;
        //console.log(this.total)
      },

      download(){
        const doc = new jspdf('l', 'mm', "a4"); //for landscape
        doc.setFontSize(9);
        doc.text("©" + new Date().getFullYear() + " sidonu - by Monica & Beni", 10, 10);
        doc.setFontSize(20);
        doc.setFont("helvetica");
        doc.text("Tabel Perolehan Donasi " + this.kegiatans[this.selected-1].nama_kegiatan, 150, 20,'center'); //at x,y at def.units 2cm
        doc.autoTable({ 
          html: '#table',
          theme:'striped',
          startY: 30
        });

        // PAGE NUMBERING
        // Add Page number at bottom-right
        // Get the number of pages
        const pageCount = doc.internal.getNumberOfPages();

        // For each page, print the page number and the total pages
        for(var i = 1; i <= pageCount; i++) {
            // Go to page i
            doc.setPage(i);
            //Print Page 1 of 4 for example
            doc.setFontSize(9);
            doc.text("Page " + String(i) + " dari " + String(pageCount),250,180,'right');
            doc.text("Dicetak pada tanggal " + moment().format('LLL'), 250,190,'right')
        }

        doc.save('Perolehan Donasi Kegiatan '+this.kegiatans[this.selected-1].nama_kegiatan+'.pdf');
      },
    },
    async mounted() {
        try {
            const response = await axios.get("/donasiSemuaKegiatan");
            this.kegiatans = response.data.donasis;
            console.log(this.kegiatans);
            } catch (e) {
            console.log(e);
            console.log(e.response.data.error);
            alert(e + "\n" + e.response.data.error);
        }
    },
    async created(){
        this.$emit(`update:layout`, AdminDashLayout);
        const { data } = await axios.get("/donasiLaporanPerKegiatan/" + this.selected);
        this.tableListHasil = data.donasis;
        this.total = data.data;
        this.jenisDonasis = data.donasi;
        

    },
}
</script>
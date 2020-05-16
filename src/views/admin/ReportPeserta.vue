<template>
    <div class="container-fluid" v-if="this.results.length>0">
    <v-row>          
        <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>
    </v-row>
      <div class="row">
        <div class="col-md-12">
          <v-btn class="info mb-6" @click="download"><v-icon class="mr-2">save_alt</v-icon>UNDUH LAPORAN</v-btn> <br>
        </div>
        <br><br>
      </div>
        <div class="row">
          <div class="col-md-12">            
            <center><h5>Tabel Seluruh Peserta Sudah Terdaftar</h5></center> <br>
              <div class="table-responsive">
                <!-- table -->
                <table class="table" id="table">
                  <thead class="thead-light">
                    <tr>
                    <th>ID</th>
                    <th>Nama</th>
                    <th>Jenis Peserta</th>
                    <th>Jenis Kelamin</th>
                    <th>Alamat</th>
                    <th>Email</th>
                    <th>No HP</th>
                    </tr>
                  </thead>
                  <tbody>
                  <tr v-for="item in results" :key="item.id_donatur">
                    <td>{{item.id_donatur}}</td>
                    <td>{{item.nama_donatur}}</td>
                    <td>{{item.nama_jenis_donatur}}</td>
                    <td>{{item.jenis_kelamin}}</td>
                    <td>{{item.alamat_donatur}}</td>
                    <td>{{item.email_donatur}}</td>
                    <td>{{item.no_hp}}</td>
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
    name: 'ReportPeserta',

    data () {
        return {
        results: [],
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
            text: 'Report Peserta',
            disabled: true,
            href: 'ReportPeserta',
            },
        ]
        }
    },
    components:{
        
    },
    methods: {
        getItem() {
        axios.get("/donatur")
        .then(
            response => {
            this.results = response.data;
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
        doc.text("Tabel Seluruh Peserta Sudah Terdaftar ", 150, 20,'center'); //at x,y at def.units 2cm
        doc.autoTable({ 
            html: '#table',
            theme:'striped',
            startY: 30
        })
        
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

        doc.save('Daftar Seluruh Peserta per '+moment().format('ll')+'.pdf');
        },
    },
    mounted() {
        this.getItem()
    },
    created(){
        this.$emit(`update:layout`, AdminDashLayout);
    }
}
</script>
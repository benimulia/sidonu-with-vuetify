<template>
  <div class="col-12">
    <v-card>
    <v-card-title>
      List Seluruh Donasi
    </v-card-title>

    <v-data-table
    :headers="headers"
    :items="donasis"
    sort-by="id_donasi"
    class="elevation-1"
    :search="search"    
    sortBy="id_donasi"
    update: sort-desc
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="700px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2" v-on="on"><v-icon>mdi-plus</v-icon>New Item</v-btn>
            </template>
            <v-form ref="form" v-model="valid" lazy-validation>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="4" md="4">
                      <v-select
                        v-model="editedItem.id_jenis_donasi"
                        :items="jenisdonasis"
                        item-text="nama_jenis_donasi"
                        item-value="id_jenis_donasi"
                        :rules="[v => !!v || 'Jenis Donasi is required']"
                        label="Jenis Donasi"
                        required
                        prepend-icon="spa"
                      ></v-select>
                    </v-col>
                    <v-col cols="8">                      
                      <v-autocomplete
                        v-model="editedItem.id_donatur"
                        :items="donaturs"
                        item-text="nama_donatur"
                        item-value="id_donatur"
                        :rules="[v => !!v || 'Nama Donatur is required']"
                        label="Nama Donatur"
                        required
                        prepend-icon="person"
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">                      
                      <v-autocomplete
                        v-model="editedItem.id_kegiatan"
                        :items="kegiatans"
                        item-text="nama_kegiatan"
                        item-value="id_kegiatan"
                        :rules="[v => !!v || 'Nama Kegiatan is required']"
                        label="Nama Kegiatan"
                        required
                        prepend-icon="turned_in"
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="4">
                       <v-menu
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        :return-value.sync="editedItem.tgl_donasi"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model="editedItem.tgl_donasi"
                            label="Tanggal Donasi"
                            prepend-icon="event"
                            readonly
                            v-on="on"
                            hint="YYYY/MM/DD format"
                            persistent-hint
                          ></v-text-field>
                        </template>
                        <v-date-picker v-model="editedItem.tgl_donasi" no-title scrollable locale>
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                          <v-btn text color="primary" @click="$refs.menu.save(editedItem.tgl_donasi)">OK</v-btn>
                        </v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col cols="12" sm="6" md="4" v-if="editedItem.id_jenis_donasi < 3" >
                      <v-text-field 
                        type="number" 
                        v-model="editedItem.nominal" 
                        label="Jumlah Donasi (Asli)"
                        prepend-icon="local_atm"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4" v-if="editedItem.id_jenis_donasi == 2">
                      <v-text-field 
                        type="number" 
                        v-model="nilaiAkhir" 
                        label="Nilai Taksir Dollar" 
                        prepend-icon="local_atm"
                        disabled
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4" v-if="editedItem.id_jenis_donasi > 2">
                      <v-text-field 
                        type="number" 
                        v-model="editedItem.nilai_taksir" 
                        label="Nilai Taksir" 
                        prepend-icon="local_atm"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field 
                        type="text" 
                        v-model="editedItem.keterangan" 
                        label="Keterangan" 
                        prepend-icon="announcement"
                      >
                      </v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn rounded color="dark" class="mx-4 warning" text @click="close">Cancel</v-btn>
                <v-btn rounded color="dark" class="success" text @click="save" :disabled="!valid">Save</v-btn>
              </v-card-actions>
            </v-card>
            </v-form>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
          @click="editItem(item)"
          color="success"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          @click="deleteItem(item)"
          color="error"
        >
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        No data available <br>
      </template>
    </v-data-table>
    </v-card>
  </div>  
</template>

<script>
import AdminDashLayout from '../../layouts/AdminDashLayout'
import axios from 'axios'

  export default {
   name: 'Peserta',
   components: {
     //
  },
   data: () => ({
      dialog: false,
      valid: true,
      search: '',
      menu: false,
      headers: [
        {
          text: 'ID',
          align: 'start',
          sortable: true,
          value: 'id_donasi',
        },
        { text: 'Jenis Donasi', value: 'nama_jenis_donasi',sortable: false },
        { text: 'Nama Donatur', value: 'nama_donatur' , sortable: false},
        { text: 'Kegiatan', value: 'nama_kegiatan', sortable: false },
        { text: 'Tanggal Donasi', value: 'tgl_donasi' },
        { text: 'Nominal (Asli)', value: 'nominal',sortable: false },
        { text: 'Nilai Taksir (Rupiah)', value: 'nilai_taksir'},
        { text: 'Keterangan', value: 'keterangan' , sortable: false},
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      donasis:[],
      jenisdonasis:[],
      donaturs: [],
      kegiatans:[],
      editedIndex: -1,
      editedItem: {
        id_donasi: '',
        id_jenis_donasi:1,
        id_donatur: '',
        id_kegiatan: '',
        nominal: 0,
        nilai_taksir: 0,
        tgl_donasi: new Date().toISOString().substr(0, 10),
        keterangan:''
      },
      defaultItem: {
        id_donasi: '',
        id_jenis_donasi:1,
        id_donatur: '',
        id_kegiatan: '',
        nominal: 0,
        nilai_taksir: 0,
        tgl_donasi: new Date().toISOString().substr(0, 10),
        keterangan:''
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },

      nilaiAkhir(){
        var from = this.editedItem.id_jenis_donasi;
        var final;

        if(from==1){
          final = this.editedItem.nominal;
        }
        else if(from==2){
          final = this.editedItem.nominal * 15508.25;
        }
        else{
          final = 0;
        }
        return final;
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    methods: {
      fetchPesertas(){
          axios.get('/donasi', {timeout: 20000})
          .then(response=>{
            console.log(response.data);
            this.donasis= response.data.donasis;
          })
      },

      fetchJenisDonasi(){
          axios.get('/jenis_donasi')
          .then(response=>{
            this.jenisdonasis= response.data;
          })
      },

      fetchDonaturs(){
          axios.get('/donatur')
          .then(response=>{
            this.donaturs= response.data;
          })
      },

      fetchKegiatans(){
          axios.get('/kegiatan')
          .then(response=>{
            this.kegiatans= response.data;
          })
      },

      initialize(){
        this.fetchPesertas();
        this.fetchJenisDonasi();
        this.fetchDonaturs();
        this.fetchKegiatans();
      },

      editItem (item) {
        this.editedIndex = this.pesertas.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.pesertas.indexOf(item)
        if(confirm('Apakah yakin dihapus?') && this.pesertas.splice(index, 1)){
        
        console.log('deleted data');

        axios.delete('/donasi/'+ item.id)
          .then(response=>{
            console.log(response);
            this.$store.commit('SET_BERHASILHAPUS',true);
          })
        }
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if(this.editedItem.id_jenis_peserta !='' || this.editedItem.jenis_kelamin !='' || this.editedItem.nama_peserta !='' || this.editedItem.alamat_peserta !='' || this.editedItem.no_hp !='' || this.editedItem.id_peserta !=''){
        if (this.editedIndex > -1) {
          console.log('edited data');
          
          axios.post('/donasi/'+this.editedItem.id_donasi,{id_jenis_donasi:this.editedItem.id_jenis_donasi, id_donatur:this.editedItem.id_donatur, id_kegiatan:this.editedItem.id_kegiatan,
          tgl_donasi:this.editedItem.tgl_donasi, nominal:this.editedItem.nominal, keterangan:this.editedItem.keterangan,nilai_taksir:this.editedItem.nilai_taksir}, {timeout : 30000})
          .then(response=>{
            console.log(response);
          })

          Object.assign(this.pesertas[this.editedIndex], this.editedItem);
          this.$store.commit('SET_BERHASILEDIT',true);
        } else {
          console.log('created data');
          if(this.editedItem.id_jenis_donasi==1){
          axios.post('/postdonasi',{id_jenis_donasi:this.editedItem.id_jenis_donasi, id_donatur:this.editedItem.id_donatur, id_kegiatan:this.editedItem.id_kegiatan,
          tgl_donasi:this.editedItem.tgl_donasi, nominal:this.editedItem.nominal, nilai_taksir:this.editedItem.nominal,keterangan:this.editedItem.keterangan}, {timeout : 30000})
          .then(response=>{
            console.log(response);
          })

          this.donasis.push(this.editedItem);
          this.$store.commit('SET_BERHASILSIMPAN',true);
          }else if(this.editedItem.id_jenis_donasi==2){
            axios.post('/postdonasi',{id_jenis_donasi:this.editedItem.id_jenis_donasi, id_donatur:this.editedItem.id_donatur, id_kegiatan:this.editedItem.id_kegiatan,
            tgl_donasi:this.editedItem.tgl_donasi, nominal:this.editedItem.nominal, nilai_taksir:this.nilaiAkhir, keterangan:this.editedItem.keterangan}, {timeout : 30000})
            .then(response=>{
              console.log(response);
            })

            this.donasis.push(this.editedItem);
            this.$store.commit('SET_BERHASILSIMPAN',true);
          }else{
            axios.post('/postdonasi',{id_jenis_donasi:this.editedItem.id_jenis_donasi, id_donatur:this.editedItem.id_donatur, id_kegiatan:this.editedItem.id_kegiatan,
            tgl_donasi:this.editedItem.tgl_donasi, nominal:this.editedItem.nominal, nilai_taksir:this.editedItem.nilai_taksir, keterangan:this.editedItem.keterangan}, {timeout : 30000})
            .then(response=>{
              console.log(response);
            })

            this.donasis.push(this.editedItem);
            this.$store.commit('SET_BERHASILSIMPAN',true);
          }
        }
        this.close();
        this.initialize();
        }else{
          this.$store.commit('SET_HARUSISI',true);
        }
      },
    },
   created(){
      this.$emit(`update:layout`, AdminDashLayout);
      this.initialize();
      
    },
  }
</script>
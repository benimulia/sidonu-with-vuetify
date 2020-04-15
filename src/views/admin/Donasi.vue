<template>
  <div class="col-12">
    <v-card>
    <v-card-title>
      List Donasi
    </v-card-title>

    <v-data-table
    :headers="headers"
    :items="pesertas"
    sort-by="id_peserta"
    class="elevation-1"
    :search="search"
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
                        :items="jd"
                        :rules="[v => !!v || 'Jenis Donasi is required']"
                        label="Jenis Donasi"
                        required
                      ></v-select>
                    </v-col>
                    <v-col cols="8">                      
                      <v-autocomplete
                        v-model="nama_donatur"
                        :items="namaDonatur"                        
                        label="Nama Donatur"
                        :rules="[v => !!v || 'Nama Donatur is required']"
                        required
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">                      
                      <v-autocomplete
                        v-model="nama_kegiatan"
                        :items="namaKegiatan"                        
                        label="Nama Kegiatan"
                        :rules="[v => !!v || 'Nama Kegiatan is required']"
                        required
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="4">
                      <v-menu
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        :return-value.sync="tgl_donasi"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model="editedItem.tgl_kegiatan"
                            label="Tanggal Donasi"
                            prepend-icon="event"
                            readonly
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker v-model="editedItem.tgl_donasi" no-title scrollable>
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                          <v-btn text color="primary" @click="$refs.menu.save(editedItem.tgl_donasi)">OK</v-btn>
                        </v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field type="number" required :rules="[v => !!v || 'Jumlah Donasi is required']" v-model="editedItem.no_hp" label="Jumlah Donasi"></v-text-field>
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
      namaDonatur:[
        'Bambang',
        'Budi'
      ],
      namaKegiatan:[
        'Kegiatan1',
        'Kegiatan2'
      ],
      jd:[
        'Tunai (Rupiah)',
        'Tunai (Dollar)',
        'Mobil'
      ],
      headers: [
        {
          text: 'ID',
          align: 'start',
          sortable: false,
          value: 'id',
        },
        { text: 'Jenis Donasi', value: 'id_jenis_peserta' },
        { text: 'Nama Donatur', value: 'nama_peserta' },
        { text: 'Kegiatan', value: 'jenis_kelamin' },
        { text: 'Tanggal Donasi', value: 'no_hp' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      pesertas: [],
      editedIndex: -1,
      editedItem: {
        id_peserta: '',
        id_jenis_peserta: '',
        nama_peserta: '',
        jenis_kelamin: '',
        no_hp: '',
        alamat_peserta: '',
        tgl_donasi: new Date().toISOString().substr(0, 10),
      },
      defaultItem: {
        id_peserta: '',
        id_jenis_peserta: '',
        nama_peserta: '',
        jenis_kelamin: '',
        no_hp: '',
        alamat_peserta: '',
        tgl_donasi: new Date().toISOString().substr(0, 10),
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    methods: {
      fetchPesertas(){
          axios.get('/peserta', {timeout: 20000})
          .then(response=>{
            console.log(response.data);
            this.pesertas= response.data;
          })
      },

      initialize(){
        this.fetchPesertas();
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

        axios.delete('/peserta/'+ item.id)
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

          axios.post('/peserta/'+this.editedItem.id,{id_peserta:this.editedItem.id_peserta, id_jenis_peserta:this.editedItem.id_jenis_peserta, nama_peserta:this.editedItem.nama_peserta,
          jenis_kelamin:this.editedItem.jenis_kelamin, no_hp:this.editedItem.no_hp, alamat_peserta:this.editedItem.alamat_peserta,}, {timeout : 30000})
          .then(response=>{
            console.log(response);
          })

          Object.assign(this.pesertas[this.editedIndex], this.editedItem);
          this.$store.commit('SET_BERHASILEDIT',true);
        } else {
          console.log('created data');

          axios.post('/postpeserta',{id_peserta:this.editedItem.id_peserta, id_jenis_peserta:this.editedItem.id_jenis_peserta, nama_peserta:this.editedItem.nama_peserta,
          jenis_kelamin:this.editedItem.jenis_kelamin, no_hp:this.editedItem.no_hp, alamat_peserta:this.editedItem.alamat_peserta,}, {timeout : 30000})
          .then(response=>{
            console.log(response);
          })

          this.pesertas.push(this.editedItem);
          this.$store.commit('SET_BERHASILSIMPAN',true);
        }
        this.close()
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
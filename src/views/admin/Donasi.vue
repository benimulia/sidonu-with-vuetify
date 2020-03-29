<template>
  <div class="col-12">
    <v-card>
    <v-card-title>
      List Donasi
    </v-card-title>

    <v-data-table
    :headers="headers"
    :items="donasis"
    sort-by="id_donasi"
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
              <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
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
                      <v-text-field required :rules="[v => !!v || 'ID Donasi is required']" v-model="editedItem.id_donasi" label="ID Donasi"></v-text-field>
                    </v-col>
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
                      <v-text-field required :rules="[v => !!v || 'Nama Donasi is required']" v-model="editedItem.nama_donasi" label="Nama Donasi"></v-text-field>
                    </v-col>
                    <v-col cols="4">
                      <v-select
                        v-model="editedItem.jenis_kelamin"
                        :items="jk"
                        :rules="[v => !!v || 'Jenis Kelamin is required']"
                        label="Jenis Kelamin"
                        required
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field required :rules="[v => !!v || 'No HP is required']" v-model="editedItem.no_hp" label="No HP"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field required :rules="[v => !!v || 'Alamat is required']" v-model="editedItem.alamat_donasi" label="Alamat"></v-text-field>
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
   name: 'Donasi',
   components: {
     //
  },
   data: () => ({
      dialog: false,
      valid: true,
      search: '',
      jk:[
        'Laki-laki',
        'Perempuan'
      ],
      jd:[
        'jd 01',
        'jd 02',
        'jd 03'
      ],
      headers: [
        {
          text: 'ID',
          align: 'start',
          sortable: false,
          value: 'id_donasi',
        },
        { text: 'Jenis Donasi', value: 'id_jenis_donasi' },
        { text: 'Nama', value: 'nama_donasi' },
        { text: 'Jenis Kelamin', value: 'jenis_kelamin' },
        { text: 'No HP', value: 'no_hp' },
        { text: 'Alamat', value: 'alamat_donasi' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      donasis: [],
      editedIndex: -1,
      editedItem: {
        id_donasi: '',
        id_jenis_donasi: '',
        nama_donasi: '',
        jenis_kelamin: '',
        no_hp: '',
        alamat_donasi: '',
      },
      defaultItem: {
        id_donasi: '',
        id_jenis_donasi: '',
        nama_donasi: '',
        jenis_kelamin: '',
        no_hp: '',
        alamat_donasi: '',
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
      fetchDonasis(){
          axios.get('/donasi', {timeout: 20000})
          .then(response=>{
            console.log(response.data);
            this.donasis= response.data;
          })
      },

      initialize(){
        this.fetchDonasis();
      },

      editItem (item) {
        this.editedIndex = this.donasis.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.donasis.indexOf(item)
        if(confirm('Apakah yakin dihapus?') && this.donasis.splice(index, 1)){
        
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
        if(this.editedItem.id_jenis_donasi !='' || this.editedItem.jenis_kelamin !='' || this.editedItem.nama_donasi !='' || this.editedItem.alamat_donasi !='' || this.editedItem.no_hp !='' || this.editedItem.id_donasi !=''){
        if (this.editedIndex > -1) {
          console.log('edited data');

          axios.post('/donasi/'+this.editedItem.id,{id_donasi:this.editedItem.id_donasi, id_jenis_donasi:this.editedItem.id_jenis_donasi, nama_donasi:this.editedItem.nama_donasi,
          jenis_kelamin:this.editedItem.jenis_kelamin, no_hp:this.editedItem.no_hp, alamat_donasi:this.editedItem.alamat_donasi,}, {timeout : 30000})
          .then(response=>{
            console.log(response);
          })

          Object.assign(this.donasis[this.editedIndex], this.editedItem);
          this.$store.commit('SET_BERHASILEDIT',true);
        } else {
          console.log('created data');

          axios.post('/postdonasi',{id_donasi:this.editedItem.id_donasi, id_jenis_donasi:this.editedItem.id_jenis_donasi, nama_donasi:this.editedItem.nama_donasi,
          jenis_kelamin:this.editedItem.jenis_kelamin, no_hp:this.editedItem.no_hp, alamat_donasi:this.editedItem.alamat_donasi,}, {timeout : 30000})
          .then(response=>{
            console.log(response);
          })

          this.donasis.push(this.editedItem);
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
      axios.interceptors.request.use((config) => {
        // Do something before request is sent
        this.$store.commit('LOADER',true);
        return config;
      }, (error) => {
        // Do something with request error
        this.$store.commit('LOADER',false);
        return Promise.reject(error);
      });

      // Add a response interceptor
      axios.interceptors.response.use((response)=> {
          // Any status code that lie within the range of 2xx cause this function to trigger
          // Do something with response data
          this.$store.commit('LOADER',false);
          return response;
        }, (error) => {
          // Any status codes that falls outside the range of 2xx cause this function to trigger
          // Do something with response error
          return Promise.reject(error);
        });
    },
  }
</script>
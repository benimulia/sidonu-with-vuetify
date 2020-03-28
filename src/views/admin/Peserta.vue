<template>
  <div class="col-12">
    <v-card>
    <v-card-title>
      List Peserta
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
              <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="4" md="4">
                      <v-text-field required :rules="[v => !!v || 'ID Peserta is required']" v-model="editedItem.id_peserta" label="ID Peserta"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4" md="4">
                      <v-select
                        v-model="editedItem.id_jenis_peserta"
                        :items="jp"
                        :rules="[v => !!v || 'Jenis Peserta is required']"
                        label="Jenis Peserta"
                        required
                      ></v-select>
                    </v-col>
                    <v-col cols="8">
                      <v-text-field required :rules="[v => !!v || 'Nama Peserta is required']" v-model="editedItem.nama_peserta" label="Nama Peserta"></v-text-field>
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
                      <v-text-field required :rules="[v => !!v || 'Alamat is required']" v-model="editedItem.alamat_peserta" label="Alamat"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn rounded color="dark" class="mx-4 warning" text @click="close">Cancel</v-btn>
                <v-btn rounded color="dark" class="success" text @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
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
    <Loader></Loader>
  </div>  
</template>

<script>
import AdminDashLayout from '../../layouts/AdminDashLayout'
import Loader from '../../components/_loader'
import axios from 'axios'

  export default {
   name: 'Peserta',
   components: {
    Loader
  },
   data: () => ({
      dialog: false,
      search: '',
      jk:[
        'Laki-laki',
        'Perempuan'
      ],
      jp:[
        'JP 01',
        'JP 02',
        'JP 03'
      ],
      headers: [
        {
          text: 'ID',
          align: 'start',
          sortable: false,
          value: 'id_peserta',
        },
        { text: 'Jenis Peserta', value: 'id_jenis_peserta' },
        { text: 'Nama', value: 'nama_peserta' },
        { text: 'Jenis Kelamin', value: 'jenis_kelamin' },
        { text: 'No HP', value: 'no_hp' },
        { text: 'Alamat', value: 'alamat_peserta' },
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
      },
      defaultItem: {
        id_peserta: '',
        id_jenis_peserta: '',
        nama_peserta: '',
        jenis_kelamin: '',
        no_hp: '',
        alamat_peserta: '',
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
        confirm('Apakah yakin dihapus?') && this.pesertas.splice(index, 1)
        console.log('deleted data');

        axios.delete('/peserta/'+ item.id)
          .then(response=>{
            console.log(response);
          })
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          console.log('edited data');

          axios.put('/peserta/'+this.editedItem.id,{id_peserta:this.editedItem.id_peserta, id_jenis_peserta:this.editedItem.id_jenis_peserta, nama_peserta:this.editedItem.nama_peserta,
          jenis_kelamin:this.editedItem.jenis_kelamin, no_hp:this.editedItem.no_hp, alamat_peserta:this.editedItem.alamat_peserta,}, {timeout : 2000})
          .then(response=>{
            console.log(response);
          })

          Object.assign(this.pesertas[this.editedIndex], this.editedItem)
        } else {
          console.log('created data');

          axios.post('/postpeserta',{id_peserta:this.editedItem.id_peserta, id_jenis_peserta:this.editedItem.id_jenis_peserta, nama_peserta:this.editedItem.nama_peserta,
          jenis_kelamin:this.editedItem.jenis_kelamin, no_hp:this.editedItem.no_hp, alamat_peserta:this.editedItem.alamat_peserta,}, {timeout : 2000})
          .then(response=>{
            console.log(response);
          })

          this.pesertas.push(this.editedItem)
        }
        this.close()
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
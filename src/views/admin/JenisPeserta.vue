<template>
  <div class="col-12">
    <v-card>
    <v-card-title>
      Jenis Peserta
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
                    <v-col cols="4">
                      <v-text-field required :rules="[v => !!v || 'ID Jenis Peserta is required']" v-model="editedItem.id_jenis_peserta" label="ID Jenis Peserta"></v-text-field>
                    </v-col>
                    <v-col cols="8">
                      <v-text-field required :rules="[v => !!v || 'Nama Jenis Peserta is required']" v-model="editedItem.nama_jenis_peserta" label="Nama Jenis Peserta"></v-text-field>
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
          class="mx-1"
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
      headers: [
        {
          text: 'ID Jenis Peserta',
          align: 'start',
          sortable: false,
          value: 'id_jenis_peserta',
        },
        { text: 'Jenis Peserta', value: 'nama_jenis_peserta' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      pesertas: [],
      editedIndex: -1,
      editedItem: {
        id_jenis_peserta: '',
        jenis_peserta: '',
      },
      defaultItem: {
        id_jenis_peserta: '',
        jenis_peserta: '',
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
          axios.get('/jenis_peserta')
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

        axios.delete('/jenis_peserta/'+ item.id)
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

          axios.put('/jenis_peserta/'+this.editedItem.id,{id_jenis_peserta:this.editedItem.id_jenis_peserta, nama_jenis_peserta:this.editedItem.nama_jenis_peserta}, {timeout : 60000})
          .then(response=>{
            console.log(response);
          })

          Object.assign(this.pesertas[this.editedIndex], this.editedItem)
        } else {
          console.log('created data');

          axios.post('/postjenis_peserta',{id_jenis_peserta:this.editedItem.id_jenis_peserta, nama_jenis_peserta:this.editedItem.nama_jenis_peserta}, {timeout : 60000})
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
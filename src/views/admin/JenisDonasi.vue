<template>
  <div class="col-12">
    <v-row>          
        <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>
    </v-row>
    <v-card>
    <v-card-title  >
      Jenis Donasi
    </v-card-title>

    <v-data-table
    :headers="headers"
    :items="jenisdonasis"
    sort-by="id_jenis_donasi"
    class="elevation-1"
    :search="search"
    
    >
      <template v-slot:top>
        <v-toolbar flat >
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
              <v-btn color="primary" dark class="mb-2" v-on="on"><v-icon>mdi-plus</v-icon> New Item</v-btn>
            </template>
            <v-form ref="form" v-model="valid" lazy-validation>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>                
                <v-container>
                  <v-row>
                    <v-col cols="8">
                      <v-text-field 
                        prepend-icon="title"
                        required 
                        :rules="nameRules" 
                        v-model="editedItem.nama_jenis_donasi" 
                        label="Nama Jenis Donasi">
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
  </div>  
</template>

<script>
import AdminDashLayout from '../../layouts/AdminDashLayout'
import axios from 'axios'

  export default {
   name: 'JenisDonasi',
   components: {
  },
   data: () => ({
      dialog: false,
      valid: true,
      nameRules: [
      v => !!v || 'Harus diisi',
      ],
      search: '',
      headers: [
        {
          text: 'ID',
          align: 'start',
          value: 'id_jenis_donasi',
        },
        { text: 'Jenis Donasi', value: 'nama_jenis_donasi' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      jenisdonasis: [],
      editedIndex: -1,
      editedItem: {
        id_jenis_donasi:'',
        nama_jenis_donasi: '',
      },
      defaultItem: {
        id_jenis_donasi: '',
        nama_jenis_donasi: '',
      },
      breadcrumbs:[
        {
        text: 'Dashboard',
        disabled: false,
        href: 'dashboard',
        },
        {
          text: 'Donasi',
          disabled: true,
          href: '#',
        },
        {
          text: 'Jenis Donasi',
          disabled: true,
          href: '#',
        }
      ]
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
      fetchJenisDonasis(){
          axios.get('/jenis_donasi')
          .then(response=>{
            console.log(response.data);
            this.jenisdonasis= response.data;
          })
      },

      initialize(){
        this.fetchJenisDonasis();
      },

      editItem (item) {
        this.editedIndex = this.jenisdonasis.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.jenisdonasis.indexOf(item)
        if(confirm('Apakah yakin dihapus?') && this.jenisdonasis.splice(index, 1)){
        
        console.log('deleted data');

        axios.delete('/jenis_donasi/'+ item.id_jenis_donasi)
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
        if(this.editedItem.nama_jenis_donasi !=''){
        if (this.editedIndex > -1) {
          console.log('edited data');

          axios.post('/jenis_donasi/'+this.editedItem.id_jenis_donasi,{nama_jenis_donasi:this.editedItem.nama_jenis_donasi}, {timeout : 30000})
          .then(response=>{
            console.log(response);
          })

          Object.assign(this.jenisdonasis[this.editedIndex], this.editedItem)
          this.$store.commit('SET_BERHASILEDIT',true);
        } else {
          console.log('created data');

          axios.post('/postjenis_donasi',{nama_jenis_donasi:this.editedItem.nama_jenis_donasi}, {timeout : 30000})
          .then(response=>{
            console.log(response);
          })

          this.jenisdonasis.push(this.editedItem);          
          this.$store.commit('SET_BERHASILSIMPAN',true);
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
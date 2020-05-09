<template>
  <div class="col-12">
    <v-card>
    <v-card-title  >
      Jenis Peserta
    </v-card-title>

    <v-data-table
    :headers="headers"
    :items="jenispesertas"
    sort-by="id_jenis_donatur"
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
                        v-model="editedItem.nama_jenis_donatur" 
                        label="Nama Jenis Peserta"
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
   name: 'JenisPeserta',
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
          value: 'id_jenis_donatur',
        },
        { text: 'Jenis Peserta', value: 'nama_jenis_donatur' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      jenispesertas: [],
      editedIndex: -1,
      editedItem: {
        id_jenis_donatur:'',
        nama_jenis_donatur: '',
      },
      defaultItem: {
        id_jenis_donatur: '',
        nama_jenis_donatur: '',
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
      fetchJenisPesertas(){
          axios.get('/jenis_donatur')
          .then(response=>{
            console.log(response.data);
            this.jenispesertas= response.data;
          })
      },

      initialize(){
        this.fetchJenisPesertas();
      },

      editItem (item) {
        this.editedIndex = this.jenispesertas.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.jenispesertas.indexOf(item)
        if(confirm('Apakah yakin dihapus?') && this.jenispesertas.splice(index, 1)){
        
        console.log('deleted data');

        axios.delete('/jenis_donatur/'+ item.id_jenis_donatur)
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
        if(this.editedItem.nama_jenis_peserta !=''){
        if (this.editedIndex > -1) {
          console.log('edited data');

          axios.post('/jenis_donatur/'+this.editedItem.id_jenis_donatur,{nama_jenis_donatur:this.editedItem.nama_jenis_donatur}, {timeout : 30000})
          .then(response=>{
            console.log(response);
          })

          Object.assign(this.jenispesertas[this.editedIndex], this.editedItem)
          this.$store.commit('SET_BERHASILEDIT',true);
        } else {
          console.log('created data');

          axios.post('/postjenis_donatur',{nama_jenis_donatur:this.editedItem.nama_jenis_donatur}, {timeout : 30000})
          .then(response=>{
            console.log(response);
          })

          this.jenispesertas.push(this.editedItem);          
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
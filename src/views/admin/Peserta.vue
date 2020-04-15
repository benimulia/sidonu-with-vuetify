<template>
  <div class="col-12">
    <v-card>
    <v-card-title  >
      List Seluruh Peserta
    </v-card-title>

    <v-data-table
    :headers="headers"
    :items="donaturs"
    sort-by="id"
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
                        required 
                        :rules="[v => !!v || 'Nama Peserta is required']" 
                        v-model="editedItem.nama_donatur" 
                        label="Nama Peserta"
                        prepend-icon="person"                        
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4" md="4">
                      <v-select
                        v-model="editedItem.id_jenis_donatur"
                        :items="jenisdonaturs"
                        item-text="nama_jenis_donatur"
                        item-value="id_jenis_donatur"
                        :rules="[v => !!v || 'Jenis Peserta is required']"
                        label="Jenis Peserta"
                        required
                        prepend-icon="recent_actors"
                      ></v-select>
                    </v-col>                    
                    <v-col cols="4">
                      <v-select
                        v-model="editedItem.jenis_kelamin"
                        :items="jk"
                        :rules="[v => !!v || 'Jenis Kelamin is required']"
                        label="Jenis Kelamin"
                        required
                        prepend-icon="wc"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field 
                        required 
                        :rules="[v => !!v || 'No HP is required']" 
                        v-model="editedItem.no_hp" 
                        label="No HP"
                        prepend-icon="phone"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field 
                        required 
                        :rules="[v => !!v || 'Alamat is required']" 
                        v-model="editedItem.alamat_donatur" 
                        label="Alamat"
                        prepend-icon="location_on"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field 
                        prepend-icon="mail"
                        type="email"
                        :rules="emailRules"
                        required
                        v-model="editedItem.email_donatur" 
                        label="Email"
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
          value: 'id_donatur',
        },
        { text: 'Jenis Peserta', value: 'nama_jenis_donatur' },
        { text: 'Nama', value: 'nama_donatur' },
        { text: 'Jenis Kelamin', value: 'jenis_kelamin' },
        { text: 'No HP', value: 'no_hp' },
        { text: 'Alamat', value: 'alamat_donatur' },
        { text: 'Email', value: 'email_donatur' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      donaturs:[],
      jenisdonaturs: [],
      jk:[
        'Laki-laki',
        'Perempuan'
      ],
      editedIndex: -1,
      editedItem: {
        id_donatur: '',
        id_jenis_donatur: '',
        nama_jenis_donatur: '',
        nama_donatur: '',
        jenis_kelamin: '',
        no_hp: '',
        alamat_donatur: '',
        email_donatur: '',
      },
      defaultItem: {
        id_donatur: '',
        id_jenis_donatur: '',
        nama_jenis_donatur: '',
        nama_donatur: '',
        jenis_kelamin: '',
        no_hp: '',
        alamat_donatur: '',
        email_donatur: '',
      },
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
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
      fetchJenisDonatur(){
          axios.get('/jenis_donatur')
          .then(response=>{
            console.log(response.data);
            this.jenisdonaturs= response.data;
          })
      },

      fetchDonaturs(){
          axios.get('/donatur')
          .then(response=>{
            console.log(response.data);
            this.donaturs= response.data.donaturs;
          })
      },

      initialize(){
        this.fetchDonaturs();
        this.fetchJenisDonatur();
      },

      editItem (item) {
        this.editedIndex = this.donaturs.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.donaturs.indexOf(item)
        if(confirm('Apakah yakin dihapus?') && this.donaturs.splice(index, 1)){
        
        console.log('deleted data');

        axios.delete('/donatur/'+ item.id_donatur)
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
        if(this.editedItem.nama_donatur !='' && this.editedItem.id_jenis_donatur !='' && this.editedItem.jenis_kelamin !='' 
        && this.editedItem.no_hp != '' && this.editedItem.alamat_donatur !='' && this.editedItem.email_donatur !=''){
        if (this.editedIndex > -1) {
          console.log('edited data');

          axios.post('/donatur/'+this.editedItem.id_donatur,{nama_donatur:this.editedItem.nama_donatur, id_jenis_donatur:this.editedItem.id_jenis_donatur, jenis_kelamin:this.editedItem.jenis_kelamin, 
          no_hp:this.editedItem.no_hp, alamat_donatur:this.editedItem.alamat_donatur, email_donatur:this.editedItem.email_donatur}, {timeout : 30000})
          .then(response=>{
            console.log(response);
          })

          Object.assign(this.donaturs[this.editedIndex], this.editedItem)
          this.$store.commit('SET_BERHASILEDIT',true);
        } else {
          console.log('created data');

          axios.post('/postdonatur',{nama_donatur:this.editedItem.nama_donatur, id_jenis_donatur:this.editedItem.id_jenis_donatur, jenis_kelamin:this.editedItem.jenis_kelamin, 
          no_hp:this.editedItem.no_hp, alamat_donatur:this.editedItem.alamat_donatur, email_donatur:this.editedItem.email_donatur}, {timeout : 30000})
          .then(response=>{
            console.log(response);
          })

          this.donaturs.push(this.editedItem);          
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
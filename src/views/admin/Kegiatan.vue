<template>
  <div class="col-12">
    <v-card>
    <v-card-title>
      List Kegiatan
    </v-card-title>

    <v-data-table
    :headers="headers"
    :items="kegiatans"
    sort-by="id"
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
                    <v-col cols="8">
                      <v-text-field prepend-icon="title" required :rules="[v => !!v || 'Nama kegiatan is required']" v-model="editedItem.nama_kegiatan" label="Nama kegiatan"></v-text-field>
                    </v-col>
                    <v-col cols="12" lg="4">
                      
                      <!-- <v-date-picker 
                      v-model="editedItem.tgl_kegiatan" 
                      label="Tanggal Kegiatan"
                      required
                      full-width
                      :landscape="$vuetify.breakpoint.smAndUp"
                      class="mt-4"
                      >
                      </v-date-picker> -->

                      <v-menu
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        :return-value.sync="tgl_kegiatan"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model="tgl_kegiatan"
                            label="Tanggal Kegiatan"
                            prepend-icon="event"
                            readonly
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker v-model="tgl_kegiatan" no-title scrollable>
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                          <v-btn text color="primary" @click="$refs.menu.save(tgl_kegiatan)">OK</v-btn>
                        </v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field prepend-icon="room" required :rules="[v => !!v || 'Tempat Kegiatan is required']" v-model="editedItem.tempat_kegiatan" label="Tempat Kegiatan"></v-text-field>
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
   name: 'Kegiatan',
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
          sortable: false,
          value: 'id',
        },
        { text: 'Nama Kegiatan', value: 'nama_kegiatan' },
        { text: 'Tanggal Kegiatan', value: 'tgl_kegiatan' },
        { text: 'Tempat Kegiatan', value: 'tempat_kegiatan' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      kegiatans: [],
      editedIndex: -1,
      editedItem: {
        id: '',
        nama_kegiatan: '',
        tgl_kegiatan: new Date().toISOString().substr(0, 10),
        tempat_kegiatan: '',
      },
      defaultItem: {
        id: '',
        nama_kegiatan: '',
        tgl_kegiatan: new Date().toISOString().substr(0, 10),
        tempat_kegiatan: '',
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
      fetchKegiatans(){
          axios.get('/kegiatan', {timeout: 20000})
          .then(response=>{
            console.log(response.data);
            this.kegiatans= response.data;
          })
      },

      initialize(){
        this.fetchKegiatans();
      },

      editItem (item) {
        this.editedIndex = this.kegiatans.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.kegiatans.indexOf(item)
        if(confirm('Apakah yakin dihapus?') && this.kegiatans.splice(index, 1)){
        
        console.log('deleted data');

        axios.delete('/kegiatan/'+ item.id)
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
        if(this.editedItem.id_jenis_kegiatan !='' || this.editedItem.jenis_kelamin !='' || this.editedItem.nama_kegiatan !='' || this.editedItem.alamat_kegiatan !='' || this.editedItem.no_hp !='' || this.editedItem.id_kegiatan !=''){
        if (this.editedIndex > -1) {
          console.log('edited data');

          axios.post('/kegiatan/'+this.editedItem.id,{nama_kegiatan:this.editedItem.nama_kegiatan, tgl_kegiatan:this.editedItem.tgl_kegiatan, tempat_kegiatan:this.editedItem.tempat_kegiatan}, {timeout : 30000})
          .then(response=>{
            console.log(response);
          })

          Object.assign(this.kegiatans[this.editedIndex], this.editedItem);
          this.$store.commit('SET_BERHASILEDIT',true);
        } else {
          console.log('created data');

          axios.post('/postkegiatan',{nama_kegiatan:this.editedItem.nama_kegiatan, tgl_kegiatan:this.editedItem.tgl_kegiatan, tempat_kegiatan:this.editedItem.tempat_kegiatan}, {timeout : 30000})
          .then(response=>{
            console.log(response);
          })

          this.kegiatans.push(this.editedItem);
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
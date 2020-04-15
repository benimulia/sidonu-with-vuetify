<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
      color="deep-black accent-6"
      left
      dark
    >
      <v-list dense>
        <template v-for="item in items">
          <v-row
            v-if="item.heading"
            :key="item.heading"
            align="center"
          >
            <v-col cols="6">
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-col>
            <v-col
              cols="6"
              class="text-center"
            >
              <a
                href="#!"
                class="body-2 black--text"
              >EDIT</a>
            </v-col>
          </v-row>
          <v-list-group
            v-else-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon=""
            
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>
                  {{ item.text }}
                </v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item
              v-for="(child, i) in item.children"
              :key="i"
               :to="child.link" link
            >
              <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ child.text }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item
            v-else
            :key="item.text"
            :to="item.link" link
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      style="background-image: linear-gradient(to right, #434343 0%, black 100%);"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title
        style="width: 300px"
        class="ml-0 pl-4"
      >
        <span class="hidden-sm-and-down">S I D O N U</span>
        <!--<span v-if="user.name=='Admin'" class="hidden-sm-and-down">S I D O N U</span>-->
      </v-toolbar-title>

      <v-spacer />
      <span class="hidden-sm-and-down" v-if="authenticated">Welcome, {{user.name}}</span>
      <v-btn icon>
        <v-icon>mdi-account</v-icon>
      </v-btn>
      <v-dialog v-model="dialog" persistent max-width="290">
        <template v-slot:activator="{ on }">
      <v-btn icon v-on="on">
        <v-icon>mdi-power</v-icon>
      </v-btn>
      </template>
        <v-card>
          <v-card-title class="headline">Konfirmasi</v-card-title>
          <v-card-text>Apakah Anda yakin untuk keluar?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="warning"  @click="dialog = false">Batal</v-btn>
            <v-btn color="success"  @click.prevent="signOut" @click="notif=true">Ya</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-app-bar>
    <v-content >
      <v-container
        class="fill-height"
        fluid        
        :style="{'background-image': `url(${require('../assets/background.jpg')})`}"
      >

        <slot/>


      </v-container>
    </v-content>
    <v-footer
        class="font-weight-medium "
        dark
        dense
        style="background-image: linear-gradient(to right, #434343 0%, black 100%);"
        
      >
        <v-col
          class="text-right"
          cols="12"
        >
          sidonu &nbsp;&nbsp; &copy; {{ new Date().getFullYear() }} by Maju Jaya Makmur Sentosa
        </v-col>
      </v-footer>
    <Loader></Loader>
    <Notifikasi></Notifikasi>
    <v-snackbar v-model="notif" :timeout="4000" top color="success">
        <span>Berhasil Keluar!</span>
        <v-btn text color="white" @click="notif = false">Close</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import Loader from '../components/_loader'
import Notifikasi from '../components/Notifikasi'
import axios from 'axios'

  export default {
    computed: {
        ...mapGetters({
            user: 'auth/user',
            authenticated: 'auth/authenticated'
        })
    },
    props: {
      source: String,
    },
    components: {
      Loader,
      Notifikasi
    },
    data: () => ({
      dialog: false,
      drawer: null,
      notif: false,
      items: [
        { icon: 'mdi-view-dashboard', text: 'Dashboard' , link:'/admin/dashboard'},
        { icon: 'mdi-calendar', text: 'Kegiatan',link:'/admin/kegiatan' },
        {
          icon: 'mdi-account-multiple',
          'icon-alt': 'mdi-chevron-down',
          text: 'Peserta',
          model: true,
          children: [
            { icon: 'mdi-clipboard-file', text: 'List Peserta', link:'/admin/peserta' },
            { icon: 'mdi-mail', text: 'Jenis Peserta',link:'/admin/jenispeserta' },
          ],
        },
        {
          icon: 'mdi-handshake',
          'icon-alt': 'mdi-chevron-down',
          text: 'Donasi',
          model: true,
          children: [
            { icon: 'mdi-clipboard-file', text: 'List Donasi', link:'/admin/donasi' },
            { icon: 'mdi-mail', text: 'Jenis Donasi',link:'/admin/jenisdonasi' },
          ],
        },
        { icon: 'mdi-settings', text: 'Settings' },
      ],
    }),
    methods:{
      ...mapActions({
        signOutAction: 'auth/signOut'
      }),

      signOut(){
        this.signOutAction().then(()=>{
          this.$router.replace({
            name: 'Home'
          })
        })
      }
    },
    created(){
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
        this.$store.commit('LOADER',false);
        return Promise.reject(error);
      });
    }
  }
</script>
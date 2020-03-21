<template>
            <v-card class="elevation-12">
              <v-toolbar
                color="#242424"
                dark
                flat
              >
                <v-toolbar-title>Login</v-toolbar-title>
                
              </v-toolbar>
              <v-card-text>
                <v-form @submit.prevent="submit">
                  <v-text-field
                    id="email"
                    label="Email"
                    name="email"
                    prepend-icon="person"
                    type="email"
                    v-model="form.email"
                  />

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                    v-model="form.password"
                  />
                  <v-spacer/>
                  <div align="center">
                  <v-btn type="submit" color="dark" class="info">Login</v-btn>               
                  <v-btn color="dark" to="/" class="mx-4 warning">Cancel</v-btn>

                  </div>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                
              </v-card-actions>
              <Loader></Loader>  
            </v-card>
</template>

<script>
import { mapActions } from 'vuex'
import LoginOrSignupLayout from '../layouts/LoginOrSignupLayout'
import axios from 'axios'
import Loader from '../components/_loader'

export default {
  name: 'SignIn',
  components: {
    Loader
  },

  data() {
    return{
        form:{
            email : '',
            password : ''
        }
    }  
  },

  created(){
      this.$emit(`update:layout`, LoginOrSignupLayout);
      // Add a request interceptor
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

  methods: {
      ...mapActions({
        login: "auth/login"
      }),
      submit() {
         this.login(this.form).then(() => {
           this.$router.replace({
             name: 'dashboard'
           })
         })
      }
  }
}
</script>

<style>
  h1{
    color:#111745
  }
</style>
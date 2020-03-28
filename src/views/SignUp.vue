<template>
            <v-card class="elevation-12">
              <v-toolbar
                color="#242424"
                dark
                flat
              >
                <v-toolbar-title>Registrasi</v-toolbar-title>
                
              </v-toolbar>
              <v-card-text>
                <v-form @submit.prevent="submit" ref="form" v-model="valid" lazy-validation>
                  <v-text-field
                    id="name"
                    label="Nama"
                    name="name"
                    prepend-icon="person"
                    type="text"
                    v-model="form.name"
                    :rules="nameRules"
                    required
                  />
                  <v-text-field
                    id="email"
                    label="Email"
                    name="email"
                    prepend-icon="mail"
                    type="email"
                    v-model="form.email"
                    :rules="emailRules"
                    required
                  />

                  <v-text-field
                    id="password"
                    prepend-icon="lock"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, rules.min]"
                    :type="show1 ? 'text' : 'password'"
                    name="password"
                    label="Password"
                    hint="At least 8 characters"
                    counter
                    @click:append="show1 = !show1"
                    v-model="form.password"
                  />

                  <v-text-field
                    id="password_confirmation"
                    label="Password Confirmation"
                    name="password_confirmation"
                    prepend-icon="lock"
                    type="password"
                    v-model="form.password_confirmation"
                  />
                  <v-spacer/>
                  <div align="center">
                  <v-btn type="submit" color="dark" class="info" :disabled="!valid">Register</v-btn>               
                  <v-btn color="dark" to="/" class="mx-4 warning">Cancel</v-btn> <br> <br> <br>
                  <a href="/signin">Login Here!</a>

                  </div>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                
              </v-card-actions>
              <Loader></Loader>  
              <Snackbar></Snackbar>
            </v-card>
</template>

<script>
import LoginOrSignupLayout from '../layouts/LoginOrSignupLayout'
import axios from 'axios'
import Loader from '../components/_loader'
import Snackbar from '../components/snackbar'

export default {
  name: 'SignUp',
  components: {
    Loader,
    Snackbar
  },

  data() {
    return{
        form:{
            email : '',
            password : '',
            password_confirmation : ''
        },
        show1: false,
        rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
        },
        valid: true,
        nameRules: [
        v => !!v || 'Name is required',
        ],
        emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
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
        this.$store.commit('SNACKBAR',true);
        return response;
      }, (error) => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
      });
  },

  methods: {
      submit() {
        if(this.$refs.form.validate()){
         axios.post('/register',{name:this.form.name, email:this.form.email, password:this.form.password, password_confirmation:this.form.password_confirmation}, {timeout : 60000})
          .then(response=>{
            console.log(response);            
          })}
          this.form.name='';
          this.form.email='';
          this.form.password='';
          this.form.password_confirmation='';
      }
  }
}
</script>

<style>
  h1{
    color:#111745
  }
</style>
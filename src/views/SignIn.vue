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
              
            </v-card>
</template>

<script>
import { mapActions } from 'vuex'
import LoginOrSignupLayout from '../layouts/LoginOrSignupLayout'

export default {
  name: 'SignIn',
  components: {
    
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
      this.$emit(`update:layout`, LoginOrSignupLayout)
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
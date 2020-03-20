<template>

    <v-card class="elevation-12">
        <v-toolbar
        color="primary"
        dark
        flat
        >
        <v-toolbar-title>Sign Up</v-toolbar-title>
        
        </v-toolbar>
        <v-card-text>
        <v-form>
            <v-text-field
            label="Login"
            name="login"
            prepend-icon="person"
            type="text"
            />

            <v-text-field
            id="password"
            label="Password"
            name="password"
            prepend-icon="lock"
            type="password"
            />
        </v-form>
        </v-card-text>
        <v-card-actions>
        <v-spacer />
        <v-btn color="dark">Sign Up</v-btn>
        <v-btn color="dark" to="/">Cancel</v-btn>
        </v-card-actions>
    </v-card>

</template>

<script>
import LoginOrSignupLayout from '../layouts/LoginOrSignupLayout'

export default {
  name: 'SignUp',
  components: {
    
  },
  created(){
      this.$emit(`update:layout`, LoginOrSignupLayout)
  }
  
}
</script>


<style>
  h1{
    color:#111745
  }
</style>
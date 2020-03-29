<template>
    <div >
    <div>
      <v-app-bar
        color="#242424"
        dark
      >
        <v-btn icon to="/">
          <v-icon>mdi-home</v-icon>
        </v-btn>
        <v-toolbar-title to="/">sidonu</v-toolbar-title>
  
        <v-spacer></v-spacer>
  
        <v-toolbar-items>
          <!-- <v-btn text to="/signup"> Sign Up</v-btn>  -->
          <v-btn text to="/signin"> Sign In</v-btn>
        </v-toolbar-items>
  
      </v-app-bar>
    </div>

    <v-content >
      <slot/>
    </v-content>

    <v-footer color="#242424" dark fixed>
      <v-spacer></v-spacer>
      <div>sidonu &nbsp;&nbsp; &copy; {{ new Date().getFullYear() }}</div>
      <v-spacer></v-spacer>
    </v-footer>
    </div>
</template>
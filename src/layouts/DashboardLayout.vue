<template>
    <div>
        <div>
      <v-app-bar
        color="#111745"
        dense
        dark
      >
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-btn icon to="/">
          <v-icon>mdi-home</v-icon>
        </v-btn>
        <v-toolbar-title to="/">S I D O N U</v-toolbar-title>
  
        <v-spacer></v-spacer>
  
        <v-toolbar-items>
          <v-btn text to="/signup"> Sign Up</v-btn> 
          <v-btn text to="/signin"> Sign In</v-btn>
        </v-toolbar-items>
  
      </v-app-bar>
    </div>

    <v-content>
      <slot/>
    </v-content>

    <v-footer color="#111745" dark fixed>
      <v-spacer></v-spacer>
      <div>SIDONU &nbsp;&nbsp; &copy; {{ new Date().getFullYear() }}</div>
      <v-spacer></v-spacer>
    </v-footer>
    </div>
</template>
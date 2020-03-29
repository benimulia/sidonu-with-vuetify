<template>
<div>
    <v-snackbar v-model="$store.state.harusisi" :timeout="4000" top color="error">
        <span>Isi data terlebih dahulu!</span>
        <v-btn text color="white" @click="$store.state.harusisi = false">Close</v-btn>
    </v-snackbar>
    <v-snackbar v-model="$store.state.berhasilsimpan" :timeout="4000" top color="success">
        <span>Data berhasil disimpan!</span>
        <v-btn text color="white" @click="$store.state.berhasilsimpan = false">Close</v-btn>
    </v-snackbar>
    <v-snackbar v-model="$store.state.berhasiledit" :timeout="4000" top color="success">
        <span>Data berhasil diubah!</span>
        <v-btn text color="white" @click="$store.state.berhasiledit = false">Close</v-btn>
    </v-snackbar>
    <v-snackbar v-model="$store.state.berhasillogin" :timeout="3000" top color="success">
        <span>Keren! Proses Berhasil</span>
        <v-btn text color="white" @click="$store.state.berhasillogin = false">Close</v-btn>
    </v-snackbar>
    <v-snackbar v-model="$store.state.berhasilhapus" :timeout="3000" top color="success">
        <span>Data berhasil dihapus!</span>
        <v-btn text color="white" @click="$store.state.berhasilhapus = false">Close</v-btn>
    </v-snackbar>
</div>
</template>

<template>
<div>
    <v-snackbar v-model="$store.state.snackbar" v-if="$store.state.snackbar" :timeout="4000" top color="success">
        <span>Keren! Proses Berhasil</span>
        <v-btn text color="white" @click="$store.state.snackbar = false">Close</v-btn>
    </v-snackbar>
</div>

</template>

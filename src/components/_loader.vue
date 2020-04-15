<template>
    <v-dialog
        v-model="$store.state.loader"
        hide-overlay
        persistent
        width="300"
    >
        <v-overlay>            
            <v-progress-circular indeterminate size="64"></v-progress-circular>
            <br> <br>
            <center>
            <p dark style = "font-family:calibri,arial;;font-size:16px;font-style:bold;">
                LOADING...
            </p>
            </center>
        </v-overlay>
    </v-dialog>
</template>

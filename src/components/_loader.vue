<template>
    <v-dialog
        v-model="$store.state.loader"
        hide-overlay
        persistent
        width="300"
    >
        <v-overlay>
            <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
    </v-dialog>
</template>

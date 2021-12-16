<template>
  <v-card class="pa-sm-10 loader" flat>
    <v-skeleton-loader type="text" width="75"></v-skeleton-loader>
    <v-skeleton-loader class="mb-2" type="heading"></v-skeleton-loader>
    <v-skeleton-loader class="mb-3" type="text" width="300"></v-skeleton-loader>
    <v-skeleton-loader class="mb-5" type="divider"></v-skeleton-loader>
    <v-skeleton-loader type="text@5,sentences" class="mb-2"></v-skeleton-loader>
    <v-skeleton-loader type="text@6,sentences" class="mb-2"></v-skeleton-loader>
    <v-skeleton-loader type="text@6,sentences" class="mb-2"></v-skeleton-loader>
    <v-skeleton-loader type="text@5,sentences" class="mb-2"></v-skeleton-loader>
    <v-skeleton-loader
      type="text@3,sentences"
      class="loader"
    ></v-skeleton-loader>
  </v-card>
</template>

<style scoped>
.loader {
  background-color: unset;
}
</style>

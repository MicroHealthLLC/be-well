<template>
  <v-row class="justify-center">
    <v-col cols="12" sm="6">
      <v-img src="/svg/page-not-found-bro.svg" alt="page-not-found" />
      <div class="d-flex justify-center">
        <v-btn to="/home" color="primary" text
          ><v-icon left>mdi-home</v-icon> Return Home</v-btn
        >
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "PageNotFound",
};
</script>

<style scoped></style>

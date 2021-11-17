<template>
  <v-row>
    <v-col class="col-12"
      ><span class="text-h6 text-sm-h5">My Profile</span><v-divider></v-divider>
      <v-text-field label="First Name"></v-text-field>
      <v-text-field label="Last Name"></v-text-field>
      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            label="Date of Birth"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="date" @input="menu = false"></v-date-picker>
      </v-menu>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      date: null,
      menu: false,
    };
  },
};
</script>

<style></style>

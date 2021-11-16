<template>
  <v-app>
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "App",
  data: () => ({
    //
  }),
  methods: {
    ...mapActions(["fetchCurrentUser"]),
  },
  mounted() {
    this.fetchCurrentUser();
  },
};
</script>

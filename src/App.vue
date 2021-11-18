<template>
  <v-app>
    <Navbar v-if="user" />
    <!-- Main Content -->
    <v-main class="main-wrapper" app>
      <WelcomeBanner v-if="$route.name == 'Home'" />
      <!-- Router Container -->
      <v-container>
        <router-view />
      </v-container>
    </v-main>
    <!-- Alert Message -->
    <v-snackbar v-model="snackbar.show" :color="snackbar.color" top
      >{{ snackbar.message }}
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="CLOSE_SNACKBAR">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import Navbar from "./components/Navbar.vue";
import WelcomeBanner from "./components/WelcomeBanner.vue";
export default {
  components: { Navbar, WelcomeBanner },
  name: "App",
  data: () => ({
    //
  }),
  methods: {
    ...mapActions(["fetchCurrentUser"]),
    ...mapMutations(["CLOSE_SNACKBAR"]),
  },
  computed: {
    ...mapGetters(["snackbar", "user"]),
  },
  mounted() {
    this.fetchCurrentUser();
  },
};
</script>

<style>
:root {
  --mh-blue: #1d336f;
  --mh-green: #9ec64c;
  --mh-orange: #dd9036;
}
.main-wrapper {
  background-color: #f0f3f7;
}
</style>

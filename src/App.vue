<template>
  <v-app>
    <Navbar v-if="user" />
    <!-- Main Content -->
    <v-main class="main-wrapper" app>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Navbar from "./components/Navbar.vue";
export default {
  components: { Navbar },
  name: "App",
  data: () => ({
    //
  }),
  methods: {
    ...mapActions(["fetchCurrentUser"]),
  },
  computed: {
    ...mapGetters(["user"]),
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

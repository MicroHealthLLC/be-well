<template>
  <v-row>
    <v-col>
      <!-- Navbar -->
      <!-- <v-btn-toggle
        v-if="navVisible"
        class="nav-btns"
        color="var(--mh-green)"
        dense
      >
        <v-btn class="px-5" active-class="btn-route" to="/events/live-events"
          >Live Events</v-btn
        >
        <v-btn class="px-5" active-class="btn-route" to="/events/competitions"
          >Competitions</v-btn
        >
      </v-btn-toggle> -->
      <router-view></router-view>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Events",
  computed: {
    navVisible() {
      return (
        this.$route.name == "LiveEvents" || this.$route.name == "Competitions"
      );
    },
  },
};
</script>

<style scoped>
.nav-btns {
  white-space: nowrap;
  overflow-x: auto;
}
.nav-btns >>> .v-btn__content {
  text-transform: capitalize;
}
.nav-btns::-webkit-scrollbar {
  display: none;
}
.v-btn--active >>> .v-btn__content {
  color: #5f772e;
}
</style>

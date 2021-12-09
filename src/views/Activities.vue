<template>
  <v-row>
    <v-col>
      <!-- Navbar -->
      <v-btn-toggle class="nav-btns" color="var(--mh-green)" dense>
        <v-btn class="px-5" active-class="btn-route" to="/activities/reminders"
          >Reminders</v-btn
        >
        <v-btn class="px-5" active-class="btn-route" to="/activities/videos"
          >Videos</v-btn
        >
        <v-btn
          class="px-5"
          active-class="btn-route"
          to="/activities/articles"
          >Articles</v-btn
        >
        <v-btn
          class="px-5"
          active-class="btn-route"
          to="/activities/podcasts"
          disabled
          >Podcasts</v-btn
        >
        <v-btn
          class="px-5"
          active-class="btn-route"
          to="/activities/blogs"
          disabled
          >Blogs</v-btn
        >
      </v-btn-toggle>
      <!-- Activities Content -->
      <router-view></router-view>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Activities",
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

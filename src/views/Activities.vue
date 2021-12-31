<template>
  <v-row>
    <v-col>
      <!-- Navbar -->
      <v-btn-toggle
        v-if="navVisible"
        class="nav-btns"
        color="var(--mh-green)"
        dense
      >
        <v-btn class="px-5" active-class="btn-route" to="/activities/reminders"
          >Reminders</v-btn
        >
        <v-btn class="px-5" active-class="btn-route" to="/activities/videos"
          >Videos</v-btn
        >
        <v-btn class="px-5" active-class="btn-route" to="/activities/articles"
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
      <v-chip-group
        v-if="$route.name == 'Videos' || $route.name == 'Articles'"
        v-model="selectedCategory"
        class="mt-2 mb-2 mb-sm-2 mt-sm-4 categories"
        mandatory
      >
        <v-chip
          v-for="(category, index) in categories"
          :key="index"
          color="primary"
          outlined
          filter
          >{{ category.title }}</v-chip
        >
      </v-chip-group>
      <!-- Activities Content -->
      <router-view
        v-if="mounted"
        :selectedCategory="selectedCategory"
      ></router-view>
    </v-col>
  </v-row>
</template>

<script>
import utilitiesMixin from "../mixins/utilities-mixin";
export default {
  name: "Activities",
  mixins: [utilitiesMixin],
  data() {
    return {
      mounted: false,
      selectedCategory: 0,
    };
  },
  computed: {
    navVisible() {
      return (
        this.$route.name == "Reminders" ||
        this.$route.name == "Articles" ||
        this.$route.name == "Videos"
      );
    },
  },
  mounted() {
    if (this.$route.query.category) {
      this.selectedCategory = this.categories.findIndex(
        (category) => this.$route.query.category == category.query
      );
    }
    this.mounted = true;
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
.categories {
  white-space: nowrap;
  overflow-x: auto;
}
</style>

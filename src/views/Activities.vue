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
        <!-- <v-btn class="px-5" active-class="btn-route" to="/activities/goals"
          >Goals</v-btn
        > -->
        <!-- <v-btn class="px-5" active-class="btn-route" to="/activities/reminders"
          >Reminders</v-btn
        > -->
        <!-- <v-btn class="px-5" active-class="btn-route" to="/activities/videos"
          >Videos</v-btn
        > -->
        <!-- <v-btn class="px-5" active-class="btn-route" to="/activities/articles"
          >Articles</v-btn
        > -->
      </v-btn-toggle>
      <!-- Category Selector -->
      <v-chip-group
        v-if="$route.name == 'Videos' || $route.name == 'Articles'"
        v-model="selectedCategory"
        class="mt-2 mt-sm-4 categories"
        mandatory
      >
        <v-chip class="mb-0" active-class="selected-category-chip" filter
          >All</v-chip
        >
        <v-chip
          v-for="(category, index) in filteredCategories"
          :key="index"
          class="mb-0"
          active-class="selected-category-chip"
          filter
          >{{ category.title
          }}<v-icon right small>{{ category.icon }}</v-icon></v-chip
        >
      </v-chip-group>
      <!-- Filter Selector -->
      <v-chip-group
        v-if="$route.name == 'Videos' || $route.name == 'Articles'"
        v-model="selectedFilter"
        class="filters"
        mandatory
      >
        <v-chip
          v-for="(filter, index) in filters"
          :key="index"
          class="mt-0"
          :active-class="chipColor"
          small
          filter
          >{{ filter.label }}</v-chip
        >
      </v-chip-group>
      <!-- Activities Content (Goals, Reminders, Videos, Articles, Podcasts) -->
      <router-view
        v-if="mounted"
        :selectedCategory="selectedCategory"
        :selectedFilter="selectedFilter"
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
      selectedFilter: 0,
    };
  },
  computed: {
    navVisible() {
      return (
        this.$route.name == "Goals" ||
        this.$route.name == "Reminders" ||
        this.$route.name == "Articles" ||
        this.$route.name == "Videos"
      );
    },
    chipColor() {
      return this.selectedFilter == 1 || this.selectedFilter == 2
        ? "beginner-filter-chip"
        : this.selectedFilter == 3 || this.selectedFilter == 4
        ? "intermediate-filter-chip"
        : this.selectedFilter == 5
        ? "advanced-filter-chip"
        : "default-filter-chip";
    },
  },
  mounted() {
    // Check for category query parameter in URL to set category
    if (this.$route.query.category) {
      this.selectedCategory = this.categories.findIndex(
        (category) => this.$route.query.category == category.query
      );
    }
    // Check for filter query parameter in URL to set filter
    if (this.$route.query.filter) {
      this.selectedFilter = this.filters.findIndex(
        (filter) => this.$route.query.filter == filter.query
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
.categories,
.filters {
  white-space: nowrap;
  overflow-x: auto;
}
.selected-category-chip {
  background-color: #2f53b6;
  color: white !important;
}
.default-filter-chip {
  background-color: #2f53b6;
  color: white !important;
}
.beginner-filter-chip {
  background-color: var(--mh-green);
  color: white !important;
}
.intermediate-filter-chip {
  background-color: var(--mh-orange);
  color: white !important;
}
.advanced-filter-chip {
  background-color: #ff5252;
  color: white !important;
}
</style>

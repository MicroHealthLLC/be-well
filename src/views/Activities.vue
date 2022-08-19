<template>
  <v-row class="">
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
      <!-- <div class="filterWrapper"  v-if="$route.name == 'Videos' || $route.name == 'Articles'">
        <label class="text-light mb-2">
          <b>FILTERS</b>
        </label>
        <br>
        <label class="text-light mt-2">
          Focus Area
        </label>
        <v-chip-group
        v-if="$route.name == 'Videos' || $route.name == 'Articles'"
        v-model="selectedCategory"
        class="categories mb-2"
        mandatory
        column
      >
      
         <v-chip class="mb-0" active-class="selected-category-chip" filter
          >All</v-chip
        > 
        <v-chip
          v-for="(category, index) in filteredCategories"
          :key="index"
          class="mb-0 categories"
          active-class="selected-category-chip"
          filter
          >{{ category.title
          }}<v-icon right small>{{ category.icon }}</v-icon></v-chip
        >
      </v-chip-group>
      Filter Selector 
    
       <label class="text-light mt-2">
        Fitness Level
      </label>
        <v-chip-group
        v-if="$route.name == 'Videos' || $route.name == 'Articles'"
        v-model="selectedFilter"
        class="filters"
        mandatory
        column
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
      </v-chip-group> -->

          <!-- <label class="text-light mt-2">
        My Favorites
      </label>
        <v-chip-group
        v-if="$route.name == 'Videos' || $route.name == 'Articles'"
        v-model="selectedFavFilter"
        class="filters"
        mandatory
        column
      >
        <v-chip
          v-for="(filter, index) in favFilters"
          :key="index"
          class="mt-0"

          small
          filter
          >{{ filter.label }}</v-chip
        >
      </v-chip-group> -->
      <!-- Activities Content (Goals, Reminders, Videos, Articles, Podcasts) -->
      <!-- </div> -->
   
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
      selectedFavFilter: 0,
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
    this.mounted = true;
    console.log(this.$route)
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
    /* if (this.$route.query.favFilters) {
      this.selectedFavFilter = this.favFilters.findIndex(
        (favFilters) => this.$route.query.favFilters == favFilters.query
      );
    } */
    
  },
};
</script>

<style scoped>
.text-light{
  color:whitesmoke;
}
.filterWrapper{
  background-color: rgba(0, 0, 0, .55)!important;
  position:absolute;
  right: 4%;
  top:4%;
  width: 20%;
  padding: 1rem; 
  height: auto; 
  border-radius: .35rem;
  margin-top: .25rem;
}
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
/* .v-slide-group__content{
  white-space: ;
} */
</style>

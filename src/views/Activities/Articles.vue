<template>
  <div class="mt-2 mb-2 mb-sm-2 mt-sm-4">
    <!-- Selected Articles -->
    <span class="text-h6 text-sm-h5"
      >{{ filters[selectedFilter].title }} {{ categoryTitle }} Articles</span
    >
    <v-divider class="mb-4"></v-divider>

    <div v-if="articles.length > 0" class="grid-container mb-6">
      <article-card
        v-for="(article, index) in articles"
        :key="index"
        :article="article"
      />
    </div>
    <div v-else class="d-flex flex-column justify-center align-center py-10">
      <div>
        <v-icon class="mr-2">mdi-file-document-outline</v-icon> No
        {{ filters[selectedFilter].title }}
        Articles...
      </div>
      <v-btn
        v-if="isEditor"
        to="/activities/articles/new"
        class="mt-5"
        color="primary"
        text
        >Add a New Article</v-btn
      >
    </div>
    <v-btn
      v-if="isEditor"
      to="/activities/articles/new"
      class="floating-btn"
      color="var(--mh-blue)"
      fab
      large
      dark
      ><v-icon large>mdi-plus</v-icon></v-btn
    >
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ArticleCard from "../../components/ArticleCard.vue";
import utilitiesMixin from "../../mixins/utilities-mixin";

export default {
  name: "Articles",
  props: ["selectedCategory", "selectedFilter"],
  mixins: [utilitiesMixin],
  components: { ArticleCard },
  computed: {
    ...mapGetters(["articles", "isEditor"]),
    categoryTitle() {
      return this.categories[this.selectedCategory].title;
    },
    isLevel() {
      let filter = this.filters[this.selectedFilter].value;
      return (
        filter == "BEGINNER" || filter == "INTERMEDIATE" || filter == "ADVANCED"
      );
    },
  },
  methods: {
    ...mapActions(["fetchArticles", "fetchFavoriteArticles"]),
  },
  mounted() {
    let category = this.categories[this.selectedCategory].value;
    let filter = this.filters[this.selectedFilter].value;

    if (this.isLevel) {
      this.fetchArticles({
        filter: { category: { eq: category }, level: { eq: filter } },
      });
    } else {
      this.fetchFavoriteArticles(category);
    }
  },
  watch: {
    selectedCategory() {
      let categoryQuery = this.categories[this.selectedCategory].query;
      let category = this.categories[this.selectedCategory].value;
      let filter = this.filters[this.selectedFilter].value;
      // Update query params
      if (this.$route.query.category != categoryQuery) {
        this.$router.replace({
          name: "Articles",
          query: {
            category: this.categories[this.selectedCategory].query,
            filter: this.filters[this.selectedFilter].query,
          },
        });
      }
      // Fetch Articles by selected filter
      if (this.isLevel) {
        this.fetchArticles({
          filter: { category: { eq: category }, level: { eq: filter } },
        });
      } else {
        this.fetchFavoriteArticles(category);
      }
    },
    selectedFilter() {
      let filterQuery = this.filters[this.selectedFilter].query;
      let category = this.categories[this.selectedCategory].value;
      let filter = this.filters[this.selectedFilter].value;
      // Update query params
      if (this.$route.query.filter != filterQuery) {
        this.$router.replace({
          name: "Articles",
          query: {
            category: this.categories[this.selectedCategory].query,
            filter: this.filters[this.selectedFilter].query,
          },
        });
      }
      // Fetch Articles by selected filter
      if (this.isLevel) {
        this.fetchArticles({
          filter: { category: { eq: category }, level: { eq: filter } },
        });
      } else {
        this.fetchFavoriteArticles(category);
      }
    },
  },
};
</script>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}
.floating-btn {
  bottom: 0;
  right: 0;
  position: fixed;
  margin-right: 7vw;
  margin-bottom: 7vh;
}
</style>

<template>
  <div class="mt-2 mb-2 mb-sm-2 mt-sm-4">
    <!-- Selected Articles -->
    <span class="text-h6 text-sm-h5"
      >{{ filters[selectedFilter].title }} {{ categoryTitle }} Articles</span
    >
    <v-divider class="mb-4"></v-divider>

    <div v-if="articles.length > 0" class="grid-container mb-6">
      <article-card
        v-for="(article, index) in pageArticles"
        :key="index"
        :article="article"
      />
      <div class="grid-full-width">
        <v-pagination
          v-model="page"
          @input="fetchSelectedPage"
          :length="totalPages"
          color="#2f53b6"
        ></v-pagination>
      </div>
    </div>
    <div v-else class="d-flex flex-column justify-center align-center py-10">
      <div v-if="selectedFilter != 0">
        <v-icon class="mr-2">mdi-file-document-outline</v-icon> No
        {{ filters[selectedFilter].title }}
        Articles...
      </div>
      <div v-else>
        <v-icon class="mr-2">mdi-file-document-outline</v-icon> No Articles...
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
  data() {
    return {
      page: 1,
      start: 0,
      pageArticles: [],
    };
  },
  computed: {
    ...mapGetters(["articles", "isEditor"]),
    categoryTitle() {
      return this.categories[this.selectedCategory].title;
    },
    isLevel() {
      let filter = this.filters[this.selectedFilter].value;
      return (
        filter == "L1" ||
        filter == "L2" ||
        filter == "L3" ||
        filter == "L4" ||
        filter == "L5"
      );
    },
    totalPages() {
      return Math.ceil(this.articles.length / 12);
    },
  },
  methods: {
    ...mapActions(["fetchArticles", "fetchFavoriteArticles"]),
    fetchSelectedPage(page) {
      this.page = page;
      this.start = (page - 1) * 12;
      this.pageArticles = this.articles.slice(this.start, this.start + 12);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
  async mounted() {
    let category = this.categories[this.selectedCategory].value;
    let filter = this.filters[this.selectedFilter].value;

    if (category == "ALL" && filter == "ALL") {
      await this.fetchArticles();
    } else if (category != "ALL" && filter == "ALL") {
      await this.fetchArticles({
        filter: { category: { eq: category } },
      });
    } else if (category == "ALL" && this.isLevel) {
      await this.fetchArticles({
        filter: { level: { eq: filter } },
      });
    } else if (category != "ALL" && this.isLevel) {
      await this.fetchArticles({
        filter: { category: { eq: category }, level: { eq: filter } },
      });
    } else {
      await this.fetchFavoriteArticles(category);
    }
  },
  watch: {
    articles() {
      this.pageArticles = this.articles.slice(this.start, this.start + 12);
    },
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
      if (category == "ALL" && filter == "ALL") {
        this.fetchArticles();
      } else if (category != "ALL" && filter == "ALL") {
        this.fetchArticles({
          filter: { category: { eq: category } },
        });
      } else if (category == "ALL" && this.isLevel) {
        this.fetchArticles({
          filter: { level: { eq: filter } },
        });
      } else if (category != "ALL" && this.isLevel) {
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
      if (category == "ALL" && filter == "ALL") {
        this.fetchArticles();
      } else if (category != "ALL" && filter == "ALL") {
        this.fetchArticles({
          filter: { category: { eq: category } },
        });
      } else if (category == "ALL" && this.isLevel) {
        this.fetchArticles({
          filter: { level: { eq: filter } },
        });
      } else if (category != "ALL" && this.isLevel) {
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
.grid-full-width {
  grid-column: 1/-1;
}
.floating-btn {
  bottom: 0;
  right: 0;
  position: fixed;
  margin-right: 7vw;
  margin-bottom: 7vh;
}
</style>

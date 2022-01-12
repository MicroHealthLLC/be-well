<template>
  <div class="mt-2 mb-2 mb-sm-2 mt-sm-4">
    <!-- Beginner Articles -->
    <span class="text-h6 text-sm-h5"
      >{{ levels[selectedLevel].title }} {{ categoryTitle }} Articles</span
    >
    <v-divider class="mb-4"></v-divider>

    <div v-if="articles.length > 0" class="grid-container mb-6">
      <article-card
        v-for="(article, index) in articles"
        :key="index"
        :article="article"
      />
    </div>
    <div v-else class="d-flex justify-center align-center py-10">
      <v-icon class="mr-2">mdi-file-document-outline</v-icon> No
      {{ levels[selectedLevel].title }}
      Articles...
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
  props: ["selectedCategory", "selectedLevel"],
  mixins: [utilitiesMixin],
  components: { ArticleCard },
  computed: {
    ...mapGetters(["articles", "isEditor"]),
    categoryTitle() {
      return this.categories[this.selectedCategory].title;
    },
  },
  methods: {
    ...mapActions(["fetchArticles"]),
  },
  mounted() {
    let category = this.categories[this.selectedCategory].value;
    let level = this.levels[this.selectedLevel].value;

    this.fetchArticles({
      filter: { category: { eq: category }, level: { eq: level } },
    });
  },
  watch: {
    selectedCategory() {
      let categoryQuery = this.categories[this.selectedCategory].query;
      let category = this.categories[this.selectedCategory].value;
      let level = this.levels[this.selectedLevel].value;

      if (this.$route.query.category != categoryQuery) {
        this.$router.replace({
          name: "Articles",
          query: {
            category: this.categories[this.selectedCategory].query,
            level: this.levels[this.selectedLevel].query,
          },
        });

        this.fetchArticles({
          filter: { category: { eq: category }, level: { eq: level } },
        });
      }
    },
    selectedLevel() {
      let categoryQuery = this.levels[this.selectedLevel].query;
      let category = this.categories[this.selectedCategory].value;
      let level = this.levels[this.selectedLevel].value;

      if (this.$route.query.category != categoryQuery) {
        this.$router.replace({
          name: "Articles",
          query: {
            category: this.categories[this.selectedCategory].query,
            level: this.levels[this.selectedLevel].query,
          },
        });

        this.fetchArticles({
          filter: { category: { eq: category }, level: { eq: level } },
        });
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

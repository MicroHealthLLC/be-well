<template>
  <div class="mt-2 mb-2 mb-sm-2 mt-sm-4">
    <!-- Beginner Articles -->
    <div class="d-flex justify-space-between">
      <span class="text-h6 text-sm-h5"
        >Beginner {{ categoryTitle }} Articles</span
      >
      <v-btn to="/activities/articles/new" color="var(--mh-blue)" small dark
        >Add Article <v-icon small right>mdi-plus</v-icon></v-btn
      >
    </div>

    <v-divider class="mb-4"></v-divider>

    <div v-if="beginnerArticles.length > 0" class="grid-container mb-6">
      <article-card
        v-for="(article, index) in beginnerArticles"
        :key="index"
        :article="article"
      />
    </div>
    <div v-else class="d-flex justify-center align-center py-10">
      <v-icon class="mr-2">mdi-file-document-outline</v-icon> No Beginner
      Articles...
    </div>

    <!-- Intermediate Articles -->
    <div class="d-flex justify-space-between">
      <span class="text-h6 text-sm-h5"
        >Intermediate {{ categoryTitle }} Articles</span
      >
      <v-btn to="/activities/articles/new" color="var(--mh-blue)" small dark
        >Add Article <v-icon small right>mdi-plus</v-icon></v-btn
      >
    </div>

    <v-divider class="mb-4"></v-divider>

    <div v-if="intermediateArticles.length > 0" class="grid-container mb-6">
      <article-card
        v-for="(article, index) in intermediateArticles"
        :key="index"
        :article="article"
      />
    </div>
    <div v-else class="d-flex justify-center align-center py-10">
      <v-icon class="mr-2">mdi-file-document-outline</v-icon> No Intermediate
      Articles...
    </div>

    <!-- Advanced Articles -->
    <div class="d-flex justify-space-between">
      <span class="text-h6 text-sm-h5"
        >Advanced {{ categoryTitle }} Articles</span
      >
      <v-btn to="/activities/articles/new" color="var(--mh-blue)" small dark
        >Add Article <v-icon small right>mdi-plus</v-icon></v-btn
      >
    </div>

    <v-divider class="mb-4"></v-divider>

    <div v-if="advancedArticles.length > 0" class="grid-container mb-6">
      <article-card
        v-for="(article, index) in advancedArticles"
        :key="index"
        :article="article"
      />
    </div>
    <div v-else class="d-flex justify-center align-center py-10">
      <v-icon class="mr-2">mdi-file-document-outline</v-icon> No Advanced
      Articles...
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ArticleCard from "../../components/ArticleCard.vue";
export default {
  name: "Articles",
  props: ["selectedCategory"],
  components: { ArticleCard },
  data() {
    return {
      categories: [
        {
          title: "Endurance",
          query: "endurance",
          key: "ENDURANCE",
        },
        {
          title: "Ergonomics",
          query: "ergonomics",
          key: "ERGONOMICS",
        },
        {
          title: "Meditation",
          query: "meditation",
          key: "MEDITATION",
        },
        {
          title: "Muscle Tone/Movement",
          query: "muscle-tone-movement",
          key: "MUSCLE",
        },
        {
          title: "Posture",
          query: "posture",
          key: "POSTURE",
        },
        {
          title: "Stress Relief",
          query: "stress-relief",
          key: "STRESS_RELIEF",
        },
        {
          title: "Stretching",
          query: "stretching",
          key: "STRETCHING",
        },
        {
          title: "Yoga",
          query: "yoga",
          key: "YOGA",
        },
      ],
    };
  },
  computed: {
    ...mapGetters([
      "advancedArticles",
      "beginnerArticles",
      "intermediateArticles",
    ]),
    categoryTitle() {
      return this.categories[this.selectedCategory].title;
    },
  },
  methods: {
    ...mapActions(["fetchCategoryArticles"]),
  },
  mounted() {
    this.fetchCategoryArticles(this.categories[this.selectedCategory].key);
  },
  watch: {
    selectedCategory() {
      let categoryQuery = this.categories[this.selectedCategory].query;

      if (this.$route.query.category != categoryQuery) {
        this.$router.replace({
          name: "Articles",
          query: { category: this.categories[this.selectedCategory].query },
        });

        this.fetchCategoryArticles(this.categories[this.selectedCategory].key);
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
</style>

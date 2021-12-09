<template>
  <div class="mt-2 mb-2 mb-sm-2 mt-sm-4">
    <span class="text-h6 text-sm-h5">Articles</span>
    <v-divider class="mb-4"></v-divider>

    <div class="grid-container mb-6">
      <article-card
        v-for="(article, index) in articles"
        :key="index"
        :article="article"
      />
    </div>

    <v-btn to="/activities/articles/new">Add Article</v-btn>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ArticleCard from "../../components/ArticleCard.vue";
export default {
  components: { ArticleCard },
  name: "Articles",
  computed: {
    ...mapGetters(["articles"]),
  },
  methods: {
    ...mapActions(["fetchArticles"]),
  },
  mounted() {
    this.fetchArticles();
  },
};
</script>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}
</style>

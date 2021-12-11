<template>
  <div>
    <div class="d-flex justify-end mb-2 align-center">
      <v-btn
        to="/activities/articles"
        exact-path
        color="#2f53b6"
        dark
        outlined
        small
        ><v-icon>mdi-arrow-left</v-icon>Articles</v-btn
      >
      <v-btn
        v-if="isEditor"
        :to="`/activities/articles/edit/${this.article.id}`"
        class="ml-2"
        outlined
        small
        ><v-icon left small>mdi-pencil</v-icon>Edit</v-btn
      >
    </div>
    <v-card class="pa-sm-10" flat color="#f0f3f7">
      <v-card-title class="text-h4 break-word">{{ article.title }}</v-card-title>
      <v-card-subtitle class="d-flex flex-column"
        ><div>By {{ article.author }}</div>
        <div class="mt-2">
          <v-chip class="mr-2" color="primary" small outlined
            ><v-icon left small>{{ categoryIcon(article.category) }}</v-icon>
            {{ categoryString(article.category) }}</v-chip
          >
          <v-chip color="primary" small outlined>{{
            formatDate(article.createdAt)
          }}</v-chip>
        </div></v-card-subtitle
      >
      <v-divider class="mx-5 pa-0" color="#9ec64c"></v-divider>
      <v-card-text
        ><div class="keep-white-space">{{ article.body }}</div></v-card-text
      >
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Article",
  data() {
    return {
      categoryIcons: {
        ENDURANCE: "mdi-run",
        ERGONOMICS: "mdi-seat-recline-extra",
        MEDITATION: "mdi-meditation",
        MUSCLE: "mdi-weight-lifter",
        POSTURE: "mdi-human-male",
        STRESS_RELIEF: "mdi-head-heart",
        STRETCHING: "mdi-human",
        YOGA: "mdi-yoga",
      },
      categories: {
        ENDURANCE: "Endurance",
        ERGONOMICS: "Ergonomics",
        MEDITATION: "Meditation",
        MUSCLE: "Muscle Tone/Movement",
        POSTURE: "Posture",
        STRESS_RELIEF: "Stress Relief",
        STRETCHING: "Stretching",
        YOGA: "Yoga",
      },
    };
  },
  computed: {
    ...mapGetters(["article", "isEditor"]),
  },
  methods: {
    ...mapActions(["fetchArticle"]),
    formatDate(date) {
      return new Date(date).toDateString();
    },
    categoryIcon(category) {
      return this.categoryIcons[category] || "";
    },
    categoryString(category) {
      return this.categories[category] || "";
    },
  },
  mounted() {
    this.fetchArticle(this.$route.params.articleId);
  },
};
</script>

<style scoped>
.keep-white-space {
  white-space: break-spaces;
}
.break-word {
  word-break: break-word;
}
</style>

<template>
  <v-card class="article-card" elevation="5">
    <v-card-title class="article-title text-body-1 font-weight-bold">
      <div class="clamp-two-lines">{{ article.title }}</div>
    </v-card-title>
    <v-card-subtitle class="d-flex flex-column"
      ><div>{{ article.author }}</div>
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
    <v-card-text
      ><div class="clamp-three-lines">{{ article.body }}</div></v-card-text
    >
    <v-card-actions class="align-end">
      <v-btn color="primary" text>Read Article</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
    },
  },
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
  methods: {
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
};
</script>

<style scoped>
.clamp-two-lines {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.clamp-three-lines {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.article-title {
  min-height: 80px;
  align-content: flex-start;
  word-break: break-word;
}
.article-card {
  border-left: 7.5px solid var(--mh-green);
}
</style>

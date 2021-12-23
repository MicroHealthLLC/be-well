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

    <ArticleLoader v-if="loading" />

    <v-card v-else class="pa-sm-10" flat color="#f0f3f7">
      <v-chip :color="levelColor" class="category-chip ml-4" x-small label>{{
        article.level
      }}</v-chip>
      <v-card-title class="text-h4 break-word">{{
        article.title
      }}</v-card-title>
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
      <div v-if="article.imageURL" class="mb-5">
        <v-divider class="mx-5 mb-5 pa-0" color="#9ec64c"></v-divider>
        <v-img
          :src="article.imageURL"
          class="header-image mx-5 fill-width"
        ></v-img
        ><span class="text-caption px-5">Photo By {{ article.imageCredit }}</span>
      </div>

      <v-divider class="mx-5 pa-0" color="#9ec64c"></v-divider>

      <v-card-text
        ><div v-html="article.body" class="article-body"></div
      ></v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ArticleLoader from "../../components/ArticleLoader.vue";
export default {
  components: { ArticleLoader },
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
    ...mapGetters(["article", "isEditor", "loading"]),
    levelColor() {
      return this.article.level == "BEGINNER"
        ? "var(--mh-green)"
        : this.article.level == "INTERMEDIATE"
        ? "var(--mh-orange)"
        : "error";
    },
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
.category-chip {
  color: white;
  position: relative;
  top: 15px;
}
.article-body ::selection {
  background-color: var(--mh-orange);
}
.article-body >>> h1 {
  color: #000000de;
  font-size: 2rem !important;
  font-weight: 400;
  line-height: 2.5rem;
  letter-spacing: 0.0073529412em !important;
  font-family: "Roboto", sans-serif !important;
  margin: 10px 0 20px;
}
.article-body >>> h2 {
  color: #000000de;
  font-size: 1.5rem !important;
  font-weight: 500;
  letter-spacing: normal;
  font-family: "Roboto", sans-serif !important;
  margin: 10px 0 20px;
}
.article-body >>> h3 {
  color: #000000de;
  font-size: 1.25rem !important;
  font-weight: 500;
  letter-spacing: 0.0125em !important;
  font-family: "Roboto", sans-serif !important;
  margin: 10px 0 20px;
}
.article-body >>> p {
  color: #000000de;
  font-size: 16px;
}
::v-deep .article-body ul p,
::v-deep .article-body ol p {
  margin: 0 !important;
}
::v-deep .article-body ul,
::v-deep .article-body ol {
  margin-left: 25px !important;
}
.article-body >>> ul,
.article-body >>> ol {
  margin-bottom: 16px;
}
.article-body >>> blockquote {
  border-left: 0.25em solid var(--mh-green);
  padding-left: 1em;
  margin: 20px 0 !important;
}
.article-body >>> blockquote * {
  color: #6a737d;
}
.article-body >>> p img {
  width: 100%;
}
</style>

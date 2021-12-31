<template>
  <v-card class="d-flex flex-column" :class="leftBorder" elevation="5">
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
      ><div class="clamp-three-lines">
        {{ strippedArticleBody }}
      </div></v-card-text
    >
    <v-card-actions class="fill-height align-end">
      <v-btn
        :to="`/activities/articles/view/${article.id}`"
        color="primary"
        text
        >Read Article</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
import utilitiesMixin from "../mixins/utilities-mixin";

export default {
  name: "ArticleCard",
  mixins: [utilitiesMixin],
  props: {
    article: {
      type: Object,
    },
  },
  methods: {
    formatDate(date) {
      return new Date(date).toDateString();
    },
  },
  computed: {
    leftBorder() {
      return {
        "beginner-card": this.article.level == "BEGINNER",
        "intermediate-card": this.article.level == "INTERMEDIATE",
        "advanced-card": this.article.level == "ADVANCED",
        "default-card": this.article.level == "NOT_APPLICABLE",
      };
    },
    strippedArticleBody() {
      if (this.article.body.indexOf("<p>") !== -1) {
        return this.article.body
          .substring(
            this.article.body.indexOf("<p>") + 3,
            this.article.body.lastIndexOf("</p>")
          )
          .replace(/<(.|\n)*?>/g, "");
      } else {
        return "No preview available...";
      }
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
.beginner-card {
  border-left: 7.5px solid var(--mh-green);
}
.intermediate-card {
  border-left: 7.5px solid var(--mh-orange);
}
.advanced-card {
  border-left: 7.5px solid #ff5252;
}
.default-card {
  border-left: 7.5px solid lightslategray;
}
</style>

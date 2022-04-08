<template>
  <div class="d-flex justify-center flex-column mx-auto article-container">
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

    <v-card v-else class="px-0" flat color="#f0f3f7">
      <v-chip :color="levelColor" class="category-chip" x-small label>{{
        levelTitle(article.level).toUpperCase()
      }}</v-chip>
      <v-card-title class="px-0 text-h4 break-word">{{
        article.title
      }}</v-card-title>
      <v-card-subtitle class="d-flex flex-column px-0 pb-0"
        ><div>By {{ article.author }}</div>
        <div class="d-flex justify-space-between mt-2">
          <div>
            <v-chip class="mr-2" color="primary" small outlined
              ><v-icon left small>{{ categoryIcon(article.category) }}</v-icon>
              {{ categoryString(article.category) }}</v-chip
            >
            <v-chip color="primary" small outlined>{{
              fullDate(article.createdAt)
            }}</v-chip>
          </div>
          <div>
            <v-btn
              v-if="favoriteReference"
              @click="removeFavorite"
              color="var(--mh-orange)"
              icon
              ><v-icon>mdi-star</v-icon></v-btn
            >
            <v-btn v-else @click="addFavorite" icon
              ><v-icon>mdi-star-outline</v-icon></v-btn
            >
          </div>
        </div></v-card-subtitle
      >
      <div v-if="article.imageURL" class="px-0 mb-5">
        <v-divider class="mx-0 mb-5 pa-0" color="#9ec64c"></v-divider>
        <v-img
          lazy-src="/img/placeholder.png"
          :src="article.imageURL"
          class="header-image mx-0 fill-width"
          max-height="600"
          ><template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular
                size="50"
                width="5"
                indeterminate
                color="var(--mh-orange)"
              ></v-progress-circular>
            </v-row> </template></v-img
        ><span class="text-caption px-0"
          >Photo By {{ article.imageCredit }}</span
        >
      </div>

      <v-divider class="mx-0 pa-0" color="#9ec64c"></v-divider>

      <v-card-text class="px-0"
        ><div v-html="article.body" class="article-body"></div
      ></v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ArticleLoader from "../../components/ArticleLoader.vue";
import dateMixin from "../../mixins/date-mixin";
import utilitiesMixin from "../../mixins/utilities-mixin";

export default {
  components: { ArticleLoader },
  name: "Article",
  mixins: [dateMixin, utilitiesMixin],
  computed: {
    ...mapGetters(["article", "favoriteArticles", "isEditor", "loading"]),
    levelColor() {
      return this.article.level == "L1" || this.article.level == "L2"
        ? "var(--mh-green)"
        : this.article.level == "L3" || this.article.level == "L4"
        ? "var(--mh-orange)"
        : "error";
    },
    favoriteReference() {
      return this.favoriteArticles.find(
        (article) => article.articleId == this.article.id
      );
    },
  },
  methods: {
    ...mapActions([
      "addFavoriteArticle",
      "deleteFavoriteArticle",
      "fetchAllFavoriteArticles",
      "fetchArticle",
    ]),
    addFavorite() {
      let favoriteArticle = {
        articleId: this.article.id,
        category: this.article.category,
        level: this.article.level,
      };

      this.addFavoriteArticle(favoriteArticle);
    },
    removeFavorite() {
      this.deleteFavoriteArticle(this.favoriteReference.id);
    },
  },
  mounted() {
    this.fetchArticle(this.$route.params.articleId);
    this.fetchAllFavoriteArticles(this.article.category);
  },
};
</script>

<style scoped>
.article-container {
  max-width: 1100px;
}
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
  line-height: 1.75;
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

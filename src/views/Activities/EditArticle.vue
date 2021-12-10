<template>
  <v-row>
    <v-col>
      <div class="d-flex justify-space-between mb-2">
        <div class="text-h6 text-sm-h5">Edit Article</div>
        <v-btn
          class="my-5 my-sm-0"
          to="/activities/articles"
          exact-path
          color="#2f53b6"
          dark
          outlined
          small
          ><v-icon>mdi-arrow-left</v-icon>Articles</v-btn
        >
      </div>
      <v-divider class="mb-4"></v-divider>
      <ArticleForm />
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ArticleForm from "../../components/ArticleForm.vue";
export default {
  name: "EditArticle",
  components: {
    ArticleForm,
  },
  data() {
    return {
      //
    };
  },
  computed: {
    ...mapGetters(["article"]),
  },
  methods: {
    ...mapActions(["fetchArticle"]),
  },
  mounted() {
    this.fetchArticle(this.$route.params.articleId);
  },
};
</script>

<style scoped></style>

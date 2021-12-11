<template>
  <v-row>
    <v-col>
      <div class="d-flex justify-space-between mb-2 align-center">
        <div class="text-h6 text-sm-h5">New Article</div>
        <v-btn
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
import { mapGetters, mapMutations } from "vuex";
import ArticleForm from "../../components/ArticleForm.vue";
export default {
  name: "NewArticle",
  components: {
    ArticleForm,
  },
  data() {
    return {
      //
    };
  },
  computed: {
    ...mapGetters(["article", "user"]),
  },
  methods: {
    ...mapMutations(["SET_ARTICLE"]),
  },
  mounted() {
    this.SET_ARTICLE({
      title: "",
      author: `${this.user.attributes.given_name} ${this.user.attributes.family_name}`,
      category: "",
      level: "BEGINNER",
      body: "",
    });
  },
  watch: {
    article() {
      if (this.article.id) {
        this.$router.push(`/activities/articles/edit/${this.article.id}`);
      }
    },
  },
};
</script>

<style scoped></style>

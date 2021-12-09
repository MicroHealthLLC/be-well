<template>
  <v-row>
    <v-col>
      <v-form>
        <v-text-field v-model="title" label="Title"></v-text-field>
        <v-text-field v-model="author" label="Author"></v-text-field>
        <v-select
          v-model="category"
          :items="categories"
          item-text="name"
          item-value="value"
          label="Category"
          :rules="[(v) => !!v || 'Category is required']"
          required
        ></v-select>
        <v-textarea v-model="body" label="Body"></v-textarea>
      </v-form>
      <v-btn @click="addNewArticle">Submit</v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      title: "",
      body: "",
      category: "",
      author: "",
      categories: [
        {
          name: "Endurance",
          value: "ENDURANCE",
        },
        {
          name: "Ergonomics",
          value: "ERGONOMICS",
        },
        {
          name: "Meditation",
          value: "MEDITATION",
        },
        {
          name: "Muscle Tone/Movement",
          value: "MUSCLE",
        },
        {
          name: "Posture",
          value: "POSTURE",
        },
        {
          name: "Stress Relief",
          value: "STRESS_RELIEF",
        },
        {
          name: "Stretching",
          value: "STRETCHING",
        },
        {
          name: "Yoga",
          value: "YOGA",
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["articles", "user"]),
  },
  methods: {
    ...mapActions(["addArticle", "fetchArticles"]),
    async addNewArticle() {
      await this.addArticle({
        title: this.title,
        body: this.body,
        category: this.category,
        author: this.author,
      });
    },
  },
  mounted() {
    this.author = `${this.user.attributes.given_name} ${this.user.attributes.family_name}`;
    this.fetchArticles();
  },
};
</script>

<style scoped>
.keep-white-space {
  white-space: pre;
}
</style>

<template>
  <v-card class="pa-sm-10">
    <v-card-text>
      <v-form>
        <div class="grid">
          <v-text-field
            v-model="article.title"
            class="title"
            label="Title"
          ></v-text-field>
          <v-text-field v-model="createdBy" label="Author"></v-text-field>
          <v-text-field
            v-model="lastEditedBy"
            label="Last Edited By"
          ></v-text-field>
          <v-select
            v-model="article.category"
            :items="categories"
            item-text="name"
            item-value="value"
            label="Category"
            :rules="[(v) => !!v || 'Category is required']"
            required
          ></v-select>
          <v-select
            v-model="article.level"
            label="Level"
            :items="levels"
            item-text="name"
            item-value="value"
          ></v-select>
          <v-textarea
            v-model="article.body"
            class="body"
            label="Body"
            outlined
            auto-grow
            filled
          ></v-textarea>
        </div>
      </v-form>
    </v-card-text>
    <v-card-actions class="justify-end">
      <v-btn v-if="isEditing" @click="removeArticle" color="error" outlined
        >Delete</v-btn
      >
      <v-btn
        v-if="!isEditing"
        @click="addNewArticle"
        class="px-5"
        color="#2f53b6"
        dark
        >Add Article</v-btn
      >
      <v-btn v-else @click="update" class="px-5" color="#2f53b6" dark
        >Update Article</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      levels: [
        {
          name: "Beginner",
          value: "BEGINNER",
        },
        {
          name: "Intermediate",
          value: "INTERMEDIATE",
        },
        {
          name: "Advanced",
          value: "ADVANCED",
        },
      ],
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
    ...mapGetters(["article", "articles", "user"]),
    isEditing() {
      return this.article.id;
    },
    createdBy() {
      if (this.isEditing) {
        return `${this.article.author} at ${new Date(
          this.article.createdAt
        ).toLocaleString()}`;
      } else {
        return this.article.author;
      }
    },
    lastEditedBy() {
      if (this.isEditing) {
        return `${this.article.lastEditedBy} at ${new Date(
          this.article.updatedAt
        ).toLocaleString()}`;
      } else {
        return this.article.lastEditedBy;
      }
    },
  },
  methods: {
    ...mapActions(["addArticle", "deleteArticle", "updateArticle"]),
    async addNewArticle() {
      try {
        await this.addArticle({
          title: this.article.title,
          body: this.article.body,
          category: this.article.category,
          level: this.article.level.toUpperCase(),
          author: this.article.author,
          lastEditedBy: this.article.author,
        });
      } catch (error) {
        console.log(error);
      }
    },
    async update() {
      await this.updateArticle({
        id: this.article.id,
        title: this.article.title,
        body: this.article.body,
        category: this.article.category,
        level: this.article.level.toUpperCase(),
        lastEditedBy: `${this.user.attributes.given_name} ${this.user.attributes.family_name}`,
      });
    },
    async removeArticle() {
      await this.deleteArticle(this.article.id);
      this.$router.push("/activities/articles");
    },
  },
};
</script>

<style scoped>
.keep-white-space {
  white-space: pre;
}
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 1rem;
}
.title,
.body {
  grid-column: 1 / span 2;
}
</style>

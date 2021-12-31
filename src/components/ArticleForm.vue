<template>
  <v-card class="pa-sm-10">
    <v-card-text>
      <v-form ref="articleform" v-model="formValid">
        <div class="grid">
          <v-text-field
            v-model="article.title"
            class="title"
            label="Title"
            :rules="[(v) => !!v || 'Title is required']"
            required
          ></v-text-field>
          <v-text-field
            v-model="createdBy"
            label="Author"
            readonly
          ></v-text-field>
          <v-text-field
            v-model="lastEditedBy"
            label="Last Edited By"
            readonly
          ></v-text-field>
          <v-select
            v-model="article.category"
            :items="categories"
            item-text="title"
            item-value="value"
            label="Category"
            :rules="[(v) => !!v || 'Category is required']"
            required
          ></v-select>
          <v-select
            v-model="article.level"
            label="Level"
            :items="levels"
            item-text="title"
            item-value="value"
            :rules="[(v) => !!v || 'Level is required']"
            required
          ></v-select>
          <v-file-input
            v-if="newImage"
            v-model="article.image"
            @change="uploadImage"
            @click:clear="removeImage"
            label="Header Photo"
            accept="image/*"
            prepend-icon="mdi-camera"
          ></v-file-input>
          <v-text-field
            v-else
            @click:clear="removeImage"
            v-model="article.image"
            label="Header Photo"
            prepend-icon="mdi-camera"
            clearable
          ></v-text-field>
          <v-text-field
            v-model="article.imageCredit"
            label="Photo By"
            :disabled="!article.image"
          ></v-text-field>
          <!-- Header Image -->
          <v-img
            v-if="article.imageURL"
            :src="article.imageURL"
            class="header-image mb-5"
          ></v-img>
          <!-- Rich text editor -->
          <TiptapEditor class="body" />
        </div>
      </v-form>
    </v-card-text>
    <v-card-actions class="justify-end">
      <v-btn
        v-if="isEditing"
        @click="deleteDialog = true"
        color="secondary"
        outlined
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
    <v-dialog v-model="deleteDialog">
      <v-card>
        <v-card-title>Delete Article?</v-card-title>
        <v-card-text
          >Are you sure you want to delete <strong>{{ article.title }}</strong
          >?</v-card-text
        >
        <v-card-actions class="justify-end">
          <v-btn @click="deleteDialog = false" color="secondary" small outlined
            >Cancel</v-btn
          >
          <v-btn
            @click="removeArticle"
            class="px-5"
            color="var(--mh-blue)"
            small
            dark
            >Delete</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import utilitiesMixin from "../mixins/utilities-mixin";
import TiptapEditor from "./TitptapEditor.vue";

export default {
  name: "ArticleForm",
  components: {
    TiptapEditor,
  },
  mixins: [utilitiesMixin],
  data() {
    return {
      deleteDialog: false,
      formValid: true,
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
    newImage() {
      let imageType = typeof this.article.image;

      return !this.article.image || !this.article.id || imageType != "string";
    },
  },
  methods: {
    ...mapActions(["addArticle", "deleteArticle", "updateArticle"]),
    async addNewArticle() {
      if (!this.$refs.articleform.validate()) {
        return;
      }

      try {
        await this.addArticle({
          title: this.article.title,
          body: this.article.body,
          category: this.article.category,
          level: this.article.level.toUpperCase(),
          author: this.article.author,
          lastEditedBy: this.article.author,
          image: this.article.image,
          imageCredit: this.article.imageCredit,
        });
      } catch (error) {
        console.log(error);
      }
    },
    async update() {
      if (!this.$refs.articleform.validate()) {
        return;
      }

      await this.updateArticle({
        id: this.article.id,
        title: this.article.title,
        body: this.article.body,
        category: this.article.category,
        level: this.article.level.toUpperCase(),
        lastEditedBy: `${this.user.attributes.given_name} ${this.user.attributes.family_name}`,
        image: this.article.image,
        imageCredit: this.article.imageCredit,
      });
    },
    async removeArticle() {
      await this.deleteArticle(this.article.id);
      this.deleteDialog = false;
      this.$router.push("/activities/articles");
    },
    uploadImage(e) {
      if (e) {
        const file = e;
        this.article.imageURL = URL.createObjectURL(file);
      }
    },
    removeImage() {
      this.article.imageURL = null;
      this.article.imageCredit = "";
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
.body,
.header-image {
  grid-column: 1 / span 2;
}
</style>

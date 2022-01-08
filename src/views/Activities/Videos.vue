<template>
  <div class="mt-2 mb-2 mb-sm-2 mt-sm-4">
    <!-- Beginner Videos -->
    <span class="text-h6 text-sm-h5">Beginner {{ categoryTitle }} Videos</span>
    <v-divider class="mb-4"></v-divider>

    <div class="grid-container mb-6">
      <video-card
        v-for="(video, index) in beginnerVideos"
        :key="index"
        :video="video"
      />
    </div>

    <!-- Intermediate Videos -->
    <span class="text-h6 text-sm-h5"
      >Intermediate {{ categoryTitle }} Videos</span
    >
    <v-divider class="mb-4"></v-divider>

    <div class="grid-container mb-6">
      <video-card
        v-for="(video, index) in intermediateVideos"
        :key="index"
        :video="video"
      />
    </div>

    <!-- Advanced Videos -->
    <span class="text-h6 text-sm-h5">Advanced {{ categoryTitle }} Videos</span>
    <v-divider class="mb-4"></v-divider>

    <div class="grid-container mb-6">
      <video-card
        v-for="(video, index) in advancedVideos"
        :key="index"
        :video="video"
      />
    </div>
    <!-- Add Video Dialog -->
    <v-dialog v-model="dialog" max-width="600">
      <v-card>
        <v-card-title>Add Video</v-card-title>
        <v-card-text>
          <v-form ref="videoform" v-model="valid">
            <v-text-field
              v-model="newVideo.resourceId"
              label="YouTube Video Link"
              hint="Ex: https://www.youtube.com/watch?v=XXXXXX"
              persistent-hint
              :rules="[(v) => !!v || 'YouTube Video Link is required']"
              required
            ></v-text-field>
            <v-select
              v-model="newVideo.category"
              :items="categories"
              item-text="title"
              item-value="value"
              label="Category"
              :rules="[(v) => !!v || 'Category is required']"
              required
            ></v-select>
            <v-select
              v-model="newVideo.level"
              :items="levels"
              item-text="title"
              item-value="value"
              label="Level"
              :rules="[(v) => !!v || 'Level is required']"
              required
            ></v-select>
          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-end">
          <v-btn @click="addNewVideo" class="px-6" color="var(--mh-blue)" dark>Submit</v-btn>
          <v-btn @click="dialog = false" color="secondary" outlined
            >Cancel</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Floating Add Video Button -->
    <v-btn
      v-if="isEditor"
      @click="openDialog"
      class="floating-btn"
      color="var(--mh-blue)"
      fab
      large
      dark
      ><v-icon large>mdi-plus</v-icon></v-btn
    >
  </div>
</template>

<script>
import VideoCard from "../../components/VideoCard.vue";
// import youtube from "../../apis/youtube";
import { mapActions, mapGetters } from "vuex";
import utilitiesMixin from "../../mixins/utilities-mixin";

export default {
  name: "Videos",
  mixins: [utilitiesMixin],
  props: ["selectedCategory"],
  components: {
    VideoCard,
  },
  data() {
    return {
      dialog: false,
      valid: true,
      newVideo: {
        resourceId: "",
        category: "",
        level: "",
      },
    };
  },
  methods: {
    ...mapActions(["addVideo", "fetchCategoryVideos"]),
    addNewVideo() {
      this.addVideo({
        video: this.newVideo,
        currentCategory:
          this.newVideo.category ==
          this.categories[this.selectedCategory].value,
      });
    },
    openDialog() {
      this.resetForm();
      this.dialog = true;
      if (this.$refs.videoform) {
        this.$refs.videoform.resetValidation();
      }
    },
    resetForm() {
      this.newVideo = {
        resourceId: "",
        category: "",
        level: "",
      };
    },
  },
  computed: {
    ...mapGetters([
      "advancedVideos",
      "beginnerVideos",
      "intermediateVideos",
      "isEditor",
      "videos",
    ]),
    categoryTitle() {
      return this.categories[this.selectedCategory].title;
    },
  },
  async mounted() {
    const key = this.categories[this.selectedCategory].value;
    await this.fetchCategoryVideos(key);
  },
  watch: {
    selectedCategory() {
      let categoryQuery = this.categories[this.selectedCategory].query;

      if (this.$route.query.category != categoryQuery) {
        this.$router.replace({
          name: "Videos",
          query: { category: this.categories[this.selectedCategory].query },
        });

        const key = this.categories[this.selectedCategory].value;
        this.fetchCategoryVideos(key);
      }
    },
  },
};
</script>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}
.image {
  max-height: 200px;
  object-fit: cover;
}
.floating-btn {
  bottom: 0;
  right: 0;
  position: fixed;
  margin-right: 7vw;
  margin-bottom: 7vh;
}
</style>

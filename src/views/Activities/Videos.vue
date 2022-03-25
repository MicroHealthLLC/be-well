<template>
  <div class="mt-2 mb-2 mb-sm-2 mt-sm-4">
    <!-- Selected Videos -->
    <span class="text-h6 text-sm-h5"
      >{{ filters[selectedFilter].title }} {{ categoryTitle }} Videos</span
    >
    <v-divider class="mb-4"></v-divider>

    <div v-if="videos.length > 0" class="grid-container mb-6">
      <video-card
        v-for="(video, index) in videos"
        :key="index"
        :video="video"
      />
      <div class="grid-full-width">
        <v-pagination
          v-model="page"
          @input="fetchSelectedPage"
          :length="totalPages"
          color="#2f53b6"
        ></v-pagination>
      </div>
    </div>
    <div v-else class="d-flex flex-column justify-center align-center py-10">
      <div v-if="selectedFilter != 0">
        <v-icon class="mr-2">mdi-video-vintage</v-icon> No
        {{ filters[selectedFilter].title }} Videos...
      </div>
      <div v-else>
        <v-icon class="mr-2">mdi-video-vintage</v-icon> No Videos...
      </div>
      <v-btn
        v-if="showAddBtn"
        @click="openDialog"
        class="mt-5"
        color="primary"
        text
        >Add a New Video</v-btn
      >
    </div>

    <!-- Add Video Dialog -->
    <v-dialog v-model="dialog" max-width="600">
      <v-card :disabled="saving" :loading="saving">
        <v-card-title>Add Video</v-card-title>
        <v-card-text>
          <v-form ref="videoform" v-model="valid">
            <v-text-field
              v-model="urlInput"
              @keydown.space.prevent
              label="YouTube Video Link"
              hint="Ex: https://www.youtube.com/watch?v=XXXXXX"
              persistent-hint
              :rules="[
                (v) => !!v || 'YouTube Video Link is required',
                (v) => urlCheck(v) || 'Not a valid URL',
              ]"
              required
              validate-on-blur
            ></v-text-field>
            <v-select
              v-model="newVideo.category"
              :items="filteredCategories"
              item-text="title"
              item-value="value"
              label="Category"
              :rules="[(v) => !!v || 'Category is required']"
              required
            ></v-select>
            <v-select
              v-model="newVideo.level"
              :items="filteredLevels"
              item-text="title"
              item-value="value"
              label="Level"
              :rules="[(v) => !!v || 'Level is required']"
              required
            ></v-select>
          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-end">
          <v-btn @click="addNewVideo" class="px-6" color="var(--mh-blue)" dark
            >Submit</v-btn
          >
          <v-btn @click="dialog = false" color="secondary" outlined
            >Cancel</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Floating Add Video Button -->
    <v-btn
      v-if="showAddBtn"
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
import { mapActions, mapGetters } from "vuex";
import utilitiesMixin from "../../mixins/utilities-mixin";

export default {
  name: "Videos",
  mixins: [utilitiesMixin],
  props: ["selectedCategory", "selectedFilter"],
  components: {
    VideoCard,
  },
  data() {
    return {
      dialog: false,
      valid: true,
      page: 1,
      start: 0,
      newVideo: {
        resourceId: "",
        category: "",
        level: "",
      },
      urlInput: "",
    };
  },
  methods: {
    ...mapActions([
      "addVideo",
      "fetchVideos",
      "fetchYTVideos",
      "fetchFavoriteVideos",
      "fetchAllFavoriteVideos",
    ]),
    async addNewVideo() {
      if (!this.$refs.videoform.validate()) {
        return;
      }
      // Extract YouTube id from user provided URL
      this.newVideo.resourceId = this.extractResourceId(this.urlInput);
      // Boolean is passed for current category to determine if user is on same page
      await this.addVideo({
        video: this.newVideo,
        currentCategory:
          this.newVideo.category ==
            this.categories[this.selectedCategory].value &&
          this.newVideo.level == this.levels[this.selectedFilter].value,
      });
      this.dialog = false;
    },
    openDialog() {
      this.resetForm();
      this.selectedCategory == 0
        ? (this.newVideo.category = "BALANCE")
        : (this.newVideo.category =
            this.categories[this.selectedCategory].value);
      this.selectedFilter == 0
        ? (this.newVideo.level = "BEGINNER")
        : (this.newVideo.level = this.levels[this.selectedFilter].value);
      this.dialog = true;
      if (this.$refs.videoform) {
        this.$refs.videoform.resetValidation();
      }
    },
    resetForm() {
      this.urlInput = "";
      this.newVideo = {
        resourceId: "",
        category: "",
        level: "",
      };
    },
    urlCheck(url) {
      return url.includes("youtube.com") || url.includes("youtu.be");
    },
    extractResourceId(url) {
      let regExp =
        /(https?:\/\/)?((www\.)?(youtube(-nocookie)?|youtube.googleapis)\.com.*(v\/|v=|vi=|vi\/|e\/|embed\/|user\/.*\/u\/\d+\/)|youtu\.be\/)([_0-9a-z-]+)/i;

      let match = url.match(regExp);

      return match ? url.match(regExp)[7] : "YouTube ID not found";
    },
    fetchSelectedPage(page) {
      this.page = page;
      this.start = (page - 1) * 12;
      this.fetchYTVideos(this.start);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
  computed: {
    ...mapGetters([
      "awsVideos",
      "advancedVideos",
      "beginnerVideos",
      "intermediateVideos",
      "isEditor",
      "saving",
      "videos",
    ]),
    categoryTitle() {
      return this.categories[this.selectedCategory].title;
    },
    showAddBtn() {
      // Check if on Editors list and whether last filter (Favorites) is selected
      return this.isEditor && this.selectedFilter != this.filters.length - 1;
    },
    isLevel() {
      let filter = this.filters[this.selectedFilter].value;
      return (
        filter == "BEGINNER" || filter == "INTERMEDIATE" || filter == "ADVANCED"
      );
    },
    totalPages() {
      return Math.ceil(this.awsVideos.length / 12);
    },
  },
  async mounted() {
    let category = this.categories[this.selectedCategory].value;
    let filter = this.filters[this.selectedFilter].value;

    if (category == "ALL" && filter == "ALL") {
      this.fetchVideos();
    } else if (category != "ALL" && filter == "ALL") {
      this.fetchVideos({
        filter: { category: { eq: category } },
      });
    } else if (category == "ALL" && this.isLevel) {
      this.fetchVideos({
        filter: { level: { eq: filter } },
      });
    } else if (category != "ALL" && this.isLevel) {
      this.fetchVideos({
        filter: { category: { eq: category }, level: { eq: filter } },
      });
    } else {
      this.fetchFavoriteVideos(category);
    }
    this.fetchAllFavoriteVideos();
  },
  watch: {
    selectedCategory() {
      this.page = 1;
      let categoryQuery = this.categories[this.selectedCategory].query;
      let category = this.categories[this.selectedCategory].value;
      let filter = this.filters[this.selectedFilter].value;

      if (this.$route.query.category != categoryQuery) {
        this.$router.replace({
          name: "Videos",
          query: {
            category: this.categories[this.selectedCategory].query,
            filter: this.filters[this.selectedFilter].query,
          },
        });

        if (category == "ALL" && filter == "ALL") {
          this.fetchVideos();
        } else if (category != "ALL" && filter == "ALL") {
          this.fetchVideos({
            filter: { category: { eq: category } },
          });
        } else if (category == "ALL" && this.isLevel) {
          this.fetchVideos({
            filter: { level: { eq: filter } },
          });
        } else if (category != "ALL" && this.isLevel) {
          this.fetchVideos({
            filter: { category: { eq: category }, level: { eq: filter } },
          });
        } else {
          this.fetchFavoriteVideos(category);
        }
      }
    },
    selectedFilter() {
      this.page = 1;
      let filterQuery = this.filters[this.selectedFilter].query;
      let category = this.categories[this.selectedCategory].value;
      let filter = this.filters[this.selectedFilter].value;

      if (this.$route.query.filter != filterQuery) {
        this.$router.replace({
          name: "Videos",
          query: {
            category: this.categories[this.selectedCategory].query,
            filter: this.filters[this.selectedFilter].query,
          },
        });

        if (category == "ALL" && filter == "ALL") {
          this.fetchVideos();
        } else if (category != "ALL" && filter == "ALL") {
          this.fetchVideos({
            filter: { category: { eq: category } },
          });
        } else if (category == "ALL" && this.isLevel) {
          this.fetchVideos({
            filter: { level: { eq: filter } },
          });
        } else if (category != "ALL" && this.isLevel) {
          this.fetchVideos({
            filter: { category: { eq: category }, level: { eq: filter } },
          });
        } else {
          this.fetchFavoriteVideos(category);
        }
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
.grid-full-width {
  grid-column: 1/-1;
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

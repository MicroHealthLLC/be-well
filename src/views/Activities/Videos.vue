<template>
  <div class="mt-2 mb-2 mb-sm-2 mt-sm-4">
    <v-chip-group v-model="selectedCategory" class="mb-2 categories" mandatory>
      <v-chip
        v-for="(category, index) in categories"
        :key="index"
        color="primary"
        outlined
        filter
        >{{ category.title }}</v-chip
      >
    </v-chip-group>

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
  </div>
</template>

<script>
import VideoCard from "../../components/VideoCard.vue";
import youtube from "../../apis/youtube";

export default {
  name: "Videos",
  components: {
    VideoCard,
  },
  data() {
    return {
      selectedCategory: 0,
      beginnerVideos: [],
      intermediateVideos: [],
      advancedVideos: [],
      categories: [
        {
          title: "Endurance",
          query: "endurance",
          key: "ENDURANCE",
        },
        {
          title: "Ergonomics",
          query: "ergonomics",
          key: "ERGONOMICS",
        },
        {
          title: "Meditation",
          query: "meditation",
          key: "MEDITATION",
        },
        {
          title: "Muscle Tone/Movement",
          query: "muscle-tone-movement",
          key: "MUSCLE",
        },
        {
          title: "Posture",
          query: "posture",
          key: "POSTURE",
        },
        {
          title: "Stress Relief",
          query: "stress-relief",
          key: "STRESS_RELIEF",
        },
        {
          title: "Stretching",
          query: "stretching",
          key: "STRETCHING",
        },
        {
          title: "Yoga",
          query: "yoga",
          key: "YOGA",
        },
      ],
    };
  },
  methods: {
    async fetchCategoryVideos() {
      const key = this.categories[this.selectedCategory].key;

      const res = await youtube.get("", {
        params: {
          playlistId: process.env[`VUE_APP_BEGINNER_${key}_PLAYLIST_ID`],
        },
      });

      this.beginnerVideos = res.data.items;

      const res2 = await youtube.get("", {
        params: {
          playlistId: process.env[`VUE_APP_INTERMEDIATE_${key}_PLAYLIST_ID`],
        },
      });

      this.intermediateVideos = res2.data.items;

      const res3 = await youtube.get("", {
        params: {
          playlistId: process.env[`VUE_APP_ADVANCED_${key}_PLAYLIST_ID`],
        },
      });

      this.advancedVideos = res3.data.items;
    },
  },
  computed: {
    categoryTitle() {
      return this.categories[this.selectedCategory].title;
    },
  },
  async mounted() {
    if (this.$route.query.category) {
      this.selectedCategory = this.categories.findIndex(
        (category) => this.$route.query.category == category.query
      );
    }

    await this.fetchCategoryVideos();
  },
  watch: {
    selectedCategory() {
      let categoryQuery = this.categories[this.selectedCategory].query;

      if (this.$route.query.category != categoryQuery) {
        this.$router.replace({
          name: "Videos",
          query: { category: this.categories[this.selectedCategory].query },
        });

        this.fetchCategoryVideos();
      }
    },
  },
};
</script>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}
.image {
  max-height: 200px;
  object-fit: cover;
}
.categories {
  white-space: nowrap;
  overflow-x: auto;
}
</style>

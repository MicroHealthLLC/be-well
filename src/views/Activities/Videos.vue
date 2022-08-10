<template>
  <div class="mt-2 mb-2 mb-sm-2 mt-sm-4">
    <!-- Novice Videos -->
    <span class="text-h6 text-sm-h5"
      ><b class="goalHeaders">Novice {{ categoryTitle }} Videos</b></span
    >
    <v-divider class="mb-4"></v-divider>

    <div class="grid-container mb-6">
      <video-card
        v-for="(video, index) in noviceVideos"
        :key="index"
        :video="video"
      />
    </div>

    <!-- Beginner Videos -->
    <span class="text-h6 text-sm-h5"
      ><b class="goalHeaders">Beginner {{ categoryTitle }} Videos</b></span
    >
    <v-divider class="mb-4"></v-divider>

    <div class="grid-container mb-6">
      <video-card
        v-for="(video, index) in beginnerVideos"
        :key="index"
        :video="video"
      />
    </div>

    <!-- Competent Videos -->
    <span class="text-h6 text-sm-h5"
      ><b class="goalHeaders">Competent {{ categoryTitle }} Videos</b></span
    >
    <v-divider class="mb-4"></v-divider>

    <div class="grid-container mb-6">
      <video-card
        v-for="(video, index) in competentVideos"
        :key="index"
        :video="video"
      />
    </div>

    <!-- Proficient Videos -->
    <span class="text-h6 text-sm-h5"
      ><b class="goalHeaders">Proficient {{ categoryTitle }} Videos</b></span
    >
    <v-divider class="mb-4"></v-divider>

    <div class="grid-container mb-6">
      <video-card
        v-for="(video, index) in proficientVideos"
        :key="index"
        :video="video"
      />
    </div>

    <!-- Expert Videos -->
    <span class="text-h6 text-sm-h5"
      ><b class="goalHeaders">Expert {{ categoryTitle }} Videos</b></span
    >
    <v-divider class="mb-4"></v-divider>

    <div class="grid-container mb-6">
      <video-card
        v-for="(video, index) in expertVideos"
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
  props: ["selectedCategory"],
  components: {
    VideoCard,
  },
  data() {
    return {
      noviceVideos: [],
      beginnerVideos: [],
      competentVideos: [],
      proficientVideos: [],
      expertVideos: [],
      categories: [
        {
          title: "Balance",
          query: "balance",
          key: "BALANCE",
        },
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
          title: "Flexibility & Mobility",
          query: "flexibility-mobility",
          key: "FLEXIBILITY_MOBILITY",
        },
        {
          title: "Mind",
          query: "mind",
          key: "MIND",
        },
        {
          title: "Nutrition",
          query: "nutrition",
          key: "NUTRITION",
        },
        {
          title: "Recovery",
          query: "recovery",
          key: "RECOVERY",
        },
        {
          title: "Strength",
          query: "strength",
          key: "STRENGTH",
        },
        /* {
          title: "",
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
        }, */
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

      this.noviceVideos = res.data.items;

      const res1 = await youtube.get("", {
        params: {
          playlistId: process.env[`VUE_APP_BEGINNER_${key}_PLAYLIST_ID`],
        },
      });

      this.beginnerVideos = res1.data.items;

      const res2 = await youtube.get("", {
        params: {
          playlistId: process.env[`VUE_APP_INTERMEDIATE_${key}_PLAYLIST_ID`],
        },
      });

      this.competentVideos = res2.data.items;

      const res3 = await youtube.get("", {
        params: {
          playlistId: process.env[`VUE_APP_INTERMEDIATE_${key}_PLAYLIST_ID`],
        },
      });

      this.proficentVideos = res3.data.items;

      const res4 = await youtube.get("", {
        params: {
          playlistId: process.env[`VUE_APP_ADVANCED_${key}_PLAYLIST_ID`],
        },
      });

      this.expertVideos = res4.data.items;
    },
  },
  computed: {
    categoryTitle() {
      return this.categories[this.selectedCategory].title;
    },
  },
  async mounted() {
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
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}
.image {
  max-height: 200px;
  object-fit: cover;
}
.goalHeaders {
  color: var(--mh-blue);
}
</style>

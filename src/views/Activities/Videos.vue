<template>
  <div v-if="play">
    <!-- <VideoModal /> -->
    <v-dialog v-model="play" width="auto" overlay-opacity="0.9">
      <v-card width="1200">
        <div class="video-container">
          <iframe
            :src="embedVideoURL + currentVideo.videoId"
            width="560"
            height="349"
            frameborder="0"
            allowfullscreen
          ></iframe>
        </div>
        <v-card-title
          class="d-flex justify-space-between align-start flex-nowrap"
        >
          {{ currentVideo.title }}
          <div>
            <router-link to="/activities/reminders"
              ><v-btn class="ma-2 back" color="var(--mh-orange)" dark>
                <v-icon dark left> mdi-arrow-left </v-icon>Back
              </v-btn>
            </router-link>
            <v-btn
              @click="nextVideo()"
              class="ma-2 back"
              color="var(--mh-green)"
              dark
            >
              Next
              <v-icon dark left> mdi-arrow-right </v-icon>
            </v-btn>
          </div>
        </v-card-title>
      </v-card>
    </v-dialog>
  </div>
  <div v-else class="mt-2 mb-2 mb-sm-2 mt-sm-4">
    <span class="text-h6 text-sm-h5">
      <b class="goalHeaders">Beginner {{ currentVideo.category }} Videos</b>
    </span>
    <v-divider class="mb-4"></v-divider>

    <div class="grid-container mb-6">
      <video-card
        v-for="(video, index) in selectedCategory"
        :key="index"
        :video="video"
      />
    </div>
    <!-- <span class="text-h6 text-sm-h5"
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
    </div> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import videosMixin from "../../mixins/videos-mixin";
import utilitiesMixin from "../../mixins/utilities-mixin";
import VideoCard from "../../components/VideoCard.vue";
//import VideoModal from "../../components/VideoModal.vue";
//import youtube from "../../apis/youtube";

export default {
  name: "Videos",
  //props: ["selectedCategory"],
  mixins: [videosMixin, utilitiesMixin],
  components: {
    VideoCard,
    //VideoModal
  },
  data() {
    return {
      play: true,
      embedVideoURL: "https://www.youtube.com/embed/",
      /* favoriteCat:
        this.$route.query.category.charAt(0).toUpperCase(),
      favoriteLev: this.levelToString(this.$route.query.level), */
      favoriteCat: "Strength",
      favoriteLev: "L2"
    };
  },
  methods: {
    selectedCategory() {
      let vids = this.videos.filter(
        (v) => v.category == this.favoriteCat && v.level == this.favoriteLev
      );
      console.log(vids);
      return vids;
    },
    /* onClickOutside() {
      this.$router.push("/activities/reminders")
    }, */
    /* async fetchCategoryVideos() {
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
    }, */
    levelToString(level) {
      console.log(this.videos);
      switch (level) {
        case "L1" || "beginner-1":
          return "Novice";
        case "L2" || "beginner-2":
          return "Beginner";
        case "L3" || "intermediate-1":
          return "Competent";
        case "L4" || "intermediate-2":
          return "Proficient";
        case "L5" || "advanced":
          return "Expert";
        default:
          return "";
      }
    },
  },
  computed: {
    ...mapGetters(["preferences"]),
    /* categoryTitle() {
      console.log(this.videos);
      console.log(this.preferences);
      return this.categories[this.selectedCategory].title;
    }, */
  },
  mounted() {
    this.nextVideo(this.favoriteCat, this.favoriteLev);
    this.selectedCategory();
  },
  watch: {},
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
.video-container {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  height: 0;
}
.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
a {
  text-decoration: none;
}
</style>

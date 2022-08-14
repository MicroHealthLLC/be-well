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
            <v-btn
              @click="goBack"
              class="ma-2 back"
              color="var(--mh-orange)"
              dark
            >
              <v-icon dark left> mdi-arrow-left </v-icon>Back
            </v-btn>
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
    <div v-if="!this.isEmpty(balanceVids)">
      <span class="text-h6 text-sm-h5">
        <b class="goalHeaders">All Balance Videos</b>
      </span>
      <v-divider class="mb-4"></v-divider>

      <div class="grid-container mb-10">
        <video-card
          v-for="(video, index) in balanceVids"
          :key="index"
          :video="video"
          :count ="index + 1"
          :total="balanceVids.length"
        />
      </div>
    </div>

    <div v-if="!this.isEmpty(enduranceVids)">
      <span class="text-h6 text-sm-h5"
        ><b class="goalHeaders">All Endurance Videos</b></span
      >
      <v-divider class="mb-4"></v-divider>

      <div class="grid-container mb-10">
        <video-card
          v-for="(video, index) in enduranceVids"
          :key="index"
          :video="video"
          :count ="index + 1"
          :total="enduranceVids.length"
        />
      </div>
    </div>

    <div v-if="!this.isEmpty(strengthVids)">
      <span class="text-h6 text-sm-h5"
        ><b class="goalHeaders">All Strength Videos</b></span
      >
      <v-divider class="mb-4"></v-divider>

      <div class="grid-container mb-10">
        <video-card
          v-for="(video, index) in strengthVids"
          :key="index"
          :video="video"
          :count ="index + 1"
          :total="strengthVids.length"
        />
      </div>
    </div>

    <div v-if="!this.isEmpty(flexibilityVids)">
      <span class="text-h6 text-sm-h5"
        ><b class="goalHeaders">All Flexibility & Mobility Videos</b></span
      >
      <v-divider class="mb-4"></v-divider>

      <div class="grid-container mb-10">
        <video-card
          v-for="(video, index) in flexibilityVids"
          :key="index"
          :video="video"
          :count ="index + 1"
          :total="flexibilityVids.length"
        />
      </div>
    </div>

    <div v-if="!this.isEmpty(recoveryVids)">
      <span class="text-h6 text-sm-h5"
        ><b class="goalHeaders">All Recovery Videos</b></span
      >
      <v-divider class="mb-4"></v-divider>

      <div class="grid-container mb-10">
        <video-card
          v-for="(video, index) in recoveryVids"
          :key="index"
          :video="video"
          :count ="index + 1"
          :total="recoveryVids.length"
        />
      </div>
    </div>
    
    <div v-if="!this.isEmpty(ergonomicsVids)">
      <span class="text-h6 text-sm-h5"
        ><b class="goalHeaders">All Ergonomics Videos</b></span
      >
      <v-divider class="mb-4"></v-divider>

      <div class="grid-container mb-10">
        <video-card
          v-for="(video, index) in ergonomicsVids"
          :key="index"
          :video="video"
          :count ="index + 1"
          :total="ergonomicsVids.length"
        />
      </div>
    </div>

    <div v-if="!this.isEmpty(nutritionVids)">
      <span class="text-h6 text-sm-h5"
        ><b class="goalHeaders">All Nutrition Videos</b></span
      >
      <v-divider class="mb-4"></v-divider>

      <div class="grid-container mb-10">
        <video-card
          v-for="(video, index) in nutritionVids"
          :key="index"
          :video="video"
          :count ="index + 1"
          :total="nutritionVids.length"
        />
      </div>
    </div>
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
      play: this.$route.query.category ? true : false,
      embedVideoURL: "https://www.youtube.com/embed/",
      favoriteCat: this.$route.query.category
        ? this.capitalizeFirstLet(this.$route.query.category)
        : "",
      favoriteLev: this.$route.query.filter
        ? this.filterToLevel(this.$route.query.filter)
        : "",
      balanceVids: [],
      enduranceVids: [],
      strengthVids: [],
      flexibilityVids: [],
      recoveryVids: [],
      ergonomicsVids: [],
      nutritionVids: [],
    };
  },
  methods: {
    selectedCategory() {
      let vids = this.videos.filter(
        (v) => v.category == this.favoriteCat && v.level == this.favoriteLev
      );
      return vids;
    },
    capitalizeFirstLet(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    seperateVideosbyCategory() {
      let bal = this.videos.filter((v) => v.category == "Balance");
      let end = this.videos.filter((v) => v.category == "Endurance");
      let str = this.videos.filter((v) => v.category == "Strength");
      let flex = this.videos.filter(
        (v) => v.category == "Flexibility-mobility"
      );
      let rec = this.videos.filter((v) => v.category == "Recovery");
      let erg = this.videos.filter((v) => v.category == "Ergonomics");
      let nut = this.videos.filter((v) => v.category == "Nutrition");
      this.balanceVids = bal;
      this.enduranceVids = end;
      this.strengthVids = str;
      this.flexibilityVids = flex;
      this.recoveryVids = rec;
      this.ergonomicsVids = erg;
      this.nutritionVids = nut;
    },
    levelToString(level) {
      //console.log(this.videos);
      switch (level) {
        case "L1":
          return "Novice";
        case "L2":
          return "Beginner";
        case "L3":
          return "Competent";
        case "L4":
          return "Proficient";
        case "L5":
          return "Expert";
      }
    },
    filterToLevel(filter) {
      switch (filter) {
        case "beginner-1":
          return "L1";
        case "beginner-2":
          return "L2";
        case "intermediate-1":
          return "L3";
        case "intermediate-2":
          return "L4";
        case "advanced":
          return "L5";
        case "na":
          return "na";
      }
    },
    goBack() {
      this.play = false;
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
    if (!this.$route.query.category && !this.$route.query.filter) {
      this.play = false;
    }
    this.seperateVideosbyCategory();
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

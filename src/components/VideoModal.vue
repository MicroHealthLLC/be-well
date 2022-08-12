<template>
  <v-dialog width="auto" overlay-opacity="0.9">
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
        {{ levelToString(currentVideo.level) + " " + currentVideo.category }}
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
</template>

<script>
import videosMixin from "../mixins/videos-mixin";

export default {
  name: "VideoModal",
  mixins: [videosMixin],
  data() {
    return {
      embedVideoURL: "https://www.youtube.com/embed/",
    };
  },
  methods: {
    levelToString(level) {
      console.log(this.videos);
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
        default:
          return "";
      }
    },
  },
  computed: {},
  mounted() {
    
  },
  watch: {},
};
</script>

<style scoped>
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

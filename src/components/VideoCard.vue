<template>
  <v-card elevation="5">
    <div @click="playVideo(video.videoId)" class="img-container clickable">
      <img class="image" :src="getVideoImage(video.category)" width="100%" />
      <div class="d-flex justify-center align-center overlay">
        <v-btn fab depressed><v-icon large>mdi-play</v-icon></v-btn>
      </div>
    </div>

    <v-card-title class="video-title"
      >Focus Area: {{ this.video.category }}</v-card-title
    >
    <v-card-subtitle class="text-body-1 font-weight-bold"
      ><span class="clamp-two-lines"
        >Activity:
        <v-chip outlined>{{ this.count }} of {{ this.total }}</v-chip></span
      ></v-card-subtitle
    >
    <v-card-text v-if="this.video.level != 'na'">
      <span class="clamp-two-lines"
        ><v-chip :color="levelToColor(this.video.level)">{{
          levelToString(this.video.level)
        }}</v-chip></span
      >
    </v-card-text>
    <v-card-actions class="align-end">
      <v-btn @click="playVideo(video.videoId)" text color="primary"
        >View <v-icon class="mr-1">mdi-youtube</v-icon></v-btn
      >
      <v-spacer></v-spacer>
      <!-- <v-btn v-if="showDeleteBtn" @click="openDeleteDialog" icon
        ><v-icon>mdi-delete</v-icon></v-btn
      > -->
    </v-card-actions>
    <!-- Play Video Modal -->
    <!-- <VideoModal /> -->
    <v-dialog v-model="play" width="auto" overlay-opacity="0.9">
      <v-card width="1200">
        <div class="video-container">
          <iframe
            :src="embedVideoURL"
            width="560"
            height="349"
            frameborder="0"
            allowfullscreen
          ></iframe>
        </div>
        <v-card-title class="mb-1"
          >Focus Area: {{ this.video.category }}</v-card-title
        >
        <v-card-subtitle class="font-weight-bold">
          <div>
            Activity:
            <v-chip outlined>{{ this.count }} of {{ this.total }}</v-chip>
          </div>
          <!-- <div>
            <v-btn
              v-if="favoriteReference"
              @click="removeFavorite"
              color="var(--mh-orange)"
              title="Remove from favorites"
              icon
              ><v-icon>mdi-star</v-icon></v-btn
            >
            <v-btn v-else @click="addFavorite" title="Add to favorites" icon
              ><v-icon>mdi-star-outline</v-icon></v-btn
            >
          </div> -->
        </v-card-subtitle>
        <v-card-subtitle v-if="this.video.level != 'na'">
          <v-chip :color="levelToColor(this.video.level)">{{
            levelToString(this.video.level)
          }}</v-chip>
        </v-card-subtitle>
        <v-btn @click="goBack" class="ma-2 back">
          <v-icon dark left> mdi-arrow-left </v-icon>Back
        </v-btn>
      </v-card>
    </v-dialog>
    <!-- Delete Video Dialog -->
    <v-dialog v-model="deleteDialog">
      <v-card>
        <v-card-title>Delete Video?</v-card-title>
        <v-card-text
          >Are you sure you want to delete
          <strong>Video Title</strong>?</v-card-text
        >
        <v-card-actions class="justify-end">
          <v-btn @click="deleteDialog = false" color="secondary" small outlined
            >Cancel</v-btn
          >
          <v-btn
            @click="removeVideo"
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
import { mapActions, mapGetters, mapMutations } from "vuex";
//import VideoModal from "./VideoModal.vue";
export default {
  name: "VideoCard",
  props: {
    video: {
      type: Object,
    },
    count: Number,
    total: Number,
  },
  components: {},
  data() {
    return {
      play: false,
      embedVideoURL: "",
      deleteDialog: false,
    };
  },
  methods: {
    ...mapActions([
      "addFavoriteVideo",
      "deleteVideo",
      "deleteFavoriteVideo",
      "fetchFavoriteVideos",
    ]),
    ...mapMutations(["DELETE_VIDEO"]),
    openVideoURL(videoId) {
      window.open(`https://www.youtube.com/watch?v=${videoId}`);
    },
    playVideo(videoId) {
      this.play = true;
      this.embedVideoURL = `https://youtube.com/embed/${videoId}`;
    },
    goBack() {
      this.play = false;
    },
    openDeleteDialog() {
      this.deleteDialog = true;
    },
    removeVideo() {
      this.deleteVideo(this.video.id);
      this.deleteDialog = false;
    },
    addFavorite() {
      let favoriteVideo = {
        videoId: this.video.id,
        category: this.video.category,
        level: this.video.level,
      };
      this.addFavoriteVideo(favoriteVideo);
    },
    removeFavorite() {
      this.deleteFavoriteVideo(this.favoriteReference.id);
      if (this.$route.query.filter == "favorites") {
        this.DELETE_VIDEO(this.video.id);
        this.play = false;
      }
    },
    levelToString(level) {
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
        case "na":
          return "";
      }
    },
    getVideoImage(videoCat) {
      //console.log(videoCat)
      switch (videoCat) {
        case "Endurance":
          return "/img/endurance.jpg";
        case "Strength":
          return "/img/strength.jpg";
        case "Flexibility-mobility":
          return "/img/flexibility_mobility.jpg";
        case "Recovery":
          return "/img/recovery.jpg";
        case "Ergonomics":
          return "/img/ergonomics.jpg";
        case "Nutrition":
          return "/img/nutrition.jpg";
        case "Balance":
          return "/img/balance.jpg";
      }
    },
    levelToColor(level) {
      //console.log(level);
      switch (level) {
        case "L1":
        case "L2":
          return "var(--mh-green)";
        case "L3":
        case "L4":
          return "var(--mh-orange)";
        case "L5":
          return "error";
      }
    },
  },
  computed: {
    ...mapGetters(["isEditor", "favoriteVideos"]),
    showDeleteBtn() {
      console.log(this.video);

      return this.isEditor && this.$route.name != "Home";
    },
    thumbnail() {
      return (
        this.video.snippet.thumbnails.standard?.url ||
        this.video.snippet.thumbnails.medium?.url ||
        this.video.snippet.thumbnails.high?.url ||
        this.video.snippet.thumbnails.default?.url ||
        ""
      );
    },
    favoriteReference() {
      return this.favoriteVideos.find(
        (video) => video.videoId == this.video.id
      );
    },
  },
  watch: {
    play(isPlaying) {
      if (!isPlaying) {
        console.log("Turn off video");
        this.embedVideoURL = "";
      }
    },
  },
};
</script>

<style scoped>
.clamp-two-lines {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.video-title {
  min-height: 80px;
  align-content: flex-start;
  word-break: break-word;
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
.image {
  max-height: 200px;
  object-fit: cover;
}
.overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
  transition: 0.3s ease;
  background-color: rgba(0, 0, 0, 0.3);
}
.img-container {
  position: relative;
  width: 100%;
}
.img-container:hover .overlay {
  opacity: 1;
}
a {
  text-decoration: none;
}
</style>

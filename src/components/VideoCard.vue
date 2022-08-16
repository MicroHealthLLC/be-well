<template>
  <v-card width="auto" elevation="8" :load="log(_videos)">
    <div class="img-container">
      <img
        :src="
          getFirstNonNullVal(_videos).category
            ? getVideoImage(getFirstNonNullVal(_videos).category)
            : ''
        "
        class="image"
        width="100%"
      />

        <v-card-title class="py-0"><span class="mhBlue">
          <h3 v-if="_videos[0].category == 'Flexibility-mobility'">Flexibility</h3>
          <h3 v-else>{{ _videos[0].category }}</h3>
          </span>
        <span class="text-right"> 
          
          <h6 class><v-card-text v-if="getFirstNonNullVal(_videos).level != 'na'">

        <span 
          ><v-chip :color="levelToColor(getFirstNonNullVal(_videos).level)">{{
            levelToString(getFirstNonNullVal(_videos).level)
          }}</v-chip></span
        >
      </v-card-text></h6></span>
        </v-card-title>
      <!-- <div class="d-flex justify-center align-center overlay">
        <v-btn fab depressed><v-icon large>mdi-play</v-icon></v-btn>
      </div> -->
    </div>

    <!-- <v-card-title class="video-title"
      >Focus Area: {{ getFirstNonNullVal(_videos).category }}</v-card-title
    > -->
    <div class="text-center">    
   
      <v-card-subtitle class="text-body-1 pt-0 font-weight-bold">
        <span 
          >
          <v-chip
            class="ma-1"
            v-for="(item, index) in _videos"
            :key="index"
            @click="playVideo(item, item.category, item.level, index)"
            outlined
          >
            {{ index + 1 }}
          </v-chip>
        </span>
      </v-card-subtitle>
    </div>

    <!-- <v-card-actions class="align-end"> -->
      <!-- <v-btn @click="playVideo(video.videoId)" text color="primary"
        >View <v-icon class="mr-1">mdi-youtube</v-icon></v-btn
      > -->
      <!-- <v-spacer></v-spacer> -->
      <!-- <v-btn v-if="showDeleteBtn" @click="openDeleteDialog" icon
        ><v-icon>mdi-delete</v-icon></v-btn
      > -->
    <!-- </v-card-actions> -->
    <!-- Play Video Modal -->
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
        <v-card-title class="mb-1">Focus Area: {{ currentCat }}</v-card-title>
        <v-card-subtitle class="font-weight-bold">
          <div>
            Activity:
            <v-chip outlined>{{ activityNum }}</v-chip>
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
        <v-card-subtitle  class="text-center" v-if="currentLev != 'na'">
          <v-chip :color="levelToColor(currentLev)">{{
            levelToString(currentLev)
          }}</v-chip>
        </v-card-subtitle>
        <v-btn @click="goBack" class="ma-2 back">
          <v-icon dark left> mdi-arrow-left </v-icon>Back
        </v-btn>
      </v-card>
    </v-dialog>
    <!-- Delete Video Dialog -->
    <!-- <v-dialog v-model="deleteDialog">
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
    </v-dialog> -->
  </v-card>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import videosMixin from "../mixins/videos-mixin";
//import VideoModal from "./VideoModal.vue";
export default {
  name: "VideoCard",
  mixins: [videosMixin],
  props: {
    _videos: {
      type: Array,
    },
    total: Number,
  },
  components: {},
  data() {
    return {
      play: false,
      embedVideoURL: "",
      deleteDialog: false,
      currentCat: "",
      currentLev: "",
      activityNum: "",
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
    log(e){
      console.log(e)
    },
    openVideoURL(videoId) {
      window.open(`https://www.youtube.com/watch?v=${videoId}`);
    },
    playVideo(video, cat, lev, num) {
      this.play = true;
      this.currentCat = cat;
      this.currentLev = lev;
      this.activityNum = num + 1;
      this.embedVideoURL = `https://youtube.com/embed/${video.videoId}`;
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
    getFirstNonNullVal(array) {
      if (!this.isEmpty(array)) {
        return array.find((v) => v !== this.isEmpty(v));
      }
    },
    levelToColor(level) {
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
    ...mapGetters(["isEditor", "favoriteVideos", "preferences"]),
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
.mhBlue{
  color: var(--mh-blue);
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

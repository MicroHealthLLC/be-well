<template>
  <v-card elevation="5">
    <div @click="playVideo(video.resourceId)" class="img-container clickable">
      <img class="image" :src="thumbnail" width="100%" />
      <div class="d-flex justify-center align-center overlay">
        <v-btn fab depressed><v-icon large>mdi-play</v-icon></v-btn>
      </div>
    </div>

    <v-card-title class="video-title text-body-1 font-weight-bold"
      ><span class="clamp-two-lines">{{
        video.snippet.title
      }}</span></v-card-title
    >
    <v-card-subtitle>{{ video.snippet.channelTitle }}</v-card-subtitle>
    <v-card-text>
      <span class="clamp-two-lines">{{ video.snippet.description }}</span>
    </v-card-text>
    <v-card-actions class="align-end">
      <v-btn @click="playVideo(video.resourceId)" text color="primary"
        >View Video</v-btn
      >
      <v-spacer></v-spacer>
      <v-btn v-if="showDeleteBtn" @click="openDeleteDialog" icon
        ><v-icon>mdi-delete</v-icon></v-btn
      >
    </v-card-actions>
    <!-- Play Video Modal -->
    <v-dialog v-model="play" overlay-opacity="0.9">
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
        <v-card-title
          class="d-flex justify-space-between align-start flex-nowrap"
          ><div>
            {{ video.snippet.title }}
          </div>
          <div>
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
          </div></v-card-title
        >
        <v-card-subtitle>{{ video.snippet.channelTitle }}</v-card-subtitle>
        <v-card-text>{{ video.snippet.description }}</v-card-text>
      </v-card>
    </v-dialog>
    <!-- Delete Video Dialog -->
    <v-dialog v-model="deleteDialog">
      <v-card>
        <v-card-title>Delete Video?</v-card-title>
        <v-card-text
          >Are you sure you want to delete
          <strong>{{ video.snippet.title }}</strong
          >?</v-card-text
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
export default {
  name: "VideoCard",
  props: {
    video: {
      type: Object,
    },
  },
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
  },
  computed: {
    ...mapGetters(["isEditor", "favoriteVideos"]),
    showDeleteBtn() {
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
</style>

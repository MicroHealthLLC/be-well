<template>
  <div v-if="play">
    <!-- <VideoModal /> -->
    <v-dialog v-model="play" width="auto" v-click-outside="goBack" overlay-opacity="0.9">
      <v-card width="1200">
        <div class="video-container">
          <iframe :src="embedVideoURL + currentVideo.videoId" width="560" height="349" frameborder="0"
            allowfullscreen></iframe>
        </div>
        <v-card-title class="mb-2">
          Focus Area: {{ currentVideo.category }}
        </v-card-title>
        <!-- <v-card-text>
          <div>
            Activity:
            <v-chip class="font-weight-bold" outlined
              >{{
                getVideoNum(
                  currentVideo.category,
                  currentVideo.level,
                  currentVideo
                ).index + 1
              }}
              of
              {{
                getVideoNum(
                  currentVideo.category,
                  currentVideo.level,
                  currentVideo
                ).count
              }}
            </v-chip>
          </div>
        </v-card-text> -->

        <v-card-subtitle class="d-flex justify-space-between align-start flex-nowrap">
          <v-chip v-if="currentVideo.level != 'na'" :color="levelToColor(currentVideo.level)">{{
              levelToString(currentVideo.level)
          }}
          </v-chip>
          <div>
            <v-btn @click="goBack" class="ma-2 back">
              <v-icon dark left> mdi-arrow-left </v-icon>Back
            </v-btn>
            <!-- <v-btn
              @click="nextVideo()"
              class="ma-2 back"
              color="var(--mh-green)"
              dark
            >
              Next
              <v-icon dark left> mdi-arrow-right </v-icon>
            </v-btn> -->
          </div>
        </v-card-subtitle>
      </v-card>
    </v-dialog>
  </div>
  <span v-else class="mb-sm-2">
    <h1 class="text--secondary">MicroHealth Videos</h1>
    <div class="row mt-2">
      <div class="col-3" v-if="!this.isEmpty(balanceVids)">
        <span v-for="(level, i) in balanceVidsbyLevel" :key="i">
          <video-card :_videos="level" :total="level.length" />
        </span>
      </div>

      <div v-if="!this.isEmpty(enduranceVids)" class="col-3">
        <span v-for="(level, i) in enduranceVidsbyLevel" :key="i">
          <video-card :_videos="level" :total="level.length" />
        </span>
      </div>

      <div v-if="!this.isEmpty(strengthVids)" class="col-3">
        <span v-for="(level, i) in strengthVidsbyLevel" :key="i">
          <video-card :_videos="level" :total="level.length" />
        </span>
      </div>

      <div v-if="!this.isEmpty(flexibilityVids)" class="col-3">
        <span v-for="(level, i) in flexibilityVidsbyLevel" :key="i">
          <video-card :_videos="level" :total="level.length" />
        </span>
      </div>
    </div>

    <div class="row">
      <div v-if="!this.isEmpty(recoveryVids)" class="col-3">
        <span v-for="(level, i) in recoveryVidsbyLevel" :key="i">
          <span>
            <video-card :_videos="level" :total="level.length" />
          </span>
        </span>
      </div>

      <div v-if="!this.isEmpty(ergonomicsVids)" class="col-3">
        <span v-for="(level, i) in ergonomicsVidsbyLevel" :key="i">
          <span>
            <video-card :_videos="level" :total="level.length" />
          </span>
        </span>
      </div>

      <div v-if="!this.isEmpty(nutritionVids)" class="col-3">
        <span v-for="(level, i) in nutritionVidsbyLevel" :key="i">
          <span>
            <video-card :_videos="level" :total="level.length" />
          </span>
        </span>
      </div>
    </div>

    <h1 class="text--secondary mt-4">Other Interesting Videos</h1>
    <div class="row">

      <!-- <div class="col-3" v-if="!this.isEmpty(videos)">
        <span>
          <youtube-video-card v-for="(video, i) in videos" :key="i" :video="video" />
        </span>
      </div> -->
    </div>
  </span>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import videosMixin from "../../mixins/videos-mixin";
import utilitiesMixin from "../../mixins/utilities-mixin";
import VideoCard from "../../components/VideoCard.vue";
//import YoutubeVideoCard from "../../components/YoutubeVideoCard.vue";
//import VideoModal from "../../components/VideoModal.vue";
//import youtube from "../../apis/youtube";

export default {
  name: "Videos",
  props: ["selectedTYCategory", "selectedFilter"],
  mixins: [videosMixin, utilitiesMixin],
  components: {
    VideoCard,
    //YoutubeVideoCard
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
      balanceVidsbyLevel: {},
      enduranceVidsbyLevel: {},
      strengthVidsbyLevel: {},
      flexibilityVidsbyLevel: {},
      recoveryVidsbyLevel: {},
      ergonomicsVidsbyLevel: {},
      nutritionVidsbyLevel: {},
      // Youtube
      /* dialog: false,
      valid: true,
      page: 1,
      start: 0,
      newVideo: {
        resourceId: "",
        category: "",
        level: "",
      },
      urlInput: "", */
    };
  },
  methods: {
    selectedCategory() {
      let vids = this.mcVideos.filter(
        (v) => v.category == this.favoriteCat && v.level == this.favoriteLev
      );
      return vids;
    },
    capitalizeFirstLet(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    seperateVideosbyCategory() {
      let bal = this.mcVideos.filter(
        (v) => v.category == "Balance" && v.level == this.balanceLevel
      );
      let end = this.mcVideos.filter(
        (v) => v.category == "Endurance" && v.level == this.enduranceLevel
      );
      let str = this.mcVideos.filter(
        (v) => v.category == "Strength" && v.level == this.strengthLevel
      );
      let flex = this.mcVideos.filter(
        (v) => v.category == "Flexibility-mobility" && v.level == this.flexLevel
      );
      let rec = this.mcVideos.filter(
        (v) => v.category == "Recovery" && v.level == "na"
      );
      let erg = this.mcVideos.filter(
        (v) => v.category == "Ergonomics" && v.level == "na"
      );
      let nut = this.mcVideos.filter(
        (v) => v.category == "Nutrition" && v.level == "na"
      );
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
    levelToLowercase(level) {
      switch (level) {
        case "L1":
          return "novice";
        case "L2":
          return "beginner";
        case "L3":
          return "competent";
        case "L4":
          return "proficient";
        case "L5":
          return "expert";
        case "na":
          return "novice";
      }
    },
    goBack() {
      this.play = false;
      this.$router.push("/activities/videos");
    },
    log(e) {
      console.log(e);
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
    getVideoNum(category, level, video) {
      console.log(category);
      console.log(video);
      console.log(level);
      console.log(this.mcVideos);
      let index = 0;
      // Refactoring for notifaction videos page

      /* let catList = this.videos.filter((v) => {
        v.category == category && v.level == level
      })
      console.log(catList)
      let vidNum = this.catList.findIndex(video)
      
      return {
        index: vidNum,
        count: catList.length,
      } */
      /* let lcLevel = this.levelToLowercase(level)
      if (category == "Flexibility-mobility") {
        let newVal = this.flexibilityVidsbyLevel.filter((k) => {
          if (k == lcLevel){
             k.indexOf(video)
          }
        })
        console.log(newVal)
        index = 0; */
      if (category == "Flexibility-mobility") {
        index = this.flexibilityVids.indexOf(video);
        return {
          index: index,
          count: this.flexibilityVids.length,
        };
      } else if (category == "Balance") {
        index = this.balanceVids.indexOf(video);
        return {
          index: index,
          count: this.balanceVids.length,
        };
      } else if (category == "Endurance") {
        index = this.enduranceVids.indexOf(video);
        return {
          index: index,
          count: this.enduranceVids.length,
        };
      } else if (category == "Ergonomics") {
        index = this.ergonomicsVids.indexOf(video);
        return {
          index: index,
          count: this.balanceVids.length,
        };
      } else if (category == "Strength") {
        index = this.strengthVids.indexOf(video);
        return {
          index: index,
          count: this.strengthVids.length,
        };
      } else if (category == "Recovery") {
        index = this.recoveryVids.indexOf(video);
        return {
          index: index,
          count: this.recoveryVids.length,
        };
      } else if (category == "Nutrition") {
        index = this.nutritionVids.indexOf(video);
        return {
          index: index,
          count: this.nutritionVids.length,
        };
      }
    },
    seperateVideosByLevel(array) {
      let novice = array.filter((v) => v.level == "L1");
      let beginner = array.filter((v) => v.level == "L2");
      let competent = array.filter((v) => v.level == "L3");
      let proficient = array.filter((v) => v.level == "L4");
      let expert = array.filter((v) => v.level == "L5");
      let na = array.filter((v) => v.level == "na");
      return {
        novice: novice,
        beginner: beginner,
        competent: competent,
        proficient: proficient,
        expert: expert,
        na: na,
      };
    },
    videosByLevel() {
      this.balanceVids[0]
        ? (this.balanceVidsbyLevel = this.seperateVideosByLevel(
          this.balanceVids
        ))
        : [];
      this.enduranceVids[0]
        ? (this.enduranceVidsbyLevel = this.seperateVideosByLevel(
          this.enduranceVids
        ))
        : [];
      this.ergonomicsVids[0]
        ? (this.ergonomicsVidsbyLevel = this.seperateVideosByLevel(
          this.ergonomicsVids
        ))
        : [];
      this.strengthVids[0]
        ? (this.strengthVidsbyLevel = this.seperateVideosByLevel(
          this.strengthVids
        ))
        : [];
      this.nutritionVids[0]
        ? (this.nutritionVidsbyLevel = this.seperateVideosByLevel(
          this.nutritionVids
        ))
        : [];
      this.flexibilityVids[0]
        ? (this.flexibilityVidsbyLevel = this.seperateVideosByLevel(
          this.flexibilityVids
        ))
        : [];
      this.recoveryVids[0]
        ? (this.recoveryVidsbyLevel = this.seperateVideosByLevel(
          this.recoveryVids
        ))
        : [];
    },
  },

  // YoutubeMethods
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
        this.categories[this.selectedYTCategory].value &&
        this.newVideo.level == this.levels[this.selectedFilter].value,
    });
    this.dialog = false;
  },
  openDialog() {
    this.resetForm();
    this.selectedYTCategory == 0
      ? (this.newVideo.category = "BALANCE")
      : (this.newVideo.category =
        this.categories[this.selectedYTCategory].value);
    this.selectedFilter == 0
      ? (this.newVideo.level = "L1")
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
  computed: {
    ...mapGetters(["preferences", "awsVideos", "isEditor", "saving", "videos"]),
    categoryTitle() {
      return this.categories[this.selectedYTCategory].title;
    },
    showAddBtn() {
      // Check if on Editors list and whether last filter (Favorites) is selected
      return this.isEditor && this.selectedFilter != this.filters.length - 1;
    },
    isLevel() {
      let filter = this.filters[this.selectedFilter].value;
      return (
        filter == "L1" ||
        filter == "L2" ||
        filter == "L3" ||
        filter == "L4" ||
        filter == "L5"
      );
    },
    totalPages() {
      return Math.ceil(this.awsVideos.length / 12);
    },
  },
  async mounted() {
    // Youtube Videos
    console.log(this.videos)
    console.log(this.selectedYTCategory)
    let category = "ALL";/* this.categories[this.selectedYTCategory].value; */
    let filter = "ALL";/* this.filters[this.selectedFilter].value; */
    console.log(category)
    console.log(filter)
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
  // MicroHealth Videos
  beforeMount() {
    this.nextVideo(this.favoriteCat, this.favoriteLev);
    this.selectedCategory();
    if (!this.$route.query.category && !this.$route.query.filter) {
     this.play = false;
    }
    this.seperateVideosbyCategory();
    this.videosByLevel();

    /* console.log(this.enduranceVidsbyLevel);
    console.log(this.ergonomicsVidsbyLevel);
    console.log(this.strengthVidsbyLevel);
    console.log(this.nutritionVidsbyLevel);
    console.log(this.flexibilityVidsbyLevel);
    console.log(this.recoveryVidsbyLevel); */
  },
  watch: {
    selectedYTCategory() {
      this.page = 1;
      let categoryQuery = this.categories[this.selectedYTCategory].query;
      let category = this.categories[this.selectedYTCategory].value;
      let filter = this.filters[this.selectedFilter].value;
      if (this.$route.query.category != categoryQuery) {
        this.$router.replace({
          name: "Videos",
          query: {
            category: this.categories[this.selectedYTCategory].query,
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
      let category = this.categories[this.selectedYTCategory].value;
      let filter = this.filters[this.selectedFilter].value;
      if (this.$route.query.filter != filterQuery) {
        this.$router.replace({
          name: "Videos",
          query: {
            category: this.categories[this.selectedYTCategory].query,
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

.goalHeaders {
  color: var(--mh-blue);
}

.video-container {
  position: relative;
  padding-bottom: 56.25%;
  /* 16:9 */
  height: 0;
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.floating-btn {
  bottom: 0;
  right: 0;
  position: fixed;
  margin-right: 7vw;
  margin-bottom: 7vh;
}

a {
  text-decoration: none;
}
</style>

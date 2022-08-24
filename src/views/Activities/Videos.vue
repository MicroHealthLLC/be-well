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
    <h1 class="text--secondary video-h1">MicroHealth Videos</h1>
    <v-btn @click="addNewWatchedVideo(newWatchedVideo)">Add Watched Video</v-btn>
    <v-btn @click="getWatchedVideos()">Fetch Watched Videos</v-btn>
    <v-btn @click="deleteWatchedVideos()">Remove All Watched Videos</v-btn>
    <div class="row mt-1">
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
      <div v-if="!this.isEmpty(recoveryVids) && recLevel && recLevel == 'NOT_APPLICABLE'" class="col-3">
        <span v-for="(level, i) in recoveryVidsbyLevel" :key="i">
          <span>
            <video-card :_videos="level" :total="level.length" />
          </span>
        </span>

      </div>

      <div v-if="!this.isEmpty(ergonomicsVids) && ergLevel && ergLevel == 'NOT_APPLICABLE'" class="col-3">
        <span v-for="(level, i) in ergonomicsVidsbyLevel" :key="i">
          <span>
            <video-card :_videos="level" :total="level.length" />
          </span>
        </span>
      </div>

      <div v-if="!this.isEmpty(nutritionVids) && nutritionLevel && nutritionLevel == 'NOT_APPLICABLE'" class="col-3">
        <span v-for="(level, i) in nutritionVidsbyLevel" :key="i">
          <span>
            <video-card :_videos="level" :total="level.length" />
          </span>
        </span>
      </div>
    </div>

    <h1 class="youtube-video-h1 video-h1 text--secondary mb-4">Other Interesting Videos</h1>
    <div v-if="videos.length > 0" class="row">
      <div v-for="(video, index) in videos" :key="index" class="col-3 mb-6">
        <youtube-video-card :video="video" />
      </div>
    </div>

    <v-btn v-if="showAddBtn" @click="openDialog" class="mt-5" color="primary" text>Add a New Video</v-btn>

    <!-- Add Video Dialog -->
    <v-dialog v-model="dialog" max-width="600">
      <v-card :disabled="saving" :loading="saving">
        <v-card-title>Add Video</v-card-title>
        <v-card-text>
          <v-form ref="videoform" v-model="valid">
            <v-text-field v-model="urlInput" @keydown.space.prevent label="YouTube Video Link"
              hint="Ex: https://www.youtube.com/watch?v=XXXXXX" persistent-hint :rules="[
                (v) => !!v || 'YouTube Video Link is required',
                (v) => urlCheck(v) || 'Not a valid URL',
              ]" required validate-on-blur></v-text-field>
            <v-select v-model="newVideo.category" :items="filteredCategories" item-text="title" item-value="value"
              label="Category" :rules="[(v) => !!v || 'Category is required']" required></v-select>
            <v-select v-model="newVideo.level" :items="filteredLevels" item-text="title" item-value="value"
              label="Level" :rules="[(v) => !!v || 'Level is required']" required></v-select>
          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-end">
          <v-btn @click="addNewVideo" class="px-6" color="var(--mh-blue)" dark>Submit</v-btn>
          <v-btn @click="dialog = false" color="secondary" outlined>Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Floating Add Video Button -->
    <v-btn v-if="showAddBtn" @click="openDialog" class="floating-btn" color="var(--mh-blue)" fab large dark>
      <v-icon large>mdi-plus</v-icon>
    </v-btn>
  </span>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import videosMixin from "../../mixins/videos-mixin";
import utilitiesMixin from "../../mixins/utilities-mixin";
import VideoCard from "../../components/VideoCard.vue";
import YoutubeVideoCard from "../../components/YoutubeVideoCard.vue";
//import VideoModal from "../../components/VideoModal.vue";
//import youtube from "../../apis/youtube";

export default {
  name: "Videos",
  props: ["selectedCategory", "selectedFilter"],
  mixins: [videosMixin, utilitiesMixin],
  components: {
    VideoCard,
    YoutubeVideoCard
  },
  data() {
    return {
      play: this.$route.query.category ? true : false,
      embedVideoURL: "https://www.youtube.com/embed/",
      notificationCat: this.$route.query.category
        ? this.capitalizeFirstLet(this.$route.query.category)
        : "",
      notificationLev: this.$route.query.filter
        ? this.filterToLevel(this.$route.query.filter)
        : "",
      balanceVids: [],
      enduranceVids: [],
      strengthVids: [],
      flexibilityVids: [],
      recoveryVids: [],
      ergonomicsVids: [],
      nutritionVids: [],
      balanceVidsbyLevel: [],
      enduranceVidsbyLevel: [],
      strengthVidsbyLevel: [],
      flexibilityVidsbyLevel: [],
      recoveryVidsbyLevel: [],
      ergonomicsVidsbyLevel: [],
      nutritionVidsbyLevel: [],
      // Youtube
      dialog: false,
      valid: true,
      page: 1,
      start: 0,
      newWatchedVideo: {
        title: "Sitting Ergonomics 1 1",
        videoId: "GwyuVcCBx0Q",
        category: "Ergonomics",
        level: "na",
        nextVideo: "ft2kze0WYJY",
      },
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
      "addWatchedVideo",
      "removeWatchedVideo",
      "fetchWatchedVideos",
      "fetchVideos",
      "fetchYTVideos",
      "fetchFavoriteVideos",
      "fetchAllFavoriteVideos",
    ]),
    selectedCat() {
      let vids = this.mhVideos.filter(
        (v) => v.category == this.notificationCat && v.level == this.notificationLev
      );
      return vids;
    },
    capitalizeFirstLet(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    seperateVideosbyCategory() {
      console.log(this.mhVideos)
      let bal = this.mhVideos.filter(
        (v) => v.category == "Balance" && v.level == this.balanceLevel
      );
      let end = this.mhVideos.filter(
        (v) => v.category == "Endurance" && v.level == this.enduranceLevel
      );
      let str = this.mhVideos.filter(
        (v) => v.category == "Strength" && v.level == this.strengthLevel
      );
      let flex = this.mhVideos.filter(
        (v) => v.category == "Flexibility-mobility" && v.level == this.flexLevel
      );
      let rec = this.mhVideos.filter(
        (v) => v.category == "Recovery" && v.level == "na"
      );
      let erg = this.mhVideos.filter(
        (v) => v.category == "Ergonomics" && v.level == "na"
      );
      let nut = this.mhVideos.filter(
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
      console.log(this.mhVideos);
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
    /* seperateVideosByLevel(array) {
      console.log(array)
      let novice = array.filter((v) => v.level == "L1");
      let beginner = array.filter((v) => v.level == "L2");
      let competent = array.filter((v) => v.level == "L3");
      let proficient = array.filter((v) => v.level == "L4");
      let expert = array.filter((v) => v.level == "L5");
      let na = array.filter((v) => v.level == "NOT_APPLICABLE");
      return {
        novice: novice,
        beginner: beginner,
        competent: competent,
        proficient: proficient,
        expert: expert,
        na: na,
      };
    }, */
    videosByLevel() {
      console.log(this.recoveryVids)
      this.balanceVids[0]
        ? (this.balanceVidsbyLevel = [this.balanceVids]
        )
        : [];
      this.enduranceVids[0]
        ? (this.enduranceVidsbyLevel = [this.enduranceVids]
        )
        : [];
      this.ergonomicsVids[0]
        ? (this.ergonomicsVidsbyLevel = [this.ergonomicsVids]
        )
        : [];
      this.strengthVids[0]
        ? (this.strengthVidsbyLevel = [this.strengthVids]
        )
        : [];
      this.nutritionVids[0]
        ? (this.nutritionVidsbyLevel = [this.nutritionVids]
        )
        : [];
      this.flexibilityVids[0]
        ? (this.flexibilityVidsbyLevel = [this.flexibilityVids]
        )
        : [];
      this.recoveryVids[0]
        ? (this.recoveryVidsbyLevel = [this.recoveryVids]
        )
        : [];
      console.log(this.recoveryVidsbyLevel)
    },
    // YoutubeMethods

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
      this.fetchVideos();
      this.dialog = false;
    },
    getWatchedVideos() {
      this.fetchWatchedVideos();
      console.log(this.watchedVideos)
    },
    deleteWatchedVideos() {
      if (this.watchedVideos) {
        this.watchedVideos.forEach(v => {
          this.removeWatchedVideo({ id: v.id })
        });
      }
      console.log(this.watchedVideos)
    },
    // Infinite Loop!! :(
    addNewWatchedVideo(v) {
      console.log(v)
      this.addWatchedVideo(v);

    },
    openDialog() {
      this.resetForm();
      this.selectedCategory == 0
        ? (this.newVideo.category = "BALANCE")
        : (this.newVideo.category =
          this.categories[this.selectedCategory].value);
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
  },
  computed: {
    ...mapGetters(["preferences", "awsVideos", "isEditor", "saving", "videos", "watchedVideos"]),
    categoryTitle() {
      return this.categories[this.selectedCategory].title;
    },
    showAddBtn() {
      // Check if on Editors list and whether last filter (Favorites) is selected
      //console.log(this.preferences)
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

  mounted() {
    let category = "ALL";/* this.categories[this.selectedCategory].value; */
    let filter = "ALL";/* this.filters[this.selectedFilter].value; */
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
    this.nextVideo(this.notificationCat, this.notificationLev);
    this.selectedCat();
    if (!this.$route.query.category && !this.$route.query.filter) {
      this.play = false;
    }
    console.log(this.preferences);
    if (!this.preferences) {
      this.fetchPreferences();
    }

    this.seperateVideosbyCategory();
    this.videosByLevel();

    /* console.log(this.enduranceVidsbyLevel);
    console.log(this.ergonomicsVidsbyLevel);
    console.log(this.strengthVidsbyLevel);
    console.log(this.nutritionVidsbyLevel);
    console.log(this.flexibilityVidsbyLevel);
    console.log(this.recoveryVidsbyLevel);*/
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
.youtube-video-h1 {
  margin-top: 60px;
}

.video-h1 {
  font-weight: 400;
}

.grid-container {
  display: grid;
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

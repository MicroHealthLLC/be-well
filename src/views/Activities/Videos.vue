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
        <v-card-title> Focus Area: {{ currentVideo.category }} </v-card-title>
        <v-card-text
          ><div>
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
              <!-- <v-chip outlined>{{ this.count }} of {{ this.total }}</v-chip> -->
            </v-chip>
          </div></v-card-text
        >
        <v-card-subtitle
          class="d-flex justify-space-between align-start flex-nowrap"
          ><v-chip
            v-if="currentVideo.level != 'na'"
            :color="levelToColor(currentVideo.level)"
            >{{ levelToString(currentVideo.level) }}</v-chip
          >
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
  <span v-else class="mt-2 mb-2 mb-sm-2 mt-sm-4">
    <span v-if="!this.isEmpty(balanceVids)">
      <span class="text-h6 text-sm-h5">
        <b class="goalHeaders">Balance Videos</b>
      </span>

      <v-divider class="mb-4"></v-divider>

      <span v-for="(level, i) in balanceVidsbyLevel" :key="i">
        <span class="grid-container mb-10">
          <video-card :_videos="level" :total="level.length" />
        </span>
      </span>
    </span>

    <span v-if="!this.isEmpty(enduranceVids)">
      <span class="text-h6 text-sm-h5"
        ><b class="goalHeaders">Endurance Videos</b>
      </span>

      <v-divider class="mb-4"></v-divider>

    <div class="row">
      <span class="col-2" width="auto" v-for="(level, i) in enduranceVidsbyLevel" :key="i">
        <span class="grid-container mb-10">
          <video-card :_videos="level" :total="level.length" />
        </span>
      </span>
      </div>
    </span>

    <span v-if="!this.isEmpty(strengthVids)">
      <span class="text-h6 text-sm-h5"
        ><b class="goalHeaders">Strength Videos</b>
      </span>

      <v-divider class="mb-4"></v-divider>

      <span v-for="(level, i) in strengthVidsbyLevel" :key="i">
        <span class="grid-container mb-10">
          <video-card :_videos="level" :total="level.length" />
        </span>
      </span>
    </span>

    <span v-if="!this.isEmpty(flexibilityVids)">
      <span class="text-h6 text-sm-h5"
        ><b class="goalHeaders">Flexibility & Mobility Videos</b>
      </span>

      <v-divider class="mb-4"></v-divider>

      <span v-for="(level, i) in flexibilityVidsbyLevel" :key="i">
        <span class="grid-container mb-10">
          <video-card :_videos="level" :total="level.length" />
        </span>
      </span>
    </span>

    <span v-if="!this.isEmpty(recoveryVids)">
      <span class="text-h6 text-sm-h5"
        ><b class="goalHeaders">Recovery Videos</b>
      </span>

      <v-divider class="mb-4"></v-divider>

      <span v-for="(level, i) in recoveryVidsbyLevel" :key="i">
        <span class="grid-container mb-10">
          <video-card :_videos="level" :total="level.length" />
        </span>
      </span>
    </span>

    <span v-if="!this.isEmpty(ergonomicsVids)">
      <span class="text-h6 text-sm-h5"
        ><b class="goalHeaders">Ergonomics Videos</b>
      </span>

      <v-divider class="mb-4"></v-divider>

      <span v-for="(level, i) in ergonomicsVidsbyLevel" :key="i">
        <span class="grid-container mb-10">
          <video-card :_videos="level" :total="level.length" />
        </span>
      </span>
    </span>

    <span v-if="!this.isEmpty(nutritionVids)">
      <span class="text-h6 text-sm-h5">
        <b class="goalHeaders">Nutrition Videos</b>
      </span>
      <v-divider class="mb-4"></v-divider>

      <span v-for="(level, i) in nutritionVidsbyLevel" :key="i">
        <span class="grid-container mb-10">
          <video-card :_videos="level" :total="level.length" />
        </span>
      </span>
    </span>
  </span>
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
      balanceVidsbyLevel: {},
      enduranceVidsbyLevel: {},
      strengthVidsbyLevel: {},
      flexibilityVidsbyLevel: {},
      recoveryVidsbyLevel: {},
      ergonomicsVidsbyLevel: {},
      nutritionVidsbyLevel: {},
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
      console.log(this.flexibilityVidsbyLevel);
      let index = 0;
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
    this.videosByLevel();

    console.log(this.enduranceVidsbyLevel);
    console.log(this.ergonomicsVidsbyLevel);
    console.log(this.strengthVidsbyLevel);
    console.log(this.nutritionVidsbyLevel);
    console.log(this.flexibilityVidsbyLevel);
    console.log(this.recoveryVidsbyLevel);
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

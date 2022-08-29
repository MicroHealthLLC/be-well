import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      currentVideo: {},
      mhVideos: [
        // Balance Videos
        {
          title: "Balance Beginner 1 1",
          videoId: "isIVduIDdi4",
          category: "Balance",
          level: "L1",
          nextVideo: "7kXNrWp7bHQ",
        },
        {
          title: "Balance Beginner 1 2",
          videoId: "7kXNrWp7bHQ",
          category: "Balance",
          level: "L1",
          nextVideo: "",
        },
        {
          title: "Balance Beginner 2 1",
          videoId: "-Q1Pv65SM6U",
          category: "Balance",
          level: "L2",
          nextVideo: "P12NmR9PGRI",
        },
        {
          title: "Balance Beginner 2 2",        
          videoId: "P12NmR9PGRI",
          category: "Balance",
          level: "L2",
          nextVideo: "",
        },
        {
          title: "Intermediate Balance 1 1",
          videoId: "5xT9k13v6Ls",
          category: "Balance",
          level: "L3",
          nextVideo: "rytZxljdyFE",
        },
        {
          title: "Intermediate Balance 1 2",
          videoId: "rytZxljdyFE",
          category: "Balance",
          level: "L3",
          nextVideo: "",
        },
        {
          title: "IntermediateBalance 2 1",
          videoId: "EYfkYOg1ra4",
          category: "Balance",
          level: "L4",
          nextVideo: "",
        },
        {
          title: "Balance Advanced 1 1",
          videoId: "FnQqMfNsmTI",
          category: "Balance",
          level: "L5",
          nextVideo: "",
        },
        // Endurance Videos
        {
          title: "Endurance Beginner 1 1",
          videoId: "o6IUlO2hBkk",
          category: "Endurance",
          level: "L1",
          nextVideo: "7RMsG2NNjLU",
        },
        {
          title: "Endurance Beginner 1 2",
          videoId: "7RMsG2NNjLU",
          category: "Endurance",
          level: "L1",
          nextVideo: "",
        },
        {
          title: "Endurance Beginner 2 1",
          videoId: "ax6fPkFbaI4",
          category: "Endurance",
          level: "L2",
          nextVideo: "voja3Ul-iRo",
        },
        {
          title: "Endurance Beginner 2 2",
          videoId: "voja3Ul-iRo",
          category: "Endurance",
          level: "L2",
          nextVideo: "",
        },
        {
          title: "Intermediate Endurance 1 1",
          videoId: "NGH8B_4_OkU",
          category: "Endurance",
          level: "L3",
          nextVideo: "eMBb7c9fIJ0",
        },
        {
          title: "Intermediate Endurance 1 2",
          videoId: "eMBb7c9fIJ0",
          category: "Endurance",
          level: "L3",
          nextVideo: "",
        },
        {
          title: "Intermediate Endurance 2 1",
          videoId: "F75LpW186tU",
          category: "Endurance",
          level: "L4",
          nextVideo: "01Mn0r3l2dI",
        },
        {
          title: "Intermediate Endurance 2 2",
          videoId: "01Mn0r3l2dI",
          category: "Endurance",
          level: "L4",
          nextVideo: "",
        },
        {
          title: "Endurance Advanced 1 1",
          videoId: "r3FgBgrWUhA",
          category: "Endurance",
          level: "L5",
          nextVideo: "0Hak187Nu_M",
        },
        {
          title: "Endurance Advanced 1 2",
          videoId: "0Hak187Nu_M",
          category: "Endurance",
          level: "L5",
          nextVideo: "",
        },
        // Strength Videos
        {
          title: "Beginner Strength 1 2",
          videoId: "yZsaRWXMAkc",
          category: "Strength",
          level: "L1",
          nextVideo: "",
        },
        {
          title: "Beginner Strength 2 1",
          videoId: "MwZ-DsBXT4k",
          category: "Strength",
          level: "L2",
          nextVideo: "HQiK7aN44Xg",
        },
        {
          title: "Beginner Strength 2 2",
          videoId: "HQiK7aN44Xg",
          category: "Strength",
          level: "L2",
          nextVideo: "",
        },
        {
          title: "Intermediate Strength 1 1",
          videoId: "zLfAWL1gCgU",
          category: "Strength",
          level: "L3",
          nextVideo: "W88-aOIZCVg",
        },
        {
          title: "Intermediate Strength 1 2",
          videoId: "W88-aOIZCVg",
          category: "Strength",
          level: "L3",
          nextVideo: "",
        },
        {
          title: "Intermediate Strength 2 1",
          videoId: "uxXpHZFM-no",
          category: "Strength",
          level: "L4",
          nextVideo: "23nvqIuCGnw",
        },
        {
          title: "Intermediate Strength 2 2",
          videoId: "23nvqIuCGnw",
          category: "Strength",
          level: "L4",
          nextVideo: "",
        },
        {
          title: "Advanced Strength 1 1",
          videoId: "oz1unfEYJ_o",
          category: "Strength",
          level: "L5",
          nextVideo: "xkgc4Pa71PQ",
        },
        {
          title: "Advanced Strength 1 2",
          videoId: "xkgc4Pa71PQ",
          category: "Strength",
          level: "L5",
          nextVideo: "",
        },
        // Flexibility & Mobility
        {
          title: "Beginner Stretching 1 1",
          videoId: "0U7gPbTn60s",
          category: "Flexibility-mobility",
          level: "L1",
          nextVideo: "OgRmcO4CmPU",
        },
        {
          title: "Beginner Stretching 1 2",
          videoId: "OgRmcO4CmPU",
          category: "Flexibility-mobility",
          level: "L1",
          nextVideo: "",
        },
        {
          title: "Beginner Stretching 2 1",
          videoId: "1_ligz-w4uM",
          category: "Flexibility-mobility",
          level: "L2",
          nextVideo: "RAEoE3nUC2Y",
        },
        {
          title: "Beginner Stretching 2 2",
          videoId: "RAEoE3nUC2Y",
          category: "Flexibility-mobility",
          level: "L2",
          nextVideo: "",
        },
        {
          title: "Intermediate Stretching 1 1",
          videoId: "5dWN4zaBym8",
          category: "Flexibility-mobility",
          level: "L3",
          nextVideo: "samWrACQ-hQ",
        },
        {
          title: "Intermediate Stretching 1 2",
          videoId: "samWrACQ-hQ",
          category: "Flexibility-mobility",
          level: "L3",
          nextVideo: "",
        },
        {
          title: "Intermediate Stretching 2 1",
          videoId: "kwPyjoi7Ux8",
          category: "Flexibility-mobility",
          level: "L4",
          nextVideo: "2eQTsfZYe3w",
        },
        {
          title: "Intermediate Stretching 2 2",
          videoId: "2eQTsfZYe3w",
          category: "Flexibility-mobility",
          level: "L4",
          nextVideo: "",
        },
        {
          title: "Advanced stretching 1",
          videoId: "n9L83mn06Tk",
          category: "Flexibility-mobility",
          level: "L5",
          nextVideo: "",
        },
        // Recovery Videos
        {
          title: "Active Recovery 1 1",
          videoId: "Geg0s4YYEe0",
          category: "Recovery",
          level: "na",
          nextVideo: "gwbXuEnMZ1A",
        },
        {
          title: "Active Recovery 1 2",
          videoId: "gwbXuEnMZ1A",
          category: "Recovery",
          level: "na",
          nextVideo: "NbLQK4afius",
        },
        {
          title: "Breathing Recovery 1 1",
          videoId: "NbLQK4afius",
          category: "Recovery",
          level: "na",
          nextVideo: "SMZgV7XE2LE",
        },
        {
          title: "Breathing Recovery 1 2",
          videoId: "SMZgV7XE2LE",
          category: "Recovery",
          level: "na",
          nextVideo: "WvRaMAsxsIw",
        },
        {
          title: "Cool Down Recovery 1 1",
          videoId: "WvRaMAsxsIw",
          category: "Recovery",
          level: "na",
          nextVideo: "0UEbqjiNR9c",
        },
        {
          title: "Cool Down Recovery 1 2",
          videoId: "0UEbqjiNR9c",
          category: "Recovery",
          level: "na",
          nextVideo: "wkvan1b3P_E",
        },
        {
          title: "Myofascial Release Recovery 1 1",
          videoId: "wkvan1b3P_E",
          category: "Recovery",
          level: "na",
          nextVideo: "m78TSrhyr0Q",
        },
        {
          title: "Myofascial Release Recovery 1 2",
          videoId: "m78TSrhyr0Q",
          category: "Recovery",
          level: "na",
          nextVideo: "H3a43Zr-kEg",
        },
        {
          title: "Sleeping Recovery 1 1",
          videoId: "H3a43Zr-kEg",
          category: "Recovery",
          level: "na",
          nextVideo: "gy5JycEQCDY",
        },
        {
          title: "Sleeping Recovery 1 2",
          videoId: "gy5JycEQCDY",
          category: "Recovery",
          level: "na",
          nextVideo: "",
        },
        // Ergonomics
        {
          title: "Sitting Ergonomics 1 1",
          videoId: "GwyuVcCBx0Q",
          category: "Ergonomics",
          level: "na",
          nextVideo: "ft2kze0WYJY",
        },
        {
          title: "Sitting Ergonomics 1 2",
          videoId: "ft2kze0WYJY",
          category: "Ergonomics",
          level: "na",
          nextVideo: "7ZT9Gr2_YZU",
        },
        {
          title: "Standing Ergonomics 1 1",
          videoId: "7ZT9Gr2_YZU",
          category: "Ergonomics",
          level: "na",
          nextVideo: "Y8KcLwk-Z-k",
        },
        {
          title: "Standing Ergonomics 1 2",
          videoId: "Y8KcLwk-Z-k",
          category: "Ergonomics",
          level: "na",
          nextVideo: "Ji7YRJHGWFo",
        },
        {
          title: "Walking Ergonomics 1 1",
          videoId: "Ji7YRJHGWFo",
          category: "Ergonomics",
          level: "na",
          nextVideo: "SIlSLgcSqAk",
        },
        {
          title: "Walking Ergonomics 1 2",
          videoId: "SIlSLgcSqAk",
          category: "Ergonomics",
          level: "na",
          nextVideo: "Dl5eHpq7tMk",
        },
        {
          title: "Running Ergonomics 1 1",
          videoId: "Dl5eHpq7tMk",
          category: "Ergonomics",
          level: "na",
          nextVideo: "1SXcKlcQ5os",
        },
        {
          title: "Running Ergonomics 1 2",
          videoId: "1SXcKlcQ5os",
          category: "Ergonomics",
          level: "na",
          nextVideo: "mvFFdRXKYpk",
        },
        {
          title: "Sleeping Ergonomics 1 1",
          videoId: "mvFFdRXKYpk",
          category: "Ergonomics",
          level: "na",
          nextVideo: "dMfDnqT-oZo",
        },
        {
          title: "Sleeping Ergonomics 1 2",
          videoId: "dMfDnqT-oZo",
          category: "Ergonomics",
          level: "na",
          nextVideo: "TXzP2C4rt8U",
        },
        {
          title: "Typing Ergonomics 1 1",
          videoId: "TXzP2C4rt8U",
          category: "Ergonomics",
          level: "na",
          nextVideo: "vYQQ95YhIKI",
        },
        {
          title: "Typing Ergonomics 1 2",
          videoId: "vYQQ95YhIKI",
          category: "Ergonomics",
          level: "na",
          nextVideo: "",
        },
        {
          title: "Food & Hydration 1 1",
          videoId: "r-CtynFrVhw",
          category: "Nutrition",
          level: "na",
          nextVideo: "cN-jF7VplJc",
        },
        {
          title: "Food & Hydration 1 2",
          videoId: "cN-jF7VplJc",
          category: "Nutrition",
          level: "na",
          nextVideo: "",
        },
      ],
    };
  },
  /* mounted() {
    this.fetchWatchedVideos()
  }, */
  methods: {
    ...mapActions([
      "fetchWatchedVideos",
    ]),
    nextVideo(category, level) {
      if (this.isEmpty(this.currentVideo)) {  
        let selected = this.mhVideos.filter(
          (v) => v.category == category && v.level == level && !this.getIdsArray(this.watchedVideos).includes(v.videoId)
        );
        if (selected[0]) {
          this.currentVideo = selected[0];
        } else this.closeModal();
        
        console.log(level
          + " "
          + category
          + " "
          + "Progress: " 
          + this.getCompletedActivities(category, level).length 
          + " / " 
          + this.getActivities(category, level).length)
      } /* else {
        let current = this.mhVideos.filter(
          (v) => v.videoId == this.currentVideo.videoId
        );
        if (current[0].nextVideo) {
          let next = this.mhVideos.filter(
            (v) => v.videoId == current[0].nextVideo
          );
          this.currentVideo = next[0];
        } else {
          this.currentVideo = false;
        }
      } */
    },
    capitalizeFirstLet(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    isEmpty(obj) {
      return Object.keys(obj).length === 0;
    },
    getIdsArray(array) {
      return array.map((v) => v.videoId)
    },
    getActivities(cat, lev) {
      return this.mhVideos.filter((v) => v.category == cat && v.level == lev)
    },
    getCompletedActivities(cat, lev) {
      let catVids = this.getActivities(cat, lev)
      return catVids.filter((v) => this.getIdsArray(this.watchedVideos).includes(v.videoId))
    },
    getProgressValue(cat, lev) {
      //console.log(cat, lev)
      return this.getCompletedActivities(cat, lev).length / this.getActivities(cat, lev).length * 100
    },
    getGoalProgressValue(reminders) {
      let total = 0
      if (reminders) {
        reminders.forEach((r) => {
          let val = this.getCompletedActivities(this.capitalizeFirstLet((r.category).toLowerCase()),
          this.checkForNA(r.level)).length / this.getActivities(this.capitalizeFirstLet((r.category).toLowerCase()),
          this.checkForNA(r.level)).length
          total += val
        })
      return total / reminders.length * 100
      }
    },
    closeModal() {
      console.log("Completed")
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
        case "na":
          return "";  
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
    checkForNA(level) {
      return level == "NOT_APPLICABLE" ? "na" : level
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
    ...mapGetters(["watchedVideos",]),
  },
};

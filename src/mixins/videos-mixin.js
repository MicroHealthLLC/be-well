export default {
  data() {
    return {
      currentVideo: {},
      videos: [
        // Endurance Videos
        {
          title:"Endurance Beginner 1 1",
          videoId: "o6IUlO2hBkk",
          category: "Endurance",
          level: "L1",
          nextVideo: "7RMsG2NNjLU",
        },
        {
          title:"Beginner Endurance 1 2",
          videoId: "7RMsG2NNjLU",
          category: "Endurance",
          level: "L1",
          nextVideo: "ax6fPkFbaI4",
        },
        {
          title:"Endruance Beginner 2 1",
          videoId: "ax6fPkFbaI4",
          category: "Endurance",
          level: "L2",
          nextVideo: "voja3Ul-iRo",
        },
        {
          title:"Endurance Beginner 2 1",
          videoId: "voja3Ul-iRo",
          category: "Endurance",
          level: "L2",
          nextVideo: "NGH8B_4_OkU",
        },
        {
          title:"Intermediate Endurance 1 1",
          videoId: "NGH8B_4_OkU",
          category: "Endurance",
          level: "L3",
          nextVideo: "eMBb7c9fIJ0",
        },
        {
          title:"Intermediate Endurance 1 2",
          videoId: "eMBb7c9fIJ0",
          category: "Endurance",
          level: "L3",
          nextVideo: "F75LpW186tU",
        },
        {
          title:"Intermediate Endurance 2 1",
          videoId: "F75LpW186tU",
          category: "Endurance",
          level: "L4",
          nextVideo: "01Mn0r3l2dI",
        },
        {
          title:"Intermediate Endurance 2 2",
          videoId: "01Mn0r3l2dI",
          category: "Endurance",
          level: "L4",
          nextVideo: "r3FgBgrWUhA",
        },
        {
          title:"Endurance Advanced 1 1",
          videoId: "r3FgBgrWUhA",
          category: "Endurance",
          level: "L5",
          nextVideo: "0Hak187Nu_M",
        },
        {
          title:"Endurance Advanced 1 2",
          videoId: "0Hak187Nu_M",
          category: "Endurance",
          level: "L5",
          nextVideo: "",
        },
        // Strength Videos
        {
          title:"Beginner Strength 1 2",
          videoId: "yZsaRWXMAkc",
          category: "Strength",
          level: "L1",
          nextVideo: "MwZ-DsBXT4k",
        },
        {
          title:"Beginner Strength 2 1",
          videoId: "MwZ-DsBXT4k",
          category: "Strength",
          level: "L2",
          nextVideo: "HQiK7aN44Xg",
        },
        {
          title:"Beginner Strength 2 2",
          videoId: "HQiK7aN44Xg",
          category: "Strength",
          level: "L2",
          nextVideo: "zLfAWL1gCgU",
        },
        {
          title:"Intermediate Strength 1 1",
          videoId: "zLfAWL1gCgU",
          category: "Strength",
          level: "L3",
          nextVideo: "W88-aOIZCVg",
        },
        {
          title:"Intermediate Strength 1 2",
          videoId: "W88-aOIZCVg",
          category: "Strength",
          level: "L3",
          nextVideo: "uxXpHZFM-no",
        },
        {
          title:"Intermediate Strength 2 1",
          videoId: "uxXpHZFM-no",
          category: "Strength",
          level: "L4",
          nextVideo: "23nvqIuCGnw",
        },
        {
          title:"Intermediate Strength 2 2",
          videoId: "23nvqIuCGnw",
          category: "Strength",
          level: "L4",
          nextVideo: "oz1unfEYJ_o",
        },
        {
          title:"Advanced Strength 1 1",
          videoId: "oz1unfEYJ_o",
          category: "Strength",
          level: "L5",
          nextVideo: "xkgc4Pa71PQ",
        },
        {
          title:"Advanced Strength 1 2",
          videoId: "xkgc4Pa71PQ",
          category: "Strength",
          level: "L5",
          nextVideo: "",
        },
        // Flexability & Mobility
        {
          title:"Beginner Stretching 1 1",
          videoId: "0U7gPbTn60s",
          category: "Flexability & Mobility",
          level: "L1",
          nextVideo: "OgRmcO4CmPU",
        },
        {
          title:"Beginner Stretching 1 2",
          videoId: "OgRmcO4CmPU",
          category: "Flexability & Mobility",
          level: "L1",
          nextVideo: "1_ligz-w4uM",
        },
        {
          title:"Beginner Stretching 2 1",
          videoId: "1_ligz-w4uM",
          category: "Flexability & Mobility",
          level: "L2",
          nextVideo: "RAEoE3nUC2Y",
        },
        {
          title:"Beginner Stretching 2 2",
          videoId: "RAEoE3nUC2Y",
          category: "Flexability & Mobility",
          level: "L2",
          nextVideo: "5dWN4zaBym8",
        },
        {
          title:"Intermediate Stretching 1 1",
          videoId: "5dWN4zaBym8",
          category: "Flexability & Mobility",
          level: "L3",
          nextVideo: "samWrACQ-hQ",
        },
        {
          title:"Intermediate Stretching 1 2",
          videoId: "samWrACQ-hQ",
          category: "Flexability & Mobility",
          level: "L3",
          nextVideo: "kwPyjoi7Ux8",
        },
        {
          title:"Intermediate Stretching 2 1",
          videoId: "kwPyjoi7Ux8",
          category: "Flexability & Mobility",
          level: "L4",
          nextVideo: "2eQTsfZYe3w",
        },
        {
          title:"Intermediate Stretching 2 2",
          videoId: "2eQTsfZYe3w",
          category: "Flexability & Mobility",
          level: "L4",
          nextVideo: "9L83mn06Tk",
        },
        {
          title:"Advanced stretching 1",
          videoId: "9L83mn06Tk",
          category: "Flexability & Mobility",
          level: "L5",
          nextVideo: "",
        },
        // Recovery Videos
        {
          title:"Active Recovery 1 1",
          videoId: "Geg0s4YYEe0",
          category: "Recovery",
          level: "n/a",
          nextVideo: "gwbXuEnMZ1A",
        },
        {
          title:"Active Recovery 1 2",
          videoId: "gwbXuEnMZ1A",
          category: "Recovery",
          level: "n/a",
          nextVideo: "NbLQK4afius",
        },
        {
          title:"Breathing Recovery 1 1",
          videoId: "NbLQK4afius",
          category: "Recovery",
          level: "n/a",
          nextVideo: "SMZgV7XE2LE",
        },
        {
          title:"Breathing Recovery 1 2",
          videoId: "SMZgV7XE2LE",
          category: "Recovery",
          level: "n/a",
          nextVideo: "WvRaMAsxsIw",
        },
        {
          title:"Cool Down Recovery 1 1",
          videoId: "WvRaMAsxsIw",
          category: "Recovery",
          level: "n/a",
          nextVideo: "0UEbqjiNR9c",
        },
        {
          title:"Cool Down Recovery 1 2",
          videoId: "0UEbqjiNR9c",
          category: "Recovery",
          level: "n/a",
          nextVideo: "wkvan1b3P_E",
        },
        {
          title:"Myofascial Release Recovery 1 1",
          videoId: "wkvan1b3P_E",
          category: "Recovery",
          level: "n/a",
          nextVideo: "m78TSrhyr0Q",
        },
        {
          title:"Myofascial Release Recovery 1 2",
          videoId: "m78TSrhyr0Q",
          category: "Recovery",
          level: "n/a",
          nextVideo: "H3a43Zr-kEg",
        },
        {
          title:"Sleeping Recovery 1 1",
          videoId: "H3a43Zr-kEg",
          category: "Recovery",
          level: "n/a",
          nextVideo: "gy5JycEQCDY",
        },
        {
          title:"Sleeping Recovery 1 2",
          videoId: "gy5JycEQCDY",
          category: "Recovery",
          level: "n/a",
          nextVideo: "",
        },
        // Ergonomics
        {
          title: "Sitting Ergonomics 1 1",
          videoId: "GwyuVcCBx0Q",
          category: "Ergonomics",
          level: "n/a",
          nextVideo: "ft2kze0WYJY",
        },
        {
          title: "Sitting Ergonomics 1 2",
          videoId: "ft2kze0WYJY",
          category: "Ergonomics",
          level: "n/a",
          nextVideo: "7ZT9Gr2_YZU",
        },
        {
          title: "Standing Ergonomics 1 1",
          videoId: "7ZT9Gr2_YZU",
          category: "Ergonomics",
          level: "n/a",
          nextVideo: "Y8KcLwk-Z-k",
        },
        {
          title: "Standing Ergonomics 1 2",
          videoId: "Y8KcLwk-Z-k",
          category: "Ergonomics",
          level: "n/a",
          nextVideo: "Ji7YRJHGWFo",
        },
        {
          title: "Walking Ergonomics 1 1",
          videoId: "Ji7YRJHGWFo",
          category: "Ergonomics",
          level: "n/a",
          nextVideo: "SIlSLgcSqAk",
        },
        {
          title: "Walking Ergonomics 1 2",
          videoId: "SIlSLgcSqAk",
          category: "Ergonomics",
          level: "n/a",
          nextVideo: "Dl5eHpq7tMk",
        },
        {
          title: "Running Ergonomics 1 1",
          videoId: "Dl5eHpq7tMk",
          category: "Ergonomics",
          level: "n/a",
          nextVideo: "1SXcKlcQ5os",
        },
        {
          title: "Running Ergonomics 1 2",
          videoId: "1SXcKlcQ5os",
          category: "Ergonomics",
          level: "n/a",
          nextVideo: "mvFFdRXKYpk",
        },
        {
          title: "Sleeping Ergonomics 1 1",
          videoId: "mvFFdRXKYpk",
          category: "Ergonomics",
          level: "n/a",
          nextVideo: "dMfDnqT-oZo",
        },
        {
          title: "Sleeping Ergonomics 1 2",
          videoId: "dMfDnqT-oZo",
          category: "Ergonomics",
          level: "n/a",
          nextVideo: "TXzP2C4rt8U",
        },
        {
          title: "Typing Ergonomics 1 1",
          videoId: "TXzP2C4rt8U",
          category: "Ergonomics",
          level: "n/a",
          nextVideo: "vYQQ95YhIKI",
        },
        {
          title: "Typing Ergonomics 1 2",
          videoId: "vYQQ95YhIKI",
          category: "Ergonomics",
          level: "n/a",
          nextVideo: "",
        },
        {
          title: "Food & Hydration 1 1",
          videoId: "r-CtynFrVhw",
          category: "Nutrition",
          level: "n/a",
          nextVideo: "cN-jF7VplJc",
        },
        {
          title: "Food & Hydration 1 2",
          videoId: "cN-jF7VplJc",
          category: "Nutrition",
          level: "n/a",
          nextVideo: "",
        },
      ],
    };
  },
  methods: {
    nextVideo() {
      if (this.isEmpty(this.currentVideo)) {
        this.currentVideo = this.videos[0];
      } else {
        let current = this.videos.filter(
          (v) => v.videoId == this.currentVideo.videoId
        );
        if (current[0].nextVideo){
          let next = this.videos.filter((v) => v.videoId == current[0].nextVideo);
          this.currentVideo = next[0];
        } else {
          this.currentVideo = {}
        }
        
        
      }
    },
    isEmpty(obj) {
      return Object.keys(obj).length === 0;
    },
  },
  computed: {},
};

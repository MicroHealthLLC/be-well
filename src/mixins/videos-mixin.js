export default {
  data() {
    return {
      currentVideo: {},
      videos: [
        {
          videoId: "o6IUlO2hBkk",
          category: "Endurance",
          level: "L1",
          nextVideo: "7RMsG2NNjLU",
        },
        {
          videoId: "7RMsG2NNjLU",
          category: "Endurance",
          level: "L1",
          nextVideo: "ax6fPkFbaI4",
        },
        {
          videoId: "ax6fPkFbaI4",
          category: "Endurance",
          level: "L2",
          nextVideo: "voja3Ul-iRo",
        },
        {
          videoId: "voja3Ul-iRo",
          category: "Endurance",
          level: "L2",
          nextVideo: "NGH8B_4_OkU",
        },
        {
          videoId: "NGH8B_4_OkU",
          category: "Endurance",
          level: "L3",
          nextVideo: "eMBb7c9fIJ0",
        },
        {
          videoId: "eMBb7c9fIJ0",
          category: "Endurance",
          level: "L3",
          nextVideo: "F75LpW186tU",
        },
        {
          videoId: "F75LpW186tU",
          category: "Endurance",
          level: "L4",
          nextVideo: "01Mn0r3l2dI",
        },
        {
          videoId: "01Mn0r3l2dI",
          category: "Endurance",
          level: "L4",
          nextVideo: "r3FgBgrWUhA",
        },
        {
          videoId: "r3FgBgrWUhA",
          category: "Endurance",
          level: "L5",
          nextVideo: "0Hak187Nu_M",
        },
        {
          videoId: "0Hak187Nu_M",
          category: "Endurance",
          level: "L5",
          nextVideo: "o6IUlO2hBkk",
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
        let next = this.videos.filter((v) => v.videoId == current[0].nextVideo)
        this.currentVideo = next[0];
      }
    },
    isEmpty(obj) {
      return Object.keys(obj).length === 0;
    },
  },
  computed: {},
};

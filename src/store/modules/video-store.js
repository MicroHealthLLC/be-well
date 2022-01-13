import { API, graphqlOperation } from "aws-amplify";
import { createVideo, deleteVideo } from "@/graphql/mutations"; // prettier-ignore
import { listVideos, videosByCategory } from "@/graphql/queries"; // prettier-ignore
import axios from "axios";

const youtubeURL = "https://www.googleapis.com/youtube/v3/videos";

export default {
  state: {
    videos: [],
    awsVideos: [],
  },
  actions: {
    async addVideo({ commit }, { video, currentCategory }) {
      try {
        const res = await API.graphql(
          graphqlOperation(createVideo, { input: video })
        );

        await axios({
          method: "GET",
          url: youtubeURL,
          params: {
            part: "contentDetails,snippet",
            key: process.env.VUE_APP_YOUTUBE_API_KEY,
            id: res.data.createVideo.resourceId,
          },
        }).then((res) => {
          let newVideo = res.data.items[0];
          // Add video to videos in state if currently on same category page
          if (currentCategory) {
            commit("ADD_VIDEO", {
              ...video,
              contentDetails: newVideo.contentDetails,
              etag: newVideo.etag,
              youtubeId: newVideo.id,
              kind: newVideo.kind,
              snippet: newVideo.snippet,
            });
          }
        });
        commit("SET_SNACKBAR", {
          show: true,
          message: "Video Successfully Added!",
          color: "var(--mh-green)",
        });
      } catch (error) {
        console.log(error);
        commit("SET_SNACKBAR", {
          show: true,
          message: `Error: ${error.message}`,
          color: "var(--mh-orange)",
        });
      }
    },
    async fetchVideos({ commit }, filters) {
      try {
        // First fetch AWS video references
        const res = await API.graphql(graphqlOperation(listVideos, filters));
        const awsVideos = res.data.listVideos.items;
        const videoIds = res.data.listVideos.items
          .map((video) => video.resourceId)
          .join(",");
        // Then grab YouTube video data based on ids from above response
        await axios({
          method: "GET",
          url: youtubeURL,
          params: {
            part: "contentDetails,snippet",
            key: process.env.VUE_APP_YOUTUBE_API_KEY,
            id: videoIds,
          },
        }).then((res) => {
          let mergedVideos = [];
          res.data.items.forEach((item) => {
            let video = awsVideos.find(
              (awsVideo) => awsVideo.resourceId == item.id
            );
            // Combine both AWS video reference and YouTube video data
            mergedVideos.push({
              ...video,
              contentDetails: item.contentDetails,
              etag: item.etag,
              youtubeId: item.id,
              kind: item.kind,
              snippet: item.snippet,
            });
          });
          commit("SET_VIDEOS", mergedVideos);
        });
      } catch (error) {
        console.log(error);
      }
    },
    async fetchCategoryVideos({ commit }, category) {
      try {
        // First fetch AWS video references
        const res = await API.graphql(
          graphqlOperation(videosByCategory, { category: category })
        );
        const awsVideos = res.data.videosByCategory.items;
        const videoIds = res.data.videosByCategory.items
          .map((video) => video.resourceId)
          .join(",");
        // Then grab YouTube video data based on ids from above response
        await axios({
          method: "GET",
          url: youtubeURL,
          params: {
            part: "contentDetails,snippet",
            key: process.env.VUE_APP_YOUTUBE_API_KEY,
            id: videoIds,
          },
        }).then((res) => {
          let mergedVideos = [];
          res.data.items.forEach((item) => {
            let video = awsVideos.find(
              (awsVideo) => awsVideo.resourceId == item.id
            );
            // Combine both AWS video reference and YouTube video data
            mergedVideos.push({
              ...video,
              contentDetails: item.contentDetails,
              etag: item.etag,
              youtubeId: item.id,
              kind: item.kind,
              snippet: item.snippet,
            });
          });
          commit("SET_VIDEOS", mergedVideos);
        });
      } catch (error) {
        console.log(error);
      }
    },
    async fetchLatestVideos({ commit }) {
      try {
        const res = await API.graphql(
          graphqlOperation(listVideos, { limit: 3 })
        );
        const awsVideos = res.data.listVideos.items;
        const videoIds = res.data.listVideos.items
          .map((video) => video.resourceId)
          .join(",");

        await axios({
          method: "GET",
          url: youtubeURL,
          params: {
            part: "contentDetails,snippet",
            key: process.env.VUE_APP_YOUTUBE_API_KEY,
            id: videoIds,
          },
        }).then((res) => {
          let mergedVideos = [];
          res.data.items.forEach((item) => {
            let video = awsVideos.find(
              (awsVideo) => awsVideo.resourceId == item.id
            );
            // Combine both AWS video reference and YouTube video data
            mergedVideos.push({
              ...video,
              contentDetails: item.contentDetails,
              etag: item.etag,
              youtubeId: item.id,
              kind: item.kind,
              snippet: item.snippet,
            });
          });
          commit("SET_VIDEOS", mergedVideos);
        });
      } catch (error) {
        console.log(error);
      }
    },
    async deleteVideo({ commit }, id) {
      try {
        await API.graphql(graphqlOperation(deleteVideo, { input: { id: id } }));
        commit("DELETE_VIDEO", id);
        commit("SET_SNACKBAR", {
          show: true,
          message: "Video Removed",
          color: "var(--mh-orange)",
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
  mutations: {
    ADD_VIDEO: (state, video) => state.videos.push(video),
    SET_VIDEOS: (state, videos) => (state.videos = videos),
    SET_AWS_VIDEOS: (state, videos) => (state.awsVideos = videos),
    DELETE_VIDEO: (state, id) => {
      let deleteIndex = state.videos.findIndex((video) => video.id == id);
      state.videos.splice(deleteIndex, 1);
    },
  },
  getters: {
    videos: (state) => state.videos,
    beginnerVideos: (state) =>
      state.videos.filter((video) => video.level == "BEGINNER"),
    intermediateVideos: (state) =>
      state.videos.filter((video) => video.level == "INTERMEDIATE"),
    advancedVideos: (state) =>
      state.videos.filter((video) => video.level == "ADVANCED"),
  },
};

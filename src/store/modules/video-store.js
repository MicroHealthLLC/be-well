import { API, graphqlOperation } from "aws-amplify";
import { createFavoriteVideo, createVideo, deleteFavoriteVideo, deleteVideo } from "@/graphql/mutations"; // prettier-ignore
import { listVideos, videosByCategory } from "@/graphql/queries"; // prettier-ignore
import axios from "axios";

const youtubeURL = "https://www.googleapis.com/youtube/v3/videos";

export default {
  state: {
    videos: [],
    awsVideos: [],
    favoriteVideos: [],
  },
  actions: {
    async addVideo({ commit }, { video, currentCategory }) {
      commit("TOGGLE_SAVING", true);
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
      commit("TOGGLE_SAVING", false);
    },
    async fetchVideos({ commit, dispatch }, filters) {
      try {
        // First fetch AWS video references
        const res = await API.graphql(graphqlOperation(listVideos, filters));
        const awsVideos = res.data.listVideos.items;
        commit("SET_AWS_VIDEOS", awsVideos);
        dispatch("fetchYTVideos", 0);
      } catch (error) {
        console.log(error);
      }
    },
    async fetchYTVideos({ commit, getters }, start) {
      const videoIds = getters.awsVideos
        .slice(start, start + 12)
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
          let video = getters.awsVideos.find(
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
    // Favorite Video Queries and Mutations
    async addFavoriteVideo({ commit, dispatch }, favoriteVideo) {
      try {
        await API.graphql(
          graphqlOperation(createFavoriteVideo, { input: favoriteVideo })
        );
        commit("SET_SNACKBAR", {
          show: true,
          message: "Favorite Video Successfully Added!",
          color: "var(--mh-green)",
        });
        dispatch("fetchAllFavoriteVideos");
      } catch (error) {
        console.log(error);
      }
    },
    async fetchAllFavoriteVideos({ commit }) {
      try {
        const res = await API.graphql(
          graphqlOperation(` 
            query FavoriteVideos {
              listFavoriteVideos {
                items {
                  id
                  videoId
                }
              }
            }
          `)
        );
        commit("SET_FAVORITE_VIDEOS", res.data.listFavoriteVideos.items);
      } catch (error) {
        console.log(error);
      }
    },
    async fetchFavoriteVideos({ commit, dispatch }, category) {
      let res = {};

      try {
        if (category == "ALL") {
          res = await API.graphql(
            graphqlOperation(` 
            query FavoriteVideos {
              listFavoriteVideos {
                items {
                  id
                  videoId
                  video {
                    category
                    createdAt
                    id
                    level
                    resourceId
                    updatedAt
                  }
                }
              }
            }
          `)
          );
        } else {
          res = await API.graphql(
            graphqlOperation(` 
            query FavoriteVideos {
              listFavoriteVideos(filter: {category: {eq: ${category}}}) {
                items {
                  id
                  videoId
                  video {
                    category
                    createdAt
                    id
                    level
                    resourceId
                    updatedAt
                  }
                }
              }
            }
          `)
          );
        }
        const awsVideos = res.data.listFavoriteVideos.items
          .filter((item) => !!item.video)
          .map((item) => item.video);
        commit("SET_AWS_VIDEOS", awsVideos);
        dispatch("fetchYTVideos", 0);
      } catch (error) {
        console.log(error);
      }
    },
    async deleteFavoriteVideo({ commit, dispatch }, id) {
      try {
        await API.graphql(
          graphqlOperation(deleteFavoriteVideo, { input: { id: id } })
        );
        commit("SET_SNACKBAR", {
          show: true,
          message: "Favorite Video Removed",
          color: "var(--mh-orange)",
        });
        dispatch("fetchAllFavoriteVideos");
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
    SET_FAVORITE_VIDEOS: (state, videos) => (state.favoriteVideos = videos),
  },
  getters: {
    awsVideos: (state) => state.awsVideos,
    videos: (state) => state.videos,
    favoriteVideos: (state) => state.favoriteVideos,
  },
};

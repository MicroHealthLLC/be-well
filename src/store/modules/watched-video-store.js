import { API, graphqlOperation } from "aws-amplify";
import { createWatchedVideo } from "@/graphql/mutations";
import { deleteWatchedVideo } from "@/graphql/mutations";
import { listWatchedVideos } from "@/graphql/queries";

export default {
  state: {
    watched_videos: [],
  },
  actions: {
    async addWatchedVideo({ commit, dispatch }, video) {
      commit("TOGGLE_SAVING", true);
      try {
        await API.graphql(graphqlOperation(createWatchedVideo, { input: video }));
        dispatch("fetchWatchedVideos");
        commit("SET_SNACKBAR", {
          show: true,
          message: "Video Added to Watched List!",
          color: "var(--mh-green)",
        });
      } catch (error) {
        console.log(error);
      }
      commit("TOGGLE_SAVING", false);
    },
    async removeWatchedVideo({ commit, dispatch }, id) {
      try {
        await API.graphql(graphqlOperation(deleteWatchedVideo, { input: id }));
        dispatch("fetchWatchedVideos");
        commit("SET_SNACKBAR", {
          show: true,
          message: "Watched Videos Reset",
          color: "var(--mh-orange)",
        });
      } catch (error) {
        console.log(error);
      }
    },
    async fetchWatchedVideos({ commit }) {
      try {
        const res = await API.graphql(graphqlOperation(listWatchedVideos));
        commit("SET_WATCHED_VIDEOS", res.data.listWatchedVideos.items);
      } catch (error) {
        console.log(error);
      }
    },
  },
  mutations: {
    ADD_WATCHED_VIDEO: (state, video) => state.watched_videos.push(video),
    SET_WATCHED_VIDEOS: (state, videos) => (state.watched_videos = videos),
  },
  getters: {
    watchedVideos: (state) => state.watched_videos,
  },
};

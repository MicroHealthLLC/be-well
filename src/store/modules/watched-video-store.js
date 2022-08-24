import { API, graphqlOperation } from "aws-amplify";
import { createWatchedVideo } from "@/graphql/mutations";
import { deleteWatchedVideo } from "@/graphql/mutations";
import { listWatchedVideos } from "@/graphql/queries";

export default {
  state: {
    watchedVideos: [],
  },
  actions: {
    async addWatchedVideo({ commit, dispatch }, video) {
      commit("TOGGLE_SAVING", true);
      try {
        await API.graphql(graphqlOperation(createWatchedVideo, { input: video }));
        dispatch("fetchWatchedVideos");
        commit("SET_SNACKBAR", {
          show: true,
          message: "WatchedVideo Successfully Added!",
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
          message: "WatchedVideo Removed",
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
    ADD_WATCHED_VIDEO: (state, video) => state.watchedVideos.push(video),
    SET_WATCHED_VIDEOS: (state, videos) => (state.watchedVideos = videos),
  },
  getters: {
    watchedVideos: (state) => state.watchedVideos,
  },
};

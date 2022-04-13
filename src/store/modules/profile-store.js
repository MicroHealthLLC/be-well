import { API, graphqlOperation } from "aws-amplify";
import { getProfile } from "@/graphql/queries";
import { createProfile } from "@/graphql/mutations";

export default {
  state: {
    profile: null,
  },
  actions: {
    async addProfile({ commit }, profile) {
      commit("TOGGLE_SAVING", true);
      try {
        const res = await API.graphql(
          graphqlOperation(createProfile, { input: profile })
        );
        commit("SET_PROFILE", res.data.createProfile);
        commit("SET_SNACKBAR", {
          show: true,
          message: "Profile Successfully Added!",
          color: "var(--mh-green)",
        });
      } catch (error) {
        console.log(error);
      }
      commit("TOGGLE_SAVING", false);
    },
    async fetchProfile({ commit }, id) {
      try {
        const res = await API.graphql(graphqlOperation(getProfile, { id: id }));
        if (res.data.getProfile) {
          commit("SET_PROFILE", res.data.getProfile);
        } else {
          commit("TOGGLE_QUESTIONNAIRE", true);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  mutations: {
    SET_PROFILE: (state, profile) => (state.profile = profile),
  },
  getters: {
    profile: (state) => state.profile,
  },
};

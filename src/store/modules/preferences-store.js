import { API, graphqlOperation } from "aws-amplify";
import { createPreferences } from "@/graphql/mutations";
// import { createPreferenceItems } from "@/graphql/mutations";
import { updatePreferences } from "@/graphql/mutations";
import { updatePreferenceItems } from "@/graphql/mutations";
import { listPreferences } from "@/graphql/queries";
import { listPreferenceItems } from "@/graphql/queries";
// import { deletePreferences } from "@/graphql/mutations";
// import { deletePreferenceItems } from "@/graphql/mutations";

export default {
  state: {
    preferences: [],  
    preferenceItems: [],   
  },
  actions: {
    async addPreferences({ commit, dispatch }, preference) {
      // console.log(preference)
      commit("TOGGLE_SAVING", true);
      try {
        await API.graphql(
          graphqlOperation(createPreferences, { input:preference })
        );
        dispatch("fetchPreferences");
        commit("SET_SNACKBAR", {
          show: true,
          message: "Preferences successfully added!",
          color: "var(--mh-green)",
        });
      } catch (error) {
        console.log(error);
      }
      commit("TOGGLE_SAVING", false);
    },
    // async addPreferenceItems({ commit, dispatch }, preferenceItem) {
    //   console.log(preferenceItem)
    //     commit("TOGGLE_SAVING", true);
    //     try {
    //       await API.graphql(
    //         graphqlOperation(createPreferences, { input:preferenceItem })
    //       );
    //       dispatch("fetchPreferenceItems");
    //       commit("SET_SNACKBAR", {
    //         show: true,
    //         message: "Preferences successfully added!",
    //         color: "var(--mh-green)",
    //       });
    //     } catch (error) {
    //       console.log(error);
    //     }
    //     commit("TOGGLE_SAVING", false);
    //   },
    async updatePreferencesById({ commit, dispatch }, preference) {
      commit("TOGGLE_SAVING", true);
      try {
        await API.graphql(
          graphqlOperation(updatePreferences, { input: preference })
        );
        dispatch("fetchPreferences");
        commit("SET_SNACKBAR", {
          show: true,
          message: "Preferences successfully updated!",
          color: "var(--mh-green)",
        });
      } catch (error) {
        console.log(error);
      }
      commit("TOGGLE_SAVING", false);
    },
    async updatePreferenceItemsById({ commit, dispatch }, preferenceItem) {
        commit("TOGGLE_SAVING", true);
        try {
          await API.graphql(
            graphqlOperation(updatePreferenceItems, { input: preferenceItem })
          );
          dispatch("fetchPreferenceItems");
          commit("SET_SNACKBAR", {
            show: true,
            message: "Preferences successfully updated!",
            color: "var(--mh-green)",
          });
        } catch (error) {
          console.log(error);
        }
        commit("TOGGLE_SAVING", false);
      },

    async fetchPreferences({ commit }) {
      try {
        const res = await API.graphql(graphqlOperation(listPreferences));
        commit("SET_PREFERENCES", res.data.listPreferences.items);
      // console.log(res.data.listPreferences.items);
      } catch (error) {
        console.log(error);
      }
    },
    async fetchPreferenceItems({ commit }) {
        try {
          const res = await API.graphql(graphqlOperation(listPreferenceItems));
          commit("SET_PREFERENCE_ITEMS", res.data);
          console.log(res.data);
        } catch (error) {
          console.log(error);
        }
      },
  },
  mutations: {
    SET_PREFERENCES: (state, preferences) => (state.preferences = preferences),
    // SET_PREFERENCE_ITEMS: (state, preferenceItems) => (state.preferenceItems = preferenceItems),
  },
  getters: {
    preferences: (state) => state.preferences,
    // preferenceItems: (state) => state.preferenceItems
  },
};

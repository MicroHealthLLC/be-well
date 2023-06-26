import { API, graphqlOperation } from "aws-amplify";
import { createLikeButton } from "@/graphql/mutations";
import { updateLikeButton } from "@/graphql/mutations";
import { listLikeButtons, getLikeButton } from "@/graphql/queries";
import { deleteLikeButton } from "@/graphql/mutations";

export default {
  state: {
    likeButtons: [],
  },
  actions: {
    async addLikeButton({ commit, dispatch }, likeButton) {
      commit("TOGGLE_SAVING", true);
      console.log(likeButton);
      try {
        const res = await API.graphql(
          graphqlOperation(createLikeButton, { input: likeButton })
        );
        dispatch("fetchLikeButtons");
        commit("SET_LIKEBUTTON", res.data.createLikeButton);
      } catch (error) {
        console.log(error);
      }
      commit("TOGGLE_SAVING", false);
    },
    async fetchLikeButtons({ commit }) {
      try {
        const res = await API.graphql(graphqlOperation(listLikeButtons));
        commit("SET_LIKEBUTTONS", res.data.listLikeButtons.items);
      } catch (error) {
        console.log(error);
      }
    },
    async fetchLikeButton(id) {
      try {
        const res = await API.graphql(graphqlOperation(getLikeButton, { input: id }));
        console.log(res.data)
      } catch (error) {
        console.log(error)
      }
    },
    async updateLikeButtonById({ commit, dispatch }, likeButton) {
      commit("TOGGLE_SAVING", true);
      try {
        await API.graphql(
          graphqlOperation(updateLikeButton, { input: likeButton })
        );
        dispatch("fetchLikeButtons");
      } catch (error) {
        console.log(error);
      }
      commit("TOGGLE_SAVING", false);
    },
    async deleteLikeButton({ commit }, id) {
      try {
        await API.graphql(graphqlOperation(deleteLikeButton, { input: { id: id } })
        );
        commit("SET_SNACKBAR", {
          show: false,
          message: "Removed",
          color: "var(--mh-orange)",
        });
      } catch (error) {
        console.log(error);
      }
    }
  },
  mutations: {
    SET_LIKEBUTTONS: (state, likeButtons) => (state.likeButtons = likeButtons),
    SET_LIKEBUTTON: (state, likeButton) => (state.likeButton = likeButton),
  },
  getters: {
    likeButtons: (state) => state.likeButtons,
    likeButton: (state) => state.likeButton,
  },
};

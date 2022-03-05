import { API, graphqlOperation } from "aws-amplify";
import { listCompetitions } from "@/graphql/queries";
// import { createEvent, deleteEvent, updateEvent } from "@/graphql/mutations";

export default {
  state: {
    competitions: [],
  },
  actions: {
    async fetchCompetitions({ commit }) {
      try {
        const res = await API.graphql(graphqlOperation(listCompetitions));
        commit("SET_COMPETITIONS", res.data.listCompetitions.items);
      } catch (error) {
        console.log(error);
      }
    },
  },
  mutations: {
    SET_COMPETITIONS: (state, competitions) =>
      (state.competitions = competitions),
  },
  getters: {
    competitions: (state) => state.competitions,
  },
};

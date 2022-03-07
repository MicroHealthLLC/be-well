import { API, graphqlOperation, Storage } from "aws-amplify";
import { listCompetitions } from "@/graphql/queries";
import { createCompetition } from "@/graphql/mutations";

export default {
  state: {
    competition: {
      title: "",
      hostName: "",
      hostEmail: "",
      startDate: "",
      endDate: "",
      startTime: null,
      endTime: null,
      image: null,
      description: "",
      rules: "",
      timeZone: "EST",
    },
    competitions: [],
  },
  actions: {
    async addCompetition({ commit }, competition) {
      try {
        if (competition.image) {
          const name = `competitions/${competition.image.name}`;
          const image = await Storage.put(name, competition.image);
          competition.image = image.key;
        }
        const res = await API.graphql(
          graphqlOperation(createCompetition, { input: competition })
        );
        commit("SET_EVENT", res.data.createCompetition);
        commit("SET_SNACKBAR", {
          show: true,
          message: "Competition Successfully Added!",
          color: "var(--mh-green)",
        });
      } catch (error) {
        console.log(error);
      }
    },
    async fetchCompetitions({ commit }) {
      try {
        const res = await API.graphql(graphqlOperation(listCompetitions));
        // Grab all photos from Storage
        const competitions = await Promise.all(
          res.data.listCompetitions.items.map(async (competition) => {
            if (competition.image) {
              const image = await Storage.get(competition.image);
              competition.image = image;
            }
            return competition;
          })
        );
        commit("SET_COMPETITIONS", competitions);
      } catch (error) {
        console.log(error);
      }
    },
  },
  mutations: {
    SET_COMPETITION: (state, competition) => (state.competition = competition),
    SET_COMPETITIONS: (state, competitions) =>
      (state.competitions = competitions),
  },
  getters: {
    competition: (state) => state.competition,
    competitions: (state) => state.competitions,
  },
};

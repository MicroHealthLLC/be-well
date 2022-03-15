import Vue from "vue";
import { API, graphqlOperation, Storage } from "aws-amplify";
import { getCompetition, listCompetitions } from "@/graphql/queries";
import { createCompetition, createCompetitionSubmission, createCompetitor, deleteCompetition, deleteCompetitor, deleteCompetitionSubmission, updateCompetition, updateCompetitor, updateCompetitionSubmission } from "@/graphql/mutations"; // prettier-ignore

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
      competitors: {
        items: [],
      },
      submissions: [],
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
        commit("SET_COMPETITION", res.data.createCompetition);
        commit("SET_SNACKBAR", {
          show: true,
          message: "Competition Successfully Added!",
          color: "var(--mh-green)",
        });
      } catch (error) {
        console.log(error);
      }
    },
    async updateCompetition({ commit }, competition) {
      // Remove unnecessary object properties
      // Todo: Update to use object destructuring
      console.log(competition);
      delete competition.imageURL;
      delete competition.createdAt;
      delete competition.updatedAt;
      delete competition.competitors;

      try {
        if (competition.image && competition.image.name) {
          const name = `competitions/${competition.image.name}`;
          const image = await Storage.put(name, competition.image);
          competition.image = image.key;
        }
        const res = await API.graphql(
          graphqlOperation(updateCompetition, { input: competition })
        );
        if (res.data.updateCompetition.image) {
          const image = await Storage.get(res.data.updateCompetition.image);
          commit("SET_COMPETITION", {
            ...res.data.updateCompetition,
            imageURL: image,
          });
        } else {
          commit("SET_COMPETITION", {
            ...res.data.updateCompetition,
            imageURL: null,
          });
        }
        commit("SET_SNACKBAR", {
          show: true,
          message: "Competition Successfully Updated!",
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
    async fetchCompetition({ commit }, id) {
      commit("TOGGLE_LOADING", true);
      try {
        const res = await API.graphql(
          graphqlOperation(getCompetition, { id: id })
        );

        if (res.data.getCompetition.image) {
          const image = await Storage.get(res.data.getCompetition.image);
          commit("SET_COMPETITION", {
            ...res.data.getCompetition,
            imageURL: image,
          });
        } else {
          commit("SET_COMPETITION", {
            ...res.data.getCompetition,
            imageURL: null,
          });
        }
      } catch (error) {
        console.log(error);
      }
      commit("TOGGLE_LOADING", false);
    },
    async deleteCompetition({ commit }, id) {
      try {
        await API.graphql(
          graphqlOperation(deleteCompetition, { input: { id: id } })
        );
        commit("SET_SNACKBAR", {
          show: true,
          message: "Competition Removed",
          color: "var(--mh-orange)",
        });
      } catch (error) {
        console.log(error);
      }
    },
    // Competitor Requests
    async addCompetitor({ commit }, competitor) {
      try {
        const res = await API.graphql(
          graphqlOperation(createCompetitor, { input: competitor })
        );
        commit("ADD_COMPETITOR", res.data.createCompetitor);
        commit("SET_SNACKBAR", {
          show: true,
          message: "Successfully Joined Competition!",
          color: "var(--mh-green)",
        });
      } catch (error) {
        console.log(error);
      }
    },
    async deleteCompetitor({ commit }, id) {
      try {
        const res = await API.graphql(
          graphqlOperation(deleteCompetitor, { input: { id: id } })
        );

        commit("REMOVE_COMPETITOR", res.data.deleteCompetitor.id);
        commit("SET_SNACKBAR", {
          show: true,
          message: "Successfully Withdrawn from Competition",
          color: "var(--mh-orange)",
        });
      } catch (error) {
        console.log(error);
      }
    },
    // Photo Submission Requests
    async addSubmission({ commit }, submission) {
      commit("TOGGLE_SAVING", true);
      try {
        if (submission.image) {
          const name = `competitions/submissions/${submission.image.name}`;
          const image = await Storage.put(name, submission.image);
          submission.image = image.key;
        }
        const res = await API.graphql(
          graphqlOperation(createCompetitionSubmission, { input: submission })
        );
        commit("ADD_SUBMISSION_PHOTO", res.data.createCompetitionSubmission);
        commit("SET_SNACKBAR", {
          show: true,
          message: "Competition Submission Successful!",
          color: "var(--mh-green)",
        });
      } catch (error) {
        console.log(error);
      }
      commit("TOGGLE_SAVING", false);
    },
    async deleteSubmission({ commit }, id) {
      try {
        API.graphql(
          graphqlOperation(deleteCompetitionSubmission, { input: { id: id } })
        );
        commit("SET_SNACKBAR", {
          show: true,
          message: "Competition Submission Successfully Removed",
          color: "var(--mh-orange)",
        });
      } catch (error) {
        console.log(error);
      }
    },
    async approveSubmission({ commit, getters }, submission) {
      try {
        // Send request to mark submission as true
        const res = await API.graphql(
          graphqlOperation(updateCompetitionSubmission, {
            input: { id: submission.id, isApproved: true },
          })
        );
        // Update Competitor score
        let newScore =
          getters.competitors.find(
            (competitor) => competitor.id == submission.competitorId
          ).score + 10;
        // Send request to increase competitor score
        const res2 = await API.graphql(
          graphqlOperation(updateCompetitor, {
            input: { id: submission.competitorId, score: newScore },
          })
        );

        commit("UPDATE_SUBMISSION", res.data.updateCompetitionSubmission);
        commit("UPDATE_COMPETITOR", res2.data.updateCompetitor);
        commit("SET_SNACKBAR", {
          show: true,
          message: "Competition Submission Approved!",
          color: "var(--mh-green)",
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
  mutations: {
    SET_COMPETITION: (state, competition) => (state.competition = competition),
    SET_COMPETITIONS: (state, competitions) =>
      (state.competitions = competitions),
    ADD_COMPETITOR: (state, competitor) =>
      state.competition.competitors.items.push(competitor),
    REMOVE_COMPETITOR: (state, id) => {
      const competitors = state.competition.competitors.items;
      const index = competitors.findIndex((competitor) => competitor.id == id);
      competitors.splice(index, 1);
    },
    UPDATE_COMPETITOR: (state, updatedCompetitor) => {
      const competitors = state.competition.competitors.items;
      const index = competitors.findIndex(
        (competitor) => competitor.id == updatedCompetitor.id
      );
      // Using Vue.set in order to update leader-board since competitor properties
      // are not explicitly defined in default state (and therefore not reactive)
      Vue.set(competitors, index, updatedCompetitor);
    },
    ADD_SUBMISSION_PHOTO: (state, submission) =>
      state.competition.submissions.items.unshift(submission),
    UPDATE_SUBMISSION: (state, updatedSubmission) => {
      const submissions = state.competition.submissions.items;
      const index = submissions.findIndex(
        (submission) => submission.id == updatedSubmission.id
      );
      Vue.set(submissions, index, updatedSubmission);
    },
  },
  getters: {
    competition: (state) => state.competition,
    competitions: (state) => state.competitions,
    competitors: (state) => state.competition.competitors.items,
  },
};

import Vue from "vue";
import { API, graphqlOperation, Storage } from "aws-amplify";
import { getCompetition, listCompetitions } from "@/graphql/queries";
import { createCompetition, createCompetitionSubmission, createGroup, createCompetitor, deleteCompetition, deleteCompetitor, deleteCompetitionSubmission, deleteGroup, updateCompetition, updateCompetitor, updateGroup, updateCompetitionSubmission} from "@/graphql/mutations"; // prettier-ignore

export default {
  state: {
    competition: {
      title: "",
      hostName: "",
      hostEmail: "",
      startDate: "",
      endDate: "",
      deadline: "",
      startTime: "",
      endTime: "",
      image: null,
      unit: null,
      scoringVal: null,
      description: "",
      rules: "",
      timeZone: "",
      competitors: { items: [] },
      submissions: { items: [] },
      groups: { items: [] },
    },
    competitions: [],
  },
  actions: {
    async addCompetition({ commit }, competition) {
      commit("TOGGLE_SAVING", true);
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
      commit("TOGGLE_SAVING", false);
    },
    async updateCompetition({ commit }, competition) {
      commit("TOGGLE_SAVING", true);
      // Remove unnecessary object properties
      // Todo: Update to use object destructuring
      delete competition.imageURL;
      delete competition.createdAt;
      delete competition.updatedAt;
      delete competition.competitors;
      delete competition.submissions;
      delete competition.groups;

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
      commit("TOGGLE_SAVING", false);
    },
    async fetchCompetitions({ commit }) {
      try {
        const res = await API.graphql(graphqlOperation(listCompetitions));
        // Grab all header photos from Storage
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

        await Promise.all(
          res.data.getCompetition.submissions.items.map(async (submission) => {
            if (submission.s3Key) {
              const url = await Storage.get(submission.s3Key);
              submission.url = url;
            }
          })
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
        if (competitor.groupParticipation) {
          commit("SET_SNACKBAR", {
            show: true,
            message:
              "Successfully Joined Competition! You will be added to a group.",
            color: "var(--mh-green)",
          });
        } else {
          commit("SET_SNACKBAR", {
            show: true,
            message: "Successfully Joined Competition!",
            color: "var(--mh-green)",
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
    async deleteCompetitor({ commit, getters }, competitor) {
      try {
        // get all submissions of this competition
        let subs = competitor.competition.submissions.items;
        // loop through submissions and delete the ones that belong to this competitor
        var i = 0;
        var total = 0;
        let groupSubs = [];
        while (i < subs.length) {
          if (subs[i].competitorId == competitor.competitorId) {
            groupSubs.push(subs[i]);
            let points;
            var multiplier = Math.pow(10, 1 || 0);
            // Automatic scoring
            if (!subs[i].manualScoring) {
              points = subs[i].type == "VIDEO" ? 5 : 2;
            }
            // Manual scoring
            else {
              points =
                parseFloat(subs[i].mAmount) * parseFloat(subs[i].scoringVal);
              points = Math.round(points * multiplier) / multiplier;
            }
            total += points;
            API.graphql(
              graphqlOperation(deleteCompetitionSubmission, {
                input: { id: subs[i].id },
              })
            );
            commit("REMOVE_SUBMISSION", subs[i].id);
          } else {
            if (i == subs.length - 1) return;
            i++;
          }
        }
        // update group score for group that competitor was in
        let g;
        let c = getters.competitors.find( 
          (comp) => comp.id === competitor.competitorId
        )
        if(c) {
          g = getters.groups.find(
            (group) => group.groupName === c.groupName
          );
        }
        console.log(g)
        if(g) {
          i = 0;
          const res3 = await API.graphql(
            graphqlOperation(updateGroup, {
              input: { 
                id: g.id,
                groupName: g.groupName, 
                score: g.score - total, 
              },
            })
          );
          commit("UPDATE_GROUP", res3.data.updateGroup);
        }

        const res = await API.graphql(
          graphqlOperation(deleteCompetitor, {
            input: { id: competitor.competitorId },
          })
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
    async updateCompetitorById({ commit }, competitor) {
      commit("TOGGLE_SAVING", true);
      try {
        const res = await API.graphql(
          graphqlOperation(updateCompetitor, { input: competitor })
        );
        commit("UPDATE_COMPETITOR", res.data.updateCompetitor);
      } catch (error) {
        console.log(error);
      }
      commit("TOGGLE_SAVING", false);
    },
    // Media (photo or video) Submission Requests
    async addSubmission({ commit, getters }, submission) {
      commit("TOGGLE_SAVING", true);
      try {
        if (submission.media) {
          const name = `competitions/submissions/${submission.media.name}`;
          const media = await Storage.put(name, submission.media);
          submission.s3Key = media.key;
        }

        delete submission.media;

        const res = await API.graphql(
          graphqlOperation(createCompetitionSubmission, {
            input: submission,
            isApproved: true,
          })
        );

        const newSubmission = res.data.createCompetitionSubmission;
        if (newSubmission.type == "VIDEO" || newSubmission.type == "PHOTO") {
          const url = await Storage.get(submission.s3Key);
          newSubmission.url = url;
        }

        // Update Competitor score
        let points;
        var multiplier = Math.pow(10, 1 || 0);
        // Automatic scoring
        if (!submission.manualScoring) {
          points = submission.type == "VIDEO" ? 5 : 2;
        }
        // Manual scoring
        else {
          points =
            parseFloat(submission.mAmount) * parseFloat(submission.scoringVal);
          points = Math.round(points * multiplier) / multiplier;
        }

        let newScore =
          Math.round(
            (getters.competitors.find(
              (competitor) => competitor.id == submission.competitorId
            ).score +
              points) *
              multiplier
          ) / multiplier;

        // Send request to increase competitor score
        const res2 = await API.graphql(
          graphqlOperation(updateCompetitor, {
            input: { id: submission.competitorId, score: newScore },
          })
        );

        // Send request to update group score
        if(getters.competitors.find(
          (competitor) => competitor.id === submission.competitorId
          ).groupParticipation) {
            const curr_groupName = getters.competitors.find(
              (competitor) => competitor.id === submission.competitorId
              ).groupName;
            // Check if competitor is in a group
            if(curr_groupName) {
              const res3 = await API.graphql(
                graphqlOperation(updateGroup, {
                  input: { 
                    id: getters.groups.find(
                      (group) => group.groupName === curr_groupName
                    ).id,
                    groupName: curr_groupName, 
                    score: getters.groups.find(
                      (group) => group.groupName === curr_groupName
                    ).score + points 
                  },
                })
              );
              commit("UPDATE_GROUP", res3.data.updateGroup);
            }
        }

        commit("UPDATE_COMPETITOR", res2.data.updateCompetitor);
        commit("ADD_SUBMISSION", newSubmission);
        commit("SET_SNACKBAR", {
          show: true,
          message: "Competition Submission Successful!",
          color: "var(--mh-green)",
        });

        // If group participation, add score to respective team as well
      } catch (error) {
        console.log(error);
      }
      commit("TOGGLE_SAVING", false);
    },
    async deleteSubmission({ commit, getters }, submission) {
      commit("TOGGLE_SAVING", true);
      try {
        if (submission.isApproved) {
          // Update Competitor score
          let points;
          var multiplier = Math.pow(10, 1 || 0);
          // Automatic scoring
          if (!submission.manualScoring) {
            points = submission.type == "VIDEO" ? 5 : 2;
          }
          // Manual scoring
          else {
            points =
              parseFloat(submission.mAmount) *
              parseFloat(submission.scoringVal);
            points = Math.round(points * multiplier) / multiplier;
          }

          let newScore =
            Math.round(
              (getters.competitors.find(
                (competitor) => competitor.id == submission.competitorId
              ).score -
                points) *
                multiplier
            ) / multiplier;

          // Send request to increase competitor score
          const res2 = await API.graphql(
            graphqlOperation(updateCompetitor, {
              input: { id: submission.competitorId, score: newScore },
            })
          );

        // Send request to update group score
        if(getters.competitors.find(
          (competitor) => competitor.id === submission.competitorId
          ).groupParticipation) {
            const curr_groupName = getters.competitors.find(
              (competitor) => competitor.id === submission.competitorId
              ).groupName;
            // Check if competitor is in a group
            if(curr_groupName) {
              const res3 = await API.graphql(
                graphqlOperation(updateGroup, {
                  input: { 
                    id: getters.groups.find(
                      (group) => group.groupName === curr_groupName
                    ).id,
                    groupName: curr_groupName, 
                    score: getters.groups.find(
                      (group) => group.groupName === curr_groupName
                    ).score - points 
                  },
                })
              );
              commit("UPDATE_GROUP", res3.data.updateGroup);
            }
        }

          commit("UPDATE_COMPETITOR", res2.data.updateCompetitor);
        }

        API.graphql(
          graphqlOperation(deleteCompetitionSubmission, {
            input: { id: submission.id },
          })
        );

        commit("REMOVE_SUBMISSION", submission.id);
        commit("SET_SNACKBAR", {
          show: true,
          message: "Competition Submission Successfully Removed",
          color: "var(--mh-orange)",
        });
      } catch (error) {
        console.log(error);
      }
      commit("TOGGLE_SAVING", false);
    },
    async approveSubmission({ commit, getters }, submission) {
      try {
        // Send request to mark submission as true
        const res = await API.graphql(
          graphqlOperation(updateCompetitionSubmission, {
            input: { id: submission.id, isApproved: true, url: submission.url },
          })
        );
        // Update Competitor score
        let points;
        var multiplier = Math.pow(10, 1 || 0);
        // Automatic scoring
        if (!submission.manualScoring) {
          points = submission.type == "VIDEO" ? 5 : 2;
        }
        // Manual scoring
        else {
          points =
            parseFloat(submission.mAmount) * parseFloat(submission.scoringVal);
          points = Math.round(points * multiplier) / multiplier;
        }

        let newScore =
          Math.round(
            (getters.competitors.find(
              (competitor) => competitor.id == submission.competitorId
            ).score +
              points) *
              multiplier
          ) / multiplier;

        // Send request to increase competitor score
        const res2 = await API.graphql(
          graphqlOperation(updateCompetitor, {
            input: { id: submission.competitorId, score: newScore },
          })
        );

        // Send request to update group score
        if(getters.competitors.find(
          (competitor) => competitor.id === submission.competitorId
          ).groupParticipation) {
            const curr_groupName = getters.competitors.find(
              (competitor) => competitor.id === submission.competitorId
              ).groupName;
            // Check if competitor is in a group
            if(curr_groupName) {
              const res3 = await API.graphql(
                graphqlOperation(updateGroup, {
                  input: { 
                    id: getters.groups.find(
                      (group) => group.groupName === curr_groupName
                    ).id,
                    groupName: curr_groupName, 
                    score: getters.groups.find(
                      (group) => group.groupName === curr_groupName
                    ).score + points
                  },
                })
              );
              commit("UPDATE_GROUP", res3.data.updateGroup);
            }
        }

        commit("UPDATE_SUBMISSION", res.data.updateCompetitionSubmission);
        commit("UPDATE_COMPETITOR", res2.data.updateCompetitor);
        commit("SET_SNACKBAR", {
          show: true,
          message: "Competition Submission Approved!",
          color: "var(--mh-green)",
        });
      } catch (error) {
        console.log(error);
        commit("SET_SNACKBAR", {
          show: true,
          message: error.errors[0].message,
          color: "var(--mh-orange)",
        });
      }
    },
    async denySubmission({ commit, getters }, submission) {
      try {
        // Send request to mark submission as true
        const res = await API.graphql(
          graphqlOperation(updateCompetitionSubmission, {
            input: {
              id: submission.id,
              isApproved: false,
              url: submission.url,
            },
          })
        );
        // Update Competitor score
        let points;
        var multiplier = Math.pow(10, 1 || 0);
        // Automatic scoring
        if (!submission.manualScoring) {
          points = submission.type == "VIDEO" ? 5 : 2;
        }
        // Manual scoring
        else {
          points =
            parseFloat(submission.mAmount) * parseFloat(submission.scoringVal);
          points = Math.round(points * multiplier) / multiplier;
        }

        let newScore =
          Math.round(
            (getters.competitors.find(
              (competitor) => competitor.id == submission.competitorId
            ).score -
              points) *
              multiplier
          ) / multiplier;

        // Send request to decrease competitor score
        const res2 = await API.graphql(
          graphqlOperation(updateCompetitor, {
            input: { id: submission.competitorId, score: newScore },
          })
        );

        // Send request to update group score
        if(getters.competitors.find(
          (competitor) => competitor.id === submission.competitorId
          ).groupParticipation) {
            const curr_groupName = getters.competitors.find(
              (competitor) => competitor.id === submission.competitorId
              ).groupName;
            // Check if competitor is in a group
            if(curr_groupName) {
              const res3 = await API.graphql(
                graphqlOperation(updateGroup, {
                  input: { 
                    id: getters.groups.find(
                      (group) => group.groupName === curr_groupName
                    ).id,
                    groupName: curr_groupName, 
                    score: getters.groups.find(
                      (group) => group.groupName === curr_groupName
                    ).score - points 
                  },
                })
              );
              commit("UPDATE_GROUP", res3.data.updateGroup);
            }
        }

        commit("UPDATE_SUBMISSION", res.data.updateCompetitionSubmission);
        commit("UPDATE_COMPETITOR", res2.data.updateCompetitor);
        commit("SET_SNACKBAR", {
          show: true,
          message: "Competition Submission Denied!",
          color: "var(--mh-orange)",
        });
      } catch (error) {
        console.log(error);
        commit("SET_SNACKBAR", {
          show: true,
          message: error.errors[0].message,
          color: "var(--mh-orange)",
        });
      }
    },
    async addGroup({ commit }, group) {
      commit("TOGGLE_SAVING", true);
      try {
        const res = await API.graphql(
          graphqlOperation(createGroup, { input: group })
        );
        commit("ADD_GROUP", res.data.createGroup);
        console.log(group);
        commit("SET_SNACKBAR", {
          show: true,
          message: "Group Successfully Added!",
          color: "var(--mh-green)",
        });
      } catch (error) {
        console.log(error);
      }
      commit("TOGGLE_SAVING", false);
    },
    async updateGroupById({ commit }, group) {
      commit("TOGGLE_SAVING", true);
      try {
        const res = await API.graphql(graphqlOperation(updateGroup, { input: group }));
        commit("UPDATE_GROUP", res.data.updateGroup);
        commit("SET_SNACKBAR", {
          show: true,
          message: "Group Successfully Updated!",
          color: "var(--mh-green)",
        });
      } catch (error) {
        console.log(error);
      }
      commit("TOGGLE_SAVING", false);
    },
    async deleteGroup({ commit }, group) {
      try {
        const res = await API.graphql(
          graphqlOperation(deleteGroup, {
            input: { id: group.id },
          })
        );

        commit("REMOVE_GROUP", res.data.deleteGroup.id);
        commit("SET_SNACKBAR", {
          show: true,
          message: "Group Successfully Deleted",
          color: "var(--mh-orange)",
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
    ADD_SUBMISSION: (state, submission) =>
      state.competition.submissions.items.unshift(submission),
    REMOVE_SUBMISSION: (state, id) => {
      const index = state.competition.submissions.items.findIndex(
        (submission) => submission.id == id
      );
      state.competition.submissions.items.splice(index, 1);
    },
    UPDATE_SUBMISSION: (state, updatedSubmission) => {
      const submissions = state.competition.submissions.items;
      const index = submissions.findIndex(
        (submission) => submission.id == updatedSubmission.id
      );
      Vue.set(submissions, index, updatedSubmission);
    },

    ADD_GROUP: (state, group) => state.competition.groups.items.unshift(group),
    REMOVE_GROUP: (state, id) => {
      const index = state.competition.groups.items.findIndex(
        (group) => group.id == id
      );
      state.competition.groups.items.splice(index, 1);
    },
    UPDATE_GROUP: (state, updatedGroup) => {
      const groups = state.competition.groups.items;
      const index = groups.findIndex((group) => group.id == updatedGroup.id);
      Vue.set(groups, index, updatedGroup);
    },
  },
  getters: {
    competition: (state) => state.competition,
    competitions: (state) => state.competitions,
    competitors: (state) => state.competition.competitors.items,
    submissions: (state) => state.competition.submissions.items,
    groups: (state) => state.competition.groups.items,
  },
};
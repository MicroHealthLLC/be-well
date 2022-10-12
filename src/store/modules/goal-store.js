import { API, graphqlOperation } from "aws-amplify";
import { createGoal } from "@/graphql/mutations";
import { updateGoal } from "@/graphql/mutations";
import { deleteGoal } from "@/graphql/mutations";
import { extendedListGoals } from "@/graphql/extended_queries";
import { deleteGoalReminders } from "@/graphql/mutations";

// import { getGoal } from "@/graphql/queries";
// import { listGoals } from "@/graphql/queries";
// import awsconfig from "@/aws-exports";

export default {
  state: {
    goals: [],
  },
  actions: {
    async addGoal({ commit, dispatch }, goal) {
      commit("TOGGLE_SAVING", true);
      try {
        await API.graphql(graphqlOperation(createGoal, { input: goal }));
        dispatch("fetchGoals");
        commit("SET_SNACKBAR", {
          show: true,
          message: "Goal Successfully Added!",
          color: "var(--mh-green)",
        });
      } catch (error) {
        console.log(error);
      }
      commit("TOGGLE_SAVING", false);
    },
    async updateGoalById({ commit, dispatch }, goal) {
      commit("TOGGLE_SAVING", true);
      try {
        await API.graphql(graphqlOperation(updateGoal, { input: goal }));
        dispatch("fetchGoals");
        commit("SET_SNACKBAR", {
          show: true,
          message: "Goal Successfully Updated!",
          color: "var(--mh-green)",
        });
      } catch (error) {
        console.log(error);
      }
      commit("TOGGLE_SAVING", false);
    },
    async removeGoal({ commit, dispatch }, id) {
      try {
        await API.graphql(graphqlOperation(deleteGoal, { input: id })).then(
          (res) => {
            let goalReminders = res.data.deleteGoal.reminders.items;
            goalReminders.map((item) => {
              API.graphql(
                graphqlOperation(deleteGoalReminders, {
                  input: { id: item.id },
                })
              );
            });
          }
        );
        dispatch("fetchGoals");
        commit("SET_SNACKBAR", {
          show: true,
          message: "Goal Removed",
          color: "var(--mh-orange)",
        });
      } catch (error) {
        console.log(error);
      }
    },
    async fetchGoals({ commit }) {
      try {
      const res = await API.graphql(graphqlOperation(extendedListGoals));
      //  const res = await API.graphql(graphqlOperation(listGoals));
        commit("SET_GOALS", res.data.listGoals.items);
      } catch (error) {
        console.log(error);
      }
    },
  },
  mutations: {
    ADD_GOAL: (state, goal) => state.goals.push(goal),
    SET_GOALS: (state, goals) => (state.goals = goals),
  },
  getters: {
    goals: (state) => state.goals,
    completedGoals: (state) => state.goals.filter((goal) => goal.isComplete),
    incompleteGoals: (state) => state.goals.filter((goal) => !goal.isComplete),
  },
};

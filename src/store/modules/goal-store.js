import { API, graphqlOperation } from "aws-amplify";
import { createGoal } from "@/graphql/mutations";
import { updateGoal } from "@/graphql/mutations";
import { deleteGoal } from "@/graphql/mutations";
// import { getGoal } from "@/graphql/queries";
import { listGoals } from "@/graphql/queries";
// import awsconfig from "@/aws-exports";

export default {
  state: {
    goals: [],
  },
  actions: {
    async addGoal({ dispatch }, goal) {
      try {
        await API.graphql(graphqlOperation(createGoal, { input: goal }));
        dispatch("fetchGoals");
      } catch (error) {
        console.log(error);
      }
    },
    async updateGoalById({ dispatch }, goal) {
      try {
        await API.graphql(graphqlOperation(updateGoal, { input: goal }));
        dispatch("fetchGoals");
      } catch (error) {
        console.log(error);
      }
    },
    async removeGoal({ dispatch }, id) {
      try {
        await API.graphql(graphqlOperation(deleteGoal, { input: id }));
        dispatch("fetchGoals");
      } catch (error) {
        console.log(error);
      }
    },
    async fetchGoals({ commit }) {
      try {
        const res = await API.graphql(graphqlOperation(listGoals));
        console.log(res);
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
  },
};

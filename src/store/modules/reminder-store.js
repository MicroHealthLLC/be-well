import { API, graphqlOperation } from "aws-amplify";
import { createReminder } from "@/graphql/mutations";
import { updateReminder } from "@/graphql/mutations";
import { listReminders } from "@/graphql/queries";
import { deleteReminder } from "@/graphql/mutations";

export default {
  state: {
    reminders: [],
    remindersOn: false,
  },
  actions: {
    async addReminder({ commit, dispatch }, reminder) {
      commit("TOGGLE_SAVING", true);
      try {
        await API.graphql(
          graphqlOperation(createReminder, { input: reminder })
        );
        dispatch("fetchReminders");
        commit("SET_SNACKBAR", {
          show: true,
          message: "Activity Reminder Successfully Added!",
          color: "var(--mh-green)",
        });
      } catch (error) {
        console.log(error);
      }
      commit("TOGGLE_SAVING", false);
    },
    async updateReminderById({ commit, dispatch }, reminder) {
      commit("TOGGLE_SAVING", true);
      try {
        console.log("updateReminderById", reminder);
        await API.graphql(
          graphqlOperation(updateReminder, { input: reminder })
        );
        dispatch("fetchReminders");
        commit("SET_SNACKBAR", {
          show: true,
          message: "Activity Reminder Successfully Updated!",
          color: "var(--mh-green)",
        });
      } catch (error) {
        console.log(error);
      }
      commit("TOGGLE_SAVING", false);
    },
    async removeReminder({ commit, dispatch }, id) {
      try {
        await API.graphql(graphqlOperation(deleteReminder, { input: id }));
        dispatch("fetchReminders");
        commit("SET_SNACKBAR", {
          show: true,
          message: "Activity Reminder Removed",
          color: "var(--mh-orange)",
        });
      } catch (error) {
        console.log(error);
      }
    },
    async fetchReminders({ commit }) {
      try {
        const res = await API.graphql(graphqlOperation(listReminders));
        commit("SET_REMINDERS", res.data.listReminders.items);
      } catch (error) {
        console.log(error);
      }
    },
  },
  mutations: {
    SET_REMINDERS: (state, reminders) => (state.reminders = reminders),
    TOGGLE_REMINDERS_ON: (state, on) => (state.remindersOn = on),
  },
  getters: {
    reminders: (state) => state.reminders,
    remindersOn: (state) => state.remindersOn,
  },
};

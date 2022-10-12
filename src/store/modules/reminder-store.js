import { API, graphqlOperation } from "aws-amplify";
import { createReminder } from "@/graphql/mutations";
import { updateReminder } from "@/graphql/mutations";
import { createGoalReminders } from "@/graphql/mutations";
// import { listReminders } from "@/graphql/queries";
import { getReminder } from "@/graphql/queries";
import { deleteReminder } from "@/graphql/mutations";
import { deleteGoalReminders } from "@/graphql/mutations";
import { extendedListReminders } from "@/graphql/extended_queries";
import axios from "axios";

export default {
  state: {
    reminders: [],
    remindersOn: false,
  },
  actions: {
    async addReminder({ commit, dispatch }, { reminder, goalIds }) {
      commit("TOGGLE_SAVING", true);
      try {
        console.log("addReminder", reminder, goalIds);
        const res = await API.graphql(
          graphqlOperation(createReminder, { input: reminder })
        );
        dispatch("fetchReminders");

        dispatch("associateGoalWithReminder", {
          reminderId: res.data.createReminder.id,
          goalIds: goalIds,
        });

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
    async associateGoalWithReminder({ commit, dispatch }, { reminderId, goalIds }) {

      // Create join table record to associate reminder with goal
      // we need to make multiple request if there are multiple goals are associated
      // e.g. if user has select 2 goals to associate then we need to make
      // 2 join table request to associated.
      if (goalIds && goalIds.length > 0) {

        await axios({
          method: "GET",
          url: "https://f7ta76pehhv6ytuv5qewxrcame0zxdef.lambda-url.us-east-1.on.aws/",
          headers: { 'content-type': 'application/json', 'Accept': 'application/json' },
          params: {      
            "goalReminder": {
              "goalIDs": goalIds,
              "reminderID": reminderId
            }
          },
        }).then((res) => {
          let goalReminders = res.data.goalReminders
          console.log(
            "associateGoalWithReminder",
            reminderId, goalIds,
            goalReminders
          );
          if(goalReminders.length > 0){
            goalReminders.forEach((gr) => {
              API.graphql(graphqlOperation(createGoalReminders, { input: gr }));
            });
            dispatch("fetchReminders");
            commit("SET_SNACKBAR", {
              show: true,
              message: "Activity Successfully associated with goal!",
              color: "var(--mh-green)",
            });
          }
        }).catch((error) => {
          if (error.response) {
            commit("SET_SNACKBAR", {
              show: true,
              message: error.response.data.message,
              color: "red",
            });
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log('associateGoalWithReminder',error.response);
            console.log('associateGoalWithReminder',error.response.status);
            console.log('associateGoalWithReminder',error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log('associateGoalWithReminder',error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('associateGoalWithReminder', error.message);
          }
       });

      }

      // Create join table record to associate reminder with goal
      // we need to make multiple request if there are multiple goals are associated
      // e.g. if user has select 2 goals to associate then we need to make
      // 2 join table request to associated.
      // if (goalIds && goalIds.length > 0) {
      //   let goalReminders = [];
      //   goalIds.forEach((gid) => {
      //     let goalReminder = {
      //       reminderID: reminderId,
      //       goalID: gid,
      //     };
      //     goalReminders.push(goalReminder);
      //   });
      //   console.log(
      //     "associateGoalWithReminder",
      //     reminderId, goalIds,
      //     goalReminders
      //   );
      //   goalReminders.forEach((gr) => {
      //     API.graphql(graphqlOperation(createGoalReminders, { input: gr }));
      //   });
      //   dispatch("fetchReminders");
      //   commit("SET_SNACKBAR", {
      //     show: true,
      //     message: "Activity Successfully associated with goal!",
      //     color: "var(--mh-green)",
      //   });
      // }


    },
    async updateReminderById({ commit, dispatch }, { reminder, goalIds }) {
      commit("TOGGLE_SAVING", true);
      try {
        //console.log("updateReminderById", reminder);
        await API.graphql(
          graphqlOperation(updateReminder, { input: reminder })
        );
        dispatch("fetchReminders");
        dispatch("associateGoalWithReminder",{reminderId: reminder.id, goalIds: goalIds});
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
        await API.graphql(graphqlOperation(deleteReminder, { input: id })).then(
          (res) => {
            let goalReminders = res.data.deleteReminder.goals.items;
            goalReminders.map((item) => {
              API.graphql(
                graphqlOperation(deleteGoalReminders, { input: { id: item.id} })
              );
            });
          }
        );
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
        const res = await API.graphql(graphqlOperation(extendedListReminders));
        commit("SET_REMINDERS", res.data.listReminders.items);
      } catch (error) {
        console.log(error);
      }
    },
    async fetchReminder(id) {
      try {
        const res = await API.graphql(graphqlOperation(getReminder, { input: id }));
        console.log(res.data)
      } catch (error) {
        console.log(error)
      }
    }
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

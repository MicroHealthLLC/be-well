import { API, graphqlOperation } from "aws-amplify";
import { listEvents } from "@/graphql/queries";
import { createEvent } from "@/graphql/mutations";

export default {
  state: {
    event: {
      title: "",
      hostName: "",
      hostEmail: "",
      description: "",
      type: "",
      date: "",
      startTime: null,
      endTime: null,
    },
    events: [],
  },
  actions: {
    async addEvent({ commit }, event) {
      try {
        // if (event.image) {
        //   const image = await Storage.put(event.image.name, event.image);
        //   event.image = image.key;
        // }
        const res = await API.graphql(
          graphqlOperation(createEvent, { input: event })
        );
        commit("SET_EVENT", res.data.createEvent);
        commit("SET_SNACKBAR", {
          show: true,
          message: "Event Successfully Added!",
          color: "var(--mh-green)",
        });
      } catch (error) {
        console.log(error);
      }
    },
    async fetchEvents({ commit }) {
      try {
        const res = await API.graphql(graphqlOperation(listEvents));
        commit("SET_EVENTS", res.data.listEvents.items);
      } catch (error) {
        console.log(error);
      }
    },
  },
  mutations: {
    SET_EVENT: (state, event) => (state.event = event),
    SET_EVENTS: (state, events) => (state.events = events),
  },
  getters: {
    event: (state) => state.event,
    events: (state) => state.events,
  },
};

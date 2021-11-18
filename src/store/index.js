import Vue from "vue";
import Vuex from "vuex";
import authStore from "./modules/auth";
import goalStore from "./modules/goal-store";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    snackbar: {
      show: false,
      message: "",
      color: "",
    },
  },
  actions: {},
  mutations: {
    SET_SNACKBAR: (state, snackbar) => (state.snackbar = snackbar),
    CLOSE_SNACKBAR: (state) => (state.snackbar.show = false),
  },
  getters: {
    snackbar: (state) => state.snackbar,
  },
  modules: { authStore, goalStore },
});

import Vue from "vue";
import Vuex from "vuex";
import authStore from "./modules/auth";
import goalStore from "./modules/goal-store";
import reminderStore from "./modules/reminder-store";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    snackbar: {
      show: false,
      message: "",
      color: "",
    },
    saving: false,
    loading: false,
  },
  actions: {},
  mutations: {
    SET_SNACKBAR: (state, snackbar) => (state.snackbar = snackbar),
    CLOSE_SNACKBAR: (state) => (state.snackbar.show = false),
    TOGGLE_SAVING: (state, isSaving) => (state.saving = isSaving),
    TOGGLE_LOADING: (state, isLoading) => (state.loading = isLoading),
  },
  getters: {
    snackbar: (state) => state.snackbar,
    saving: (state) => state.saving,
    loading: (state) => state.loading,
  },
  modules: { authStore, goalStore, reminderStore },
});

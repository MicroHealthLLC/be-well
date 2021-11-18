import Vue from "vue";
import Vuex from "vuex";
import authStore from "./modules/auth";
import goalStore from "./modules/goal-store";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { authStore, goalStore },
});

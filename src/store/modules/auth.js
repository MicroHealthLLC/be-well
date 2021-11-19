import { Auth } from "aws-amplify";

export default {
  state: {
    user: null,
  },
  actions: {
    async login({ commit }, { username, password }) {
      try {
        await Auth.signIn({ username, password });
        const userInfo = await Auth.currentUserInfo();
        commit("SET_USER", userInfo);

        return Promise.resolve("Success");
      } catch (error) {
        console.log(error);
        return Promise.reject(error);
      }
    },
    async logout({ commit }) {
      commit("SET_USER", null);
      return await Auth.signOut();
    },
    async signUp(_, { username, password, email }) {
      try {
        await Auth.signUp({ username, password, attributes: { email } });
        return Promise.resolve();
      } catch (error) {
        console.log(error);
        return Promise.reject(error);
      }
    },
    async confirmSignUp(_, { username, code }) {
      try {
        await Auth.confirmSignUp(username, code);
        return Promise.resolve();
      } catch (error) {
        console.log(error);
        return Promise.reject(error);
      }
    },
    async fetchCurrentUser({ commit }) {
      const userInfo = await Auth.currentUserInfo();
      commit("SET_USER", userInfo);
    },
    async updateUser({ commit, dispatch }, userDetails) {
      try {
        commit("TOGGLE_SAVING", true);
        let user = await Auth.currentAuthenticatedUser();
        await Auth.updateUserAttributes(user, userDetails);
        dispatch("fetchCurrentUser");
        commit("SET_SNACKBAR", {
          show: true,
          message: "Profile Successfully Updated!",
          color: "var(--mh-green)",
        });
      } catch (error) {
        console.log(error);
      }
      commit("TOGGLE_SAVING", false);
    },
  },
  mutations: {
    SET_USER: (state, user) => (state.user = user),
  },
  getters: {
    user: (state) => state.user,
  },
};

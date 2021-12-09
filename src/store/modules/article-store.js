import { API, graphqlOperation } from "aws-amplify";
import { createArticle } from "@/graphql/mutations";
import { listArticles } from "@/graphql/queries";

export default {
  state: {
    articles: [],
  },
  actions: {
    async addArticle({ commit, dispatch }, goal) {
      try {
        await API.graphql(graphqlOperation(createArticle, { input: goal }));
        dispatch("fetchArticles");
        commit("SET_SNACKBAR", {
          show: true,
          message: "Article Successfully Added!",
          color: "var(--mh-green)",
        });
      } catch (error) {
        console.log(error);
      }
    },

    async fetchArticles({ commit }) {
      try {
        const res = await API.graphql(graphqlOperation(listArticles));
        commit("SET_ARTICLES", res.data.listArticles.items);
      } catch (error) {
        console.log(error);
      }
    },
  },
  mutations: {
    ADD_ARTICLE: (state, article) => state.articles.push(article),
    SET_ARTICLES: (state, articles) => (state.articles = articles),
  },
  getters: {
    articles: (state) => state.articles,
  },
};

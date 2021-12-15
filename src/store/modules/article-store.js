import { API, graphqlOperation } from "aws-amplify";
import {
  createArticle,
  deleteArticle,
  updateArticle,
} from "@/graphql/mutations";
import {
  articlesByCategory,
  listArticles,
  getArticle,
} from "@/graphql/queries";

export default {
  state: {
    article: {
      title: "",
      author: "",
      lastEditedBy: "",
      category: "",
      level: "BEGINNER",
      body: "",
    },
    articles: [],
  },
  actions: {
    async addArticle({ commit, dispatch }, goal) {
      try {
        const res = await API.graphql(
          graphqlOperation(createArticle, { input: goal })
        );
        dispatch("fetchArticles");
        commit("SET_ARTICLE", res.data.createArticle);
        commit("SET_SNACKBAR", {
          show: true,
          message: "Article Successfully Added!",
          color: "var(--mh-green)",
        });
      } catch (error) {
        console.log(error);
      }
    },
    async updateArticle({ commit }, article) {
      try {
        const res = await API.graphql(
          graphqlOperation(updateArticle, { input: article })
        );
        commit("SET_ARTICLE", res.data.updateArticle);
        commit("SET_SNACKBAR", {
          show: true,
          message: "Article Successfully Updated!",
          color: "var(--mh-green)",
        });
      } catch (error) {
        console.log(error);
      }
    },
    async fetchArticle({ commit }, id) {
      try {
        const res = await API.graphql(graphqlOperation(getArticle, { id: id }));
        commit("SET_ARTICLE", res.data.getArticle);
      } catch (error) {
        console.log(error);
      }
    },
    async fetchArticles({ commit }) {
      try {
        const res = await API.graphql(
          graphqlOperation(listArticles, { limit: 6 })
        );
        commit("SET_ARTICLES", res.data.listArticles.items);
      } catch (error) {
        console.log(error);
      }
    },
    async fetchCategoryArticles({ commit }, category) {
      try {
        const res = await API.graphql(
          graphqlOperation(articlesByCategory, { category: category })
        );
        commit("SET_ARTICLES", res.data.articlesByCategory.items);
      } catch (error) {
        console.log(error);
      }
    },
    async deleteArticle({ commit }, id) {
      try {
        await API.graphql(
          graphqlOperation(deleteArticle, { input: { id: id } })
        );
        commit("SET_SNACKBAR", {
          show: true,
          message: "Article Removed",
          color: "var(--mh-orange)",
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
  mutations: {
    ADD_ARTICLE: (state, article) => state.articles.push(article),
    SET_ARTICLES: (state, articles) => (state.articles = articles),
    SET_ARTICLE: (state, article) => (state.article = article),
  },
  getters: {
    article: (state) => state.article,
    articles: (state) => state.articles,
    beginnerArticles: (state) =>
      state.articles.filter((article) => article.level == "BEGINNER"),
    intermediateArticles: (state) =>
      state.articles.filter((article) => article.level == "INTERMEDIATE"),
    advancedArticles: (state) =>
      state.articles.filter((article) => article.level == "ADVANCED"),
  },
};

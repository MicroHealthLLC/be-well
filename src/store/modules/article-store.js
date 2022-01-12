import { API, graphqlOperation, Storage } from "aws-amplify";
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
      image: null,
      imageURL: "",
      imageCredit: "",
    },
    articles: [],
  },
  actions: {
    async addArticle({ commit }, article) {
      try {
        if (article.image) {
          const image = await Storage.put(article.image.name, article.image);
          article.image = image.key;
        }
        const res = await API.graphql(
          graphqlOperation(createArticle, { input: article })
        );
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
        if (article.image) {
          const image = await Storage.put(article.image.name, article.image);
          article.image = image.key;
        }
        const res = await API.graphql(
          graphqlOperation(updateArticle, { input: article })
        );
        if (res.data.updateArticle.image) {
          const image = await Storage.get(res.data.updateArticle.image);
          commit("SET_ARTICLE", {
            ...res.data.updateArticle,
            imageURL: image,
          });
        } else {
          commit("SET_ARTICLE", {
            ...res.data.updateArticle,
            imageURL: null,
          });
        }
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
      commit("TOGGLE_LOADING", true);
      try {
        const res = await API.graphql(graphqlOperation(getArticle, { id: id }));

        if (res.data.getArticle.image) {
          const image = await Storage.get(res.data.getArticle.image);
          commit("SET_ARTICLE", {
            ...res.data.getArticle,
            imageURL: image,
          });
        } else {
          commit("SET_ARTICLE", {
            ...res.data.getArticle,
            imageURL: null,
          });
        }
      } catch (error) {
        console.log(error);
      }
      commit("TOGGLE_LOADING", false);
    },
    async fetchArticles({ commit }, filters) {
      try {
        const res = await API.graphql(
          graphqlOperation(listArticles, filters)
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

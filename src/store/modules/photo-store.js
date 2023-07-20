import { API, graphqlOperation } from "aws-amplify";
import { createPhoto } from "@/graphql/mutations";
import { updatePhoto } from "@/graphql/mutations";
import { listPhotos, getPhoto } from "@/graphql/queries";
import { deletePhoto } from "@/graphql/mutations";

export default {
  state: {
    photos: [],
    photosOn: false,
    photo: {},
  },
  actions: {
    async addPhoto({ commit, dispatch }, photo) {
      commit("TOGGLE_SAVING", true);
      console.log(photo);
      try {
        await API.graphql(
          graphqlOperation(createPhoto, { input: photo })
        );
        dispatch("fetchPhotos");
        commit("SET_SNACKBAR", {
          show: true,
          message: "Activity Photo Successfully Added!",
          color: "var(--mh-green)",
        });
      } catch (error) {
        console.log(error);
      }
      commit("TOGGLE_SAVING", false);
    },
    async updatePhotoById({ commit, dispatch }, photo) {
      commit("TOGGLE_SAVING", true);
      try {
        //console.log("updatePhotoById", photo);
        await API.graphql(
          graphqlOperation(updatePhoto, { input: photo })
        );
        dispatch("fetchPhotos");
        commit("SET_SNACKBAR", {
          show: true,
          message: "Activity Photo Successfully Updated!",
          color: "var(--mh-green)",
        });
      } catch (error) {
        console.log(error);
      }
      commit("TOGGLE_SAVING", false);
    },
    async removePhoto({ commit, dispatch }, id) {
      try {
        await API.graphql(graphqlOperation(deletePhoto, { input: id }));
        dispatch("fetchPhotos");
        commit("SET_SNACKBAR", {
          show: true,
          message: "Photo Removed",
          color: "var(--mh-orange)",
        });
      } catch (error) {
        console.log(error);
      }
    },
    async fetchPhotos({ commit }) {
      try {
        const res = await API.graphql(graphqlOperation(listPhotos));
        commit("SET_PHOTOS", res.data.listPhotos.items);
      } catch (error) {
        console.log(error);
      }
    },
    async fetchPhoto({ commit }, id) {
      try {
        const res = await API.graphql(graphqlOperation(getPhoto, { id: id }));
        commit("SET_PHOTO", res.data.getPhoto);
      } catch (error) {
        console.log(error)
      }
    }
  },
  mutations: {
    SET_PHOTOS: (state, photos) => (state.photos = photos),
    SET_PHOTO: (state, photo) => (state.photo = photo),
  },
  getters: {
    photos: (state) => state.photos,
    photo: (state) => state.photo,
  },
};

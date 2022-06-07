import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";

Vue.use(Vuex)

// API Endpoint
const API_URL = "https://localhost:44312/api";

export default new Vuex.Store({
  state: {
    products: []
  },
  getters: {
  },
  mutations: {
    GET_PRODUCTS(state, products) {
      state.products = products;
    },
  },
  actions: {
    // Products
    getProducts({ commit }) {
      axios
        .get(API_URL + "/products")
        .then((response) => {
          commit("GET_PRODUCTS", response.data);
        });
    },
    createProduct({ commit }, { body, onComplete, onError }) {
      axios
        .post(API_URL + "/products", body)
        .then(onComplete)
        .catch(onError);
    },    
  },
  modules: {
  }
})

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
    SET_PRODUCTS(state, products) {
      state.products = products;
    },
  },
  actions: {
    // Products
    setProducts({ commit }) {
      axios
        .get(API_URL + "/products")
        .then((response) => {
          commit("SET_PRODUCTS", response.data);
        });
    },
  },
  modules: {
  }
})

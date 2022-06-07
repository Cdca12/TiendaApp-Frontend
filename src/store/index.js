import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";

Vue.use(Vuex)

// API Endpoint
const API_URL = "https://localhost:44312/api";

export default new Vuex.Store({
  state: {
    products: [],
    product: {},
  },
  getters: {
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products;
    },
    SET_PRODUCT(state, product) {
      state.product = product;
    }
  },
  actions: {
    // Products
    getProducts({ commit }) {
      axios
        .get(`${API_URL}/products`)
        .then(res => {
          commit("SET_PRODUCTS", res.data);
        });
    },
    getProduct({ commit }, { id, onComplete, onError }) {
      axios
        .get(`${API_URL}/products/${id}`)
        .then(res => {
          commit("SET_PRODUCT", res.data);
          onComplete(res);
        })
        .catch(onError);
    },
    createProduct({ commit }, { body, onComplete, onError }) {
      axios
        .post(`${API_URL}/products`, body)
        .then(onComplete)
        .catch(onError);
    },
    editProduct({ commit }, { id, body, onComplete, onError }) {
      axios
        .put(`${API_URL}/products/${id}`, body)
        .then(onComplete)
        .catch(onError);
    },
  },
  modules: {
  }
})

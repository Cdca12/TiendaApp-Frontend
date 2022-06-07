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
    orders: [],

    cart: []
  },
  getters: {
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products;
    },
    SET_PRODUCT(state, product) {
      state.product = product;
    },
    SET_ORDERS(state, orders) {
      state.orders = orders;
    },
    SET_ORDER(state, order) {
      state.order = order;
    },
    ADD_TO_CART(state, product) {
      const productInCart = state.cart.find(p => p.productID === product.productID)

      // console.log(productInCart);
      // console.log(product);

      if (!productInCart) {
        state.cart.push(product);
      } else {
        productInCart.quantity++;
        productInCart.total = productInCart.quantity * productInCart.productPrice;
      }

      // console.log("Saved to cart:", x);
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
    deleteProduct({ commit }, { id, onComplete, onError }) {
      axios
        .delete(`${API_URL}/products/${id}`)
        .then(onComplete)
        .catch(onError);
    },
    // Categories
    // TODO...

    // Orders
    getOrders({ commit }) {
      axios
        .get(`${API_URL}/orders`)
        .then(res => {
          commit("SET_ORDERS", res.data);
        });
    },
    getOrder({ commit }, { id, onComplete, onError }) {
      axios
        .get(`${API_URL}/orders/${id}`)
        .then(res => {
          commit("SET_ORDER", res.data);
          onComplete(res);
        })
        .catch(onError);
    },
    createOrder({ commit }, { body, onComplete, onError }) {
      axios
        .post(`${API_URL}/orders`, body)
        .then(onComplete)
        .catch(onError);
    },
    editOrder({ commit }, { id, body, onComplete, onError }) {
      axios
        .put(`${API_URL}/orders/${id}`, body)
        .then(onComplete)
        .catch(onError);
    },
    deleteOrder({ commit }, { id, onComplete, onError }) {
      axios
        .delete(`${API_URL}/orders/${id}`)
        .then(onComplete)
        .catch(onError);
    },

    // Client
    addToCart({ commit }, { product }) {
      commit("ADD_TO_CART", product);
    },

  },
  modules: {
  }
})

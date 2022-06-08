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
    orderDetail: [{
      orderID: 0,
      clientName: "",
      orderDate: "1999/01/01",
      orderTotal: 0
    }],
    cart: [],
    clientID: 1,
    categories: [],
    productsCategory: []
  },
  getters: {
  },
  mutations: {
    // Products
    SET_PRODUCTS(state, products) {
      state.products = products;
    },
    SET_PRODUCT(state, product) {
      state.product = product;
    },
    // Orders
    SET_ORDERS(state, orders) {
      state.orders = orders;
    },
    SET_ORDER(state, order) {
      state.order = order;
    },
    SET_ORDER_DETAIL(state, orderDetail) {
      state.orderDetail = orderDetail;
    },
    // Cart
    ADD_TO_CART(state, product) {
      const productInCart = state.cart.find(p => p.productID === product.productID)
      if (!productInCart) {
        state.cart.push(product);
      } else {
        productInCart.quantity++;
        productInCart.total = productInCart.quantity * productInCart.productPrice;
      }
    },
    ADD_ITEM(state, productID) {
      const productInCart = state.cart.find(p => p.productID === productID)
      productInCart.quantity++;
      productInCart.total = productInCart.quantity * productInCart.productPrice;
    },
    REMOVE_ITEM(state, productID) {
      const productInCart = state.cart.find(p => p.productID === productID)
      productInCart.quantity--;
      productInCart.total = productInCart.quantity * productInCart.productPrice;
      if (productInCart.quantity == 0) {
        state.cart.splice(state.cart.indexOf(productInCart), 1)
      }
    },
    REMOVE_FROM_CART(state, productID) {
      const productInCart = state.cart.find(p => p.productID === productID)
      state.cart.splice(state.cart.indexOf(productInCart), 1)
    },
    CLEAN_CART(state) {
      state.cart = []
    },
    // Categories
    SET_CATEGORIES(state, categories) {
      state.categories = categories;
    },
    SET_PRODUCTS_CATEGORY(state, productsCategory) {
      state.productsCategory = productsCategory;
    },

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
    // Orders
    getOrders({ commit }) {
      axios
        .get(`${API_URL}/orders`)
        .then(res => {
          let orders = res.data.map(order => {
            return { ...order, orderDate: new Date(order.orderDate).toLocaleDateString('en-US') }
          });
          commit("SET_ORDERS", orders);
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
    getOrderDetail({ commit }, { id, onComplete, noData }) {
      axios
        .get(`${API_URL}/orders/detail/${id}`)
        .then(res => {
          if (res.data.length == 0) {
            noData();
          } else {
            onComplete();
            commit("SET_ORDER_DETAIL", res.data);
          }
        });
    },
    createOrder({ commit, state }, { onComplete, onError }) {
      axios
        .post(`${API_URL}/orders`, {
          ProductsID: state.cart.map(product => product.productID),
          Quantity: state.cart.map(product => product.quantity),
          ClientID: state.cart[0].clientID
        })
        .then(res => {
          setTimeout(commit("CLEAN_CART"), 500);
          onComplete(res);
        })
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
    // Categories
    getCategories({ commit }) {
      axios
        .get(`${API_URL}/categories`)
        .then(res => {
          commit("SET_CATEGORIES", res.data);
        });
    },
    getProductsByCategory({ commit }, { id }) {
      axios
        .get(`${API_URL}/products/categories/${id}`)
        .then(res => {
          commit("SET_PRODUCTS_CATEGORY", res.data);
        })
    }

  },
  modules: {
  }
})

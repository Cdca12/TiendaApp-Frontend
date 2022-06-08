import Vue from 'vue'
import VueRouter from 'vue-router'

import ProductsClient from '../views/client/ProductsClient.vue'


import Products from '../views/products/Products.vue'
import AddProduct from '../views/products/AddProduct.vue'
import EditProduct from '../views/products/EditProduct.vue'

import Categories from '../views/categories/Categories.vue'

import Orders from '../views/orders/Orders.vue'


Vue.use(VueRouter)

const routes = [
  // Client

  // Products
  {
    path: '/client/products',
    name: 'ProductsClient',
    component: ProductsClient
  },








  // Products
  {
    path: '/products',
    name: 'Products',
    component: Products
  },
  {
    path: "/products/add",
    name: "AddProduct",
    component: AddProduct,
  },
  {
    path: "/products/edit/:id",
    name: "EditProduct",
    component: EditProduct,
  },
  // Categories
  {
    path: '/categories',
    name: 'Categories',
    component: Categories
  },
  // Orders
  {
    path: '/orders',
    name: 'Orders',
    component: Orders
  },



]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

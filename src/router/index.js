import Vue from 'vue'
import VueRouter from 'vue-router'

import ProductsClient from '../views/client/products/ProductsClient.vue'

import ProductsAdmin from '../views/admin/products/ProductsAdmin.vue'
import AddProduct from '../views/admin/products/AddProduct.vue'
import EditProduct from '../views/admin/products/EditProduct.vue'

import CategoriesProduct from '../views/admin/categories/CategoriesProduct.vue'

import Orders from '../views/admin/orders/Orders.vue'


Vue.use(VueRouter)

const routes = [
  // Client

  // Products
  {
    path: '/client/products',
    name: 'ProductsClient',
    component: ProductsClient
  },


  // Admin

  // Products
  {
    path: '/admin/products',
    name: 'ProductsAdmin',
    component: ProductsAdmin
  },
  {
    path: "/admin/products/add",
    name: "AddProduct",
    component: AddProduct,
  },
  {
    path: "/admin/products/edit/:id",
    name: "EditProduct",
    component: EditProduct,
  },
  // Categories
  {
    path: '/admin/products/categories',
    name: 'CategoriesProduct',
    component: CategoriesProduct
  },
  // Orders
  {
    path: '/admin/orders',
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

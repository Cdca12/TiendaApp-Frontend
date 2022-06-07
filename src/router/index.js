import Vue from 'vue'
import VueRouter from 'vue-router'

import Products from '../views/products/Products.vue'
import AddProduct from '../views/products/AddProduct.vue'
import EditProduct from '../views/products/EditProduct.vue'

Vue.use(VueRouter)

const routes = [
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

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

<template>
  <div id="app">

    <!-- Client -->
    <div v-if="isClient">
      <b-navbar type="dark" variant="dark" toggleable="lg">
        <b-navbar-brand tag="h1" class="mx-4" to="/">
          Client
        </b-navbar-brand>
        |
        <b-navbar-brand tag="h1" class="mx-4 text-secondary" @click="toggleUser()" to="/">
          Admin
        </b-navbar-brand>
      </b-navbar>

      <b-navbar type="dark" variant="dark" class="justify-content-md-center" toggleable="lg">
        <b-navbar-brand tag="h1" class="mx-4" to="/">
          Home
        </b-navbar-brand>
        <b-navbar-brand tag="h1" class="mx-4" to="/client/products">
          Products
        </b-navbar-brand>
      </b-navbar>

    </div>

    <!-- Admin -->
    <div v-if="isAdmin">
      <b-navbar v-if="isAdmin" type="dark" variant="dark" toggleable="lg">
        <b-navbar-brand tag="h1" class="mx-4 text-secondary" @click="toggleUser()" to="/">
          Client
        </b-navbar-brand>
        |
        <b-navbar-brand tag="h1" class="mx-4 " to="/">
          Admin
        </b-navbar-brand>
      </b-navbar>

      <!-- Admin -->
      <b-navbar type="dark" variant="dark" class="justify-content-md-center" toggleable="lg">
        <b-navbar-brand tag="h1" class="mx-4" to="/">
          Home
        </b-navbar-brand>
        <b-navbar-brand tag="h1" class="mx-4" to="/admin/products">
          Products
        </b-navbar-brand>
        <b-navbar-brand tag="h1" class="mx-4" to="/admin/categories">
          Categories
        </b-navbar-brand>
        <b-navbar-brand tag="h1" class="mx-4" to="/admin/products/categories">
          CategoryProducts
        </b-navbar-brand>
        <b-navbar-brand tag="h1" class="mx-4" to="/admin/orders">
          Orders
        </b-navbar-brand>
      </b-navbar>

    </div>

    <router-view class="container mt-3" />
    <notifications position="bottom right" />
  </div>
</template>

<script>

import { mapState, mapActions } from "vuex";

export default {
  name: "App",
  data() {
    return {
      isClient: true,
      isAdmin: false
    };
  },
  computed: {
  },
  methods: {
    toggleUser() {
      this.isClient = !this.isClient;
      this.isAdmin = !this.isAdmin;
    },
  },
};


</script>



<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.client-navbar {
  background-color: black;
  color: white;
  font-size: 18px;
  height: 40px;
  padding-top: 7px;
  display: flex;
}

/*

.client-navbar-brand {
  color: white;
}

.client-navbar-brand:hover {
  color: white;
}

.client-navbar-brand:active {
  color: black;
}

.client-navbar-brand:visited {
  color: white;
} */
</style>

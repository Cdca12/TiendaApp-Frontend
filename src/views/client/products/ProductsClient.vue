<template>
    <div>
        <Cart v-show="showCart" @closeCart="showCart = false" />

        <h1>Products</h1>
        <div class="add-button">
            <b-button variant="dark" @click="showCart = true">
                <b-icon icon="cart" /> Cart
            </b-button>
        </div>

        <Table :items="products" :fields="fields">
            <template slot="image" slot-scope="{ item }">
                <img :src="require(`@/assets/tenis-img/${item.item.productImage}`)" width="100px" />
            </template>

            <template slot="actions" slot-scope="{ item }">
                <b-button variant="primary" @click="addToCart(item)">
                    <b-icon icon="plus" /> Add to Cart
                </b-button>
            </template>
        </Table>
    </div>
</template>

<script>

import { mapState, mapActions } from "vuex";
import Table from "../../../components/Table";
import Cart from './Cart.vue'

export default {
    name: "ProductsClient",
    components: {
        Table,
        Cart
    },
    data() {
        return {
            fields: [
                { key: "image", label: "Image", thStyle: { width: '10%' } },
                { key: "productID", label: "ID", thStyle: { width: '15%' } },
                { key: "productName", label: "Name", thStyle: { width: '30%' } },
                { key: "productPrice", label: "Price", thStyle: { width: '20%' } },
                { key: "actions", label: "", thStyle: { width: '15%' } }
            ],
            showCart: false,
        };
    },
    computed: {
        ...mapState(["products", "cart", "clientID"]),
    },
    methods: {
        ...mapActions(["getProducts"]),
        addToCart(item) {
            let product = {
                productID: item.item.productID,
                productName: item.item.productName,
                productPrice: item.item.productPrice,
                quantity: 1,
                clientID: this.clientID,
                total: item.item.productPrice * 1
            }
            this.$store.commit("ADD_TO_CART", product);
            this.$notify({
                type: "success",
                title: "Product added to cart"
            });
        },
    },
    // Life cycle methods
    created() {
        this.getProducts();
    },
};


</script>

<style>
</style>
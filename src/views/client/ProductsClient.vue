<template>
    <div>
        <h1>ProductsClient</h1>
  
        <Table :items="products" :fields="fields">
            <template slot="actions" slot-scope="{ item }">
                <b-button variant="primary" @click="addItem(item)">
                    <b-icon icon="plus"/>
                </b-button>
            </template>
        </Table>

         <Table :items="cart" :fields="cartFields">
            <template slot="actions" slot-scope="{ item }">
                {{item.productName}}
            </template>
        </Table>
        Total
    </div>
</template>

<script>

import { mapState, mapActions } from "vuex";
import Table from "../../components/Table";

export default {
    name: "ProductsClient",
    components: {
        Table
    },
    data() {
        return {
            fields: [
                { key: "productID", label: "ID", thStyle: { width: '15%' } },
                { key: "productName", label: "Name", thStyle: { width: '50%' } },
                { key: "productPrice", label: "Price", thStyle: { width: '20%' }},
                { key: "actions", label: "", thStyle: { width: '15%' } }
            ],
            cartFields: [
                { key: "productID", label: "ID" },
                { key: "productName", label: "Name" },
                { key: "productPrice", label: "Price" },
                { key: "quantity", label: "Quantity" },
                { key: "quantity", label: "Quantity" },
                { key: "total", label: "Total", thStyle: { width: '15%' } },
                { key: "actions", label: "Total", thStyle: { width: '15%' } }
            ],
            product: {}
        };
    },
    computed: {
        ...mapState(["products", "cart"]),
    },
    methods: {
        ...mapActions(["getProducts"]),
        addItem(item) {
            this.product = {
                productID: item.item.productID,
                productName: item.item.productName,
                productPrice: item.item.productPrice,
                quantity: 1,
                clientID: 1,
                total: item.item.productPrice * 1
            }
            this.$store.commit("ADD_TO_CART", this.product);
        }
    },
    // Life cycle methods
    created() {
        this.getProducts();
    },
};


</script>

<style>

</style>
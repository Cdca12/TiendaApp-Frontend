<template>
    <div>
        <h1>Cart</h1>
  
        <Table :items="cart" :fields="fields">
            <template slot="actions" slot-scope="{ item }">
            </template>
        </Table>
    </div>
</template>

<script>

import { mapState, mapActions } from "vuex";
import Table from "../../components/Table";

export default {
    name: "Cart",
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
        };
    },
    computed: {
        ...mapState(["cart"]),
    },
    methods: {
    },
    // Life cycle methods
    created() {
        // this.getProducts();
    },
};


</script>

<style>

</style>
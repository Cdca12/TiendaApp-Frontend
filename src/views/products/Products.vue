<template>
    <div>
        <h1>Products</h1>
        <div class="add-button">
            <b-button variant="dark" to="tickets/agregar">
                <b-icon icon="plus" /> Add Product
            </b-button>
        </div>

        <Table :items="products" :fields="fields">
            <template slot="actions" slot-scope="{ item }">
                <b-button style="margin: 0 5px" variant="warning" @click="onEditarTicket(item)">
                <b-icon icon="pencil-square"  />
                </b-button>
                <b-button variant="danger" @click="onEliminar(item)">
                    <b-icon icon="trash" />
                </b-button>
            </template>
        </Table>
    </div>
</template>

<script>

import { mapState, mapActions } from "vuex";
import Table from "../../components/Table";

export default {
    name: "Products",
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
        ...mapState(["products"]),
    },
    methods: {
        ...mapActions(["setProducts"]),



    },
    // Life cycle methods
    created() {
        this.setProducts();
        console.log("Test");
    },
};


</script>

<style>

.add-button {
    float: right;
    margin-right: 1%;
    margin-top: 5px;
    margin-bottom: 15px;
}

</style>
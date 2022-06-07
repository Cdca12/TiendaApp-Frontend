<template>
    <div>
        <h1>Products</h1>
        <div class="add-button">
            <b-button variant="dark" to="products/add">
                <b-icon icon="plus" /> Add Product
            </b-button>
        </div>

        <Table :items="products" :fields="fields">
            <template slot="actions" slot-scope="{ item }">
                <b-button style="margin: 0 5px" variant="warning" @click="onEditProduct(item)">
                <b-icon icon="pencil-square"  />
                </b-button>
                <b-button variant="danger" @click="onDelete(item)">
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
        ...mapActions(["getProducts", "deleteProduct"]),
        onEditProduct(item) {
            this.$router.push({
                name: "EditProduct",
                params: {
                    id: item.item.productID,
                },
            });
        },
        onDelete(item) {
            this.$bvModal
                .msgBoxConfirm("Are you sure you want to delete this?", {
                    title: "Delete product",
                    size: "sm",
                    buttonSize: "sm",
                    okVariant: "danger",
                    okTitle: "Confirm",
                    cancelTitle: "Cancel",
                    footerClass: "p-2",
                    centered: true,
                })
                .then(value => {
                    if (value) {
                        this.deleteProduct({
                            id: item.item.productID,
                            onComplete: res => {
                                this.$notify({
                                    type: "success",
                                    title: "Product deleted successfully",
                                });
                                setTimeout(() => this.getProducts(), 500);
                            },
                            onError: err => {
                                this.$notify({
                                    type: "error",
                                    title: "Error deleting product",
                                });
                            },
                        });
                    }
                })
                .catch(err => {
                    // An error ocurred
                })
        }

    },
    // Life cycle methods
    created() {
        this.getProducts();
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
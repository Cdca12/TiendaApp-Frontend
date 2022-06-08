<template>
    <div>
        <h1>Categories</h1>

        <div class="actions">


            <div class="select"> Select a category: {{ selected }}

                <select style="margin-left: 10px" v-model="selected">
                    <option selected disabled>Select category</option>
                    <option>A</option>
                    <option>B</option>
                    <option>C</option>

                    <!-- <option
                v-for="item in items"
                :value="item[iditem]"
                :key="item[iditem]"
                :selected="item[iditem]==vmodel"
            >
            {{ item[name] }} {{ item[lastname] }}
            </option>  -->
                </select>



            </div>
            <div class="add-button">
                <b-button variant="dark" to="products/add">
                    <b-icon icon="plus" /> Add a product to this category
                </b-button>
            </div>

        </div>


        <Table class="products-table" :items="products" :fields="fields">
            <template slot="actions" slot-scope="{ item }">
            </template>
        </Table>

    </div>
</template>

<script>

import { mapState, mapActions } from "vuex";
import Table from "../../../components/Table";

export default {
    name: "Categories",
    components: {
        Table
    },
    data() {
        return {
            fields: [
                { key: "productID", label: "ID", thStyle: { width: '15%' } },
                { key: "productName", label: "Name", thStyle: { width: '50%' } },
                { key: "productPrice", label: "Price", thStyle: { width: '20%' } }
            ],
        };
    },
    computed: {
        ...mapState(["products"]),
    },
    methods: {
        ...mapActions(["getProducts", "deleteProduct"]),
        test() {
            console.log(this.products)
        },
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
.actions {
    display: flex;
    justify-content: space-around;
    align-items: center;
}


.add-button {
    /* float: right; */
    /* margin-right: 10%; */
    /* margin-top: 5px; */
    /* margin-bottom: 15px; */
}

.select {
    display: flex;
    /* margin-left: 15%; */
    /* margin-bottom: 30px; */
}

.products-table {
    width: 70%;
    margin: 0 auto;
}
</style>

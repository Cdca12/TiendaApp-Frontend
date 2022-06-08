<template>
    <div>
        <h1>CategoriesProduct</h1>

        <div class="actions">


            <div class="select "> Category:

                <select 
                    style="margin-left: 10px; width: 150px" 
                    v-model="categoryId"
                    @change="obtainProductsByCategory()">
                    <option :value="0" disabled>Select a category</option>

                    <option v-for="category in categories" :value="category.categoryID">
                        {{ category.categoryName }}
                    </option>
                </select>
            </div>

            <div class="add-button">
                <b-button variant="dark">
                    <b-icon icon="plus" /> Add a product to this category
                </b-button>
            </div>

        </div>


        <Table class="products-table" :items="productsCategory" :fields="fields">
            <template slot="actions" slot-scope="{ item }">
            </template>
        </Table>

    </div>
</template>

<script>

import { mapState, mapActions } from "vuex";
import Table from "../../../components/Table";

export default {
    name: "CategoriesProduct",
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
            categoryId: 0
        };
    },
    computed: {
        ...mapState(["categories", "productsCategory"]),
    },
    methods: {
        ...mapActions(["getCategories", "getProductsByCategory"]),
        obtainProductsByCategory() {
            // Test
            this.getProductsByCategory({ id: this.categoryId });
        },

        // Old
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
        this.getCategories();
    },
};


</script>

<style>
.actions {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 0 10px;
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

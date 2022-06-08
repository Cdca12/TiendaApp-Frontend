<template>
    <div>
        <h1>CategoriesProduct</h1>

        <div class="actions">


            <div class="select "> Category:

                <select style="margin-left: 10px; width: 150px" v-model="categoryID"
                    @change="obtainProductsByCategory()">
                    <option :value="0" disabled>Select a category</option>

                    <option v-for="category in categories" :value="category.categoryID">
                        {{ category.categoryName }}
                    </option>
                </select>
            </div>

            <div class="add-button">
                <b-button v-bind:disabled='!isValidCategory' @click="openProductsNotCategory()" variant="dark">
                    <b-icon icon="plus" /> Add a product to this category
                </b-button>
            </div>

        </div>

        <Table class="products-table" :items="productsCategory" :fields="fields">
            <template slot="actions" slot-scope="{ item }">
                <b-button variant="danger" @click="onDelete(item)">
                    <b-icon icon="x" />
                </b-button>
            </template>
        </Table>

        <AddCategoryProducts :categoryID="categoryID" v-show="showProductNotCategory"
            @closeProductNotCategory="showProductNotCategory = false" />

    </div>
</template>

<script>

import { mapState, mapActions } from "vuex";
import Table from "../../../components/Table";
import AddCategoryProducts from './AddCategoryProducts';

export default {
    name: "CategoriesProduct",
    components: {
        Table,
        AddCategoryProducts
    },
    data() {
        return {
            fields: [
                { key: "productID", label: "ID", thStyle: { width: '15%' } },
                { key: "productName", label: "Name", thStyle: { width: '50%' } },
                { key: "productPrice", label: "Price", thStyle: { width: '20%' } },
                { key: "actions", label: "", thStyle: { width: '15%' } }
            ],
            categoryID: 0,
            showProductNotCategory: false
        };
    },
    computed: {
        ...mapState(["categories", "productsCategory"]),
        isValidCategory() {
            return this.categoryID != 0;
        }
    },
    methods: {
        ...mapActions(["getCategories", "getProductsByCategory", "getProductsNotInCategory", "deleteCategoryProduct"]),
        obtainProductsByCategory() {
            this.getProductsByCategory({ id: this.categoryID });
        },
        openProductsNotCategory() {
            this.getProductsNotInCategory({ id: this.categoryID });
            this.showProductNotCategory = true;
        },


        // Old
        onDelete(item) {
            this.$bvModal
                .msgBoxConfirm("Remove product from this category?", {
                    title: "Remove product",
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
                        this.deleteCategoryProduct({
                            categoryID: this.categoryID,
                            productID: item.item.productID,
                            onComplete: res => {
                                this.$notify({
                                    type: "success",
                                    title: "Product removed successfully",
                                });
                                setTimeout(() => this.obtainProductsByCategory(), 500);
                            },
                            onError: err => {
                                this.$notify({
                                    type: "error",
                                    title: "Error removing product",
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

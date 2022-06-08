<template>
    <div class="categories">
        <h1 class="title">Categories</h1>

        <div class="actions">
            <div class="add-button">
                <b-button variant="dark" to="categories/add">
                    <b-icon icon="plus" /> Add Category
                </b-button>
            </div>
        </div>

        <Table class="categories-table" :items="categories" :fields="fields">
            <template slot="actions" slot-scope="{ item }">
                <b-button style="margin: 0 5px" variant="warning" @click="onEditCategory(item)">
                    <b-icon icon="pencil-square" />
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
import Table from "../../../components/Table";

export default {
    name: "Categories",
    components: {
        Table
    },
    data() {
        return {
            fields: [
                { key: "categoryID", label: "ID", thStyle: { width: '10%' } },
                { key: "categoryName", label: "Name", thStyle: { width: '30%' } },
                { key: "actions", label: "", thStyle: { width: '20%' } }
            ],
        };
    },
    computed: {
        ...mapState(["categories"]),
    },
    methods: {
        ...mapActions(["getCategories", "deleteCategory"]),
        onEditCategory(item) {
            this.$router.push({
                name: "EditCategory",
                params: {
                    id: item.item.categoryID,
                },
            });
        },
        onDelete(item) {
            this.$bvModal
                .msgBoxConfirm("Are you sure you want to delete this?", {
                    title: "Delete category",
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
                        this.deleteCategory({
                            id: item.item.categoryID,
                            onComplete: res => {
                                this.$notify({
                                    type: "success",
                                    title: "Category deleted successfully",
                                });
                                setTimeout(() => this.getCategories(), 500);
                            },
                            onError: err => {
                                this.$notify({
                                    type: "error",
                                    title: "Error deleting category",
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

<style scoped>
.categories {
    width: 30%;
}

.title {
    display: flex;
    justify-content: center;
}

.actions {
    display: flex;
    justify-content: flex-end;
}

.categories-table {}
</style>
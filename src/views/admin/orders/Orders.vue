<template>
    <div>
        <h1>Orders</h1>
        <div class="add-button">
            <b-button variant="dark" to="products/add">
                <b-icon icon="plus" /> Add Order
            </b-button>
        </div>

        <Table :items="orders" :fields="fields">
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
import Table from "../../../components/Table";

export default {
    name: "Orders",
    components: {
        Table
    },
    data() {
        return {
            fields: [
                { key: "orderID", label: "ID", thStyle: { width: '10%' } },
                { key: "orderDate", label: "Date", thStyle: { width: '30%' } },
                { key: "orderTotal", label: "Total", thStyle: { width: '20%' }},
                { key: "clientID", label: "Client", thStyle: { width: '20%' },},
                // { key: "clientName", label: "Client", thStyle: { width: '20%' }},
                { key: "actions", label: "", thStyle: { width: '15%' } }
            ],
        };
    },
    computed: {
        ...mapState(["orders"]),
    },
    methods: {
        ...mapActions(["getOrders", "deleteProduct"]),
        async getClientNames() {
            // var ordersInfo = this.orders.map((order, i) => { 
            //     order.value
            // });
            // console.log(ordersInfo)
            console.log(this.orders)
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
                                    title: "Order deleted successfully",
                                });
                                setTimeout(() => this.getProducts(), 500);
                            },
                            onError: err => {
                                this.$notify({
                                    type: "error",
                                    title: "Error deleting order",
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
    async created() {
        await this.getOrders();
        // await this.getClientNames();
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
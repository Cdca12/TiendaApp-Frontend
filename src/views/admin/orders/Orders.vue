<template>
    <div>
        <h1>Orders</h1>
        <!-- <div class="add-button">
            <b-button variant="dark" to="products/add">
                <b-icon icon="plus" /> Add Order
            </b-button>
        </div> -->


        <Table :items="orders" :fields="fields">
            <template slot="actions" slot-scope="{ item }">
                <b-button style="margin: 0 5px" variant="primary" @click="openOrderDetail(item)">
                    <b-icon icon="eye-fill" />
                </b-button>
                <!-- <b-button variant="warning" @click="onDelete(item)">
                    <b-icon icon="pencil-square" />
                </b-button> -->
                <!-- <b-button variant="danger" @click="onDelete(item)">
                    <b-icon icon="trash" />
                </b-button> -->
            </template>
        </Table>

        <OrderDetail v-show="showOrderDetail" @closeOrderDetail="showOrderDetail = false" />
    </div>
</template>

<script>

import { mapState, mapActions } from "vuex";
import Table from "../../../components/Table";
import OrderDetail from "./OrderDetail.vue";

export default {
    name: "Orders",
    components: {
        Table,
        OrderDetail
    },
    data() {
        return {
            fields: [
                { key: "orderID", label: "ID", thStyle: { width: '10%' } },
                { key: "orderDate", label: "Date", thStyle: { width: '30%' } },
                { key: "orderTotal", label: "Total", thStyle: { width: '20%' } },
                { key: "clientID", label: "Client", thStyle: { width: '20%' }, },
                // { key: "clientName", label: "Client", thStyle: { width: '20%' }},
                { key: "actions", label: "", thStyle: { width: '15%' } }
            ],
            showOrderDetail: false,
        };
    },
    computed: {
        ...mapState(["orders"]),
    },
    methods: {
        ...mapActions(["getOrders", "deleteProduct", "getOrderDetail"]),
        // async getClientNames() {
        //     // var ordersInfo = this.orders.map((order, i) => { 
        //     //     order.value
        //     // });
        //     // console.log(ordersInfo)
        //     console.log(this.orders)
        // },
        openOrderDetail(item) {
            let { orderID } = item.item;
            this.getOrderDetail({
                id: orderID,
                onComplete: () => {
                    this.showOrderDetail = true;
                },
                noData: () => {
                    this.$notify({
                        type: "error",
                        title: "This order doesn't have order detail info",
                    });
                }
            });



        },


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
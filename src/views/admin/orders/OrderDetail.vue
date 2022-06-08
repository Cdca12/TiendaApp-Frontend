<template>
    <div class="modal-overlay" @click="$emit('closeOrderDetail')">
        <div class="modal-content" @click.stop>
            <h2>OrderDetail</h2>

            <!-- Headers Test -->
            <div class="div-1">
                <div class="div-2">
                    <div> OrderID: {{ orderDetail[0].orderID }} </div>
                    <span style="margin-left: 40px" />
                    <div> Client: {{ orderDetail[0].clientName }} </div>
                </div>

                <div> Date: {{ new Date(orderDetail[0].orderDate).toLocaleDateString('en-US') }} </div>
            </div>

            <Table :items="orderDetail" :fields="fields" />

            <div class="div-3"> Total: {{ orderDetail[0].orderTotal }} </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Table from "../../../components/Table.vue";

export default {
    name: "OrderDetail",
    components: {
        Table,
    },
    data() {
        return {
            fields: [
                { key: "productID", label: "ID", thStyle: { width: '10%' } },
                { key: "productName", label: "Name", thStyle: { width: '20%' } },
                { key: "orderQuantity", label: "Quantity", thStyle: { width: '10%' } },
                { key: "orderTotalProduct", label: "Total Product", thStyle: { width: '30%' } },
                // { key: "actions", thStyle: { width: '20%' } }
            ],
        };
    },
    computed: {
        ...mapState(["orderDetail"]),
    },
    methods: {
    },
};
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    background-color: #000000da;
}

.modal-content {
    text-align: center;
    background-color: white;
    height: 400px;
    width: 800px;
    margin-top: 10%;
    padding: 10px 0;
    border-radius: 20px;
    overflow-y: auto;
}

.div-1 {
    display: flex;
    justify-content: space-between;
    margin: 0 30px;
}

.div-2 {
    display: flex;
}

.div-3 {
    display: flex;
    justify-content: flex-end;
    margin: 0 30px;
}

/* 
h6 {
    font-weight: 500;
    font-size: 28px;
    margin: 20px 0;
} */

p {
    font-size: 16px;
    margin: 20px 0;
}
</style>
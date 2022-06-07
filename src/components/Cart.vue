<template>
  <div class="modal-overlay" @click="$emit('closeCart')">
    <div class="modal-content" @click.stop>
      <h2>Cart</h2>
      <div class="purchase-button">
        <b-button v-bind:disabled='!cartHasItems' variant="primary" @click="purchaseOrder()">
          <b-icon icon="bag" /> Purchase
        </b-button>
      </div>
      <Table :items="cart" :fields="cartFields">
        <template slot="total" slot-scope="{ item }">
        </template>
        <template slot="actions" slot-scope="{ item }">
          <b-button variant="secondary" @click="removeItem(item)">
            <b-icon icon="dash" />
          </b-button>
          <b-button variant="primary" class="mx-1" @click="addItem(item)">
            <b-icon icon="plus" />
          </b-button>
          <b-button variant="danger" @click="removeFromCart(item)">
            <b-icon icon="trash" />
          </b-button>
        </template>

      </Table>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Table from "./Table";

export default {
  name: "ProductsClient",
  components: {
    Table,
  },
  data() {
    return {
      cartFields: [
        { key: "productID", label: "ID", thStyle: { width: '5%' } },
        { key: "productName", label: "Name", thStyle: { width: '30%' } },
        { key: "productPrice", label: "Price", thStyle: { width: '10%' } },
        { key: "quantity", label: "Quantity", thStyle: { width: '10%' } },
        { key: "total", label: "Total", thStyle: { width: '10%' } },
        { key: "actions", thStyle: { width: '20%' } }
      ],
      product: {}
    };
  },
  computed: {
    ...mapState(["cart"]),
    cartHasItems() {
      return this.cart.length > 0;
    }
  },
  methods: {
    ...mapActions(["createOrder"]),
    purchaseOrder() {
      this.createOrder({
        onComplete: res => {
          this.$notify({
            type: "success",
            title: "Order purchased successfully",
          });
          setTimeout(() => this.$emit('closeCart'), 2000);
        },
        onError: err => {
          this.$notify({
            type: "error",
            title: "Error purchasing order",
          });
        },
      });

    },
    addItem(item) {
      let { productID } = item.item;
      this.$store.commit("ADD_ITEM", productID);
    },
    removeItem(item) {
      let { productID } = item.item;
      this.$store.commit("REMOVE_ITEM", productID);
    },
    removeFromCart(item) {
      let { productID } = item.item;
      this.$store.commit("REMOVE_FROM_CART", productID);
    }
  }
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

.purchase-button {
  display: flex;
  justify-content: end;
  margin-right: 20px;
  /* margin-top: 30%; */
  margin-bottom: 15px;
}

.close {
  margin: 10% 0 0 16px;
  cursor: pointer;
}

.close-img {
  width: 25px;
}

.check {
  width: 150px;
}

h6 {
  font-weight: 500;
  font-size: 28px;
  margin: 20px 0;
}

p {
  font-size: 16px;
  margin: 20px 0;
}
</style>
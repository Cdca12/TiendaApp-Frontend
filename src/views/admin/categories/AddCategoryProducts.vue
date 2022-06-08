<template>
  <div class="modal-overlay" @click="$emit('closeProductNotCategory')">
    <div class="modal-content" @click.stop>
      <h2>Add Product to category</h2>

      <Table :items="productsNotCategory" :fields="fields">
        <template slot="actions" slot-scope="{ item }">
          <b-button variant="primary" class="mx-1" @click="addProductToCategory(item)">
            <b-icon icon="plus" /> Add to category
          </b-button>
        </template>

      </Table>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Table from "../../../components/Table.vue";

export default {
  name: "AddCategoryProducts",
  components: {
    Table,
  },
  props: {
    categoryID: Number
  },
  data() {
    return {
      fields: [
        { key: "productID", label: "ID", thStyle: { width: '10%' } },
        { key: "productName", label: "Name", thStyle: { width: '20%' } },
        { key: "productPrice", label: "Price", thStyle: { width: '10%' } },
        { key: "actions", label: "", thStyle: { width: '15%' } }
      ],
    };
  },
  computed: {
    ...mapState(["productsNotCategory"])
  },
  methods: {
    ...mapActions(["createCategoryProduct", "getProductsByCategory"]),
    addProductToCategory(item) {
      let body = {
        categoryID: this.categoryID,
        productID: item.item.productID,
      }
      this.createCategoryProduct({
        body,
        onComplete: res => {
          this.$notify({
            type: "success",
            title: "Order purchased successfully",
          });
          // setTimeout(() => this.getProductsByCategory(this.categoryID), 500);
          this.getProductsByCategory({ id: res.data.categoryID });
          setTimeout(() => this.$emit('closeProductNotCategory'), 1000);
        },
        onError: err => {
          this.$notify({
            type: "error",
            title: "Error purchasing order",
          });
        },
      });

    },
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
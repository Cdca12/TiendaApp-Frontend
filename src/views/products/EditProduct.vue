<template>
    <div>
        <h1>Edit Product</h1>
        <b-form class="form" @submit.prevent="save()">
            <div class="inputs">
                <Input 
                    v-model="product.productName" 
                    id="productName" 
                    titulo="Product name"
                    placeholder="Enter the name of the product" 
                    :error="validationErrors && !validateName"
                    messageError="The name of the product is required" 
                    class="mt-3 col-8" />
                <Input 
                    v-model="product.productPrice" 
                    id="productPrice" 
                    titulo="Product price"
                    placeholder="Enter the price of the product" 
                    :error="validationErrors && !validatePriority"
                    messageError="The price of the product is required" 
                    class="mt-3 col-8" />
            </div>

            <b-button type="submit" class="save-button" variant="dark">Save</b-button>
        </b-form>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Vue from 'vue'
import Input from '../../components/Input.vue';

export default {
    name: "EditProduct",
    components: {
        Input
    },
    data() {
        return {
            product: {
                productID: "",
                productName: "",
                productPrice: ""
            },
            validationErrors: false,
        };
    },
    computed: {
        validateName() {
            return (
                this.product.productName !== undefined &&
                this.product.productName !== ""
            );
        },
        validatePriority() {
            return (
                this.product.productPrice !== undefined &&
                this.product.productPrice !== ""
            );
        },
    },
    methods: {
        ...mapActions(["getProduct", "editProduct"]),
        save() {
            if (
                !(
                    this.validateName &&
                    this.validatePriority
                )
            ) {
                // Error: Do nothing
                this.validationErrors = true;
            } else {
                // Edit Product
                this.validationErrors = false;
                this.editProduct({
                    id: this.product.productID,
                    body: this.product,
                    onComplete: res => {
                        this.$notify({
                            type: "success",
                            title: "Product edited successfully!",
                        });
                        this.$router.push({
                            name: "Products",
                        });
                    },
                    onError: err => {
                        this.$notify({
                            type: "error",
                            title: "Error editing product",
                        });
                    },
                });
            }
        },
    },
    // Life Cycle methods
    created() {
        this.getProduct({
            id: this.$route.params.id,
            onComplete: res => Vue.set(this, 'product', res.data)
        })
  },
};
</script>

<style scoped>
.form {
    margin: auto;
    height: 250px;
    margin-top: 30px;
    width: 30%;
    box-shadow: 0px 10px 20px -7px rgba(32, 56, 117, 0.527);
    border-radius: 5px;
    padding: 10px;
    overflow: hidden;
    background-color: white;
}

.inputs {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.save-button {
    width: 20%;
    margin-top: 30px;
    float: right;
}

</style>
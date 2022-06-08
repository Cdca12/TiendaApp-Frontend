<template>
    <div>
        <h1>Add Product</h1>
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

            <b-button type="submit" class="save-button" variant="dark">Confirm</b-button>
        </b-form>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Input from '../../../components/Input.vue';

export default {
    name: "AddProduct",
    components: {
        Input
    },
    data() {
        return {
            product: {
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
        ...mapActions(["createProduct"]),
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
                // Add Product
                this.validationErrors = false;
                this.createProduct({
                    body: this.product,
                    onComplete: res => {
                        this.$notify({
                            type: "success",
                            title: "Product created successfully!",
                        });
                        this.$router.push({
                            name: "Products",
                        });
                    },
                    onError: err => {
                        this.$notify({
                            type: "error",
                            title: "Error creating product",
                        });
                    },
                });
            }
        },
    },
    // Life Cycle methods
};
</script>

<style>
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
    width: 30%;
    margin-top: 30px;
    float: right;
}

</style>
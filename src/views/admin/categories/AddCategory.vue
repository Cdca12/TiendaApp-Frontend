<template>
    <div>
        <h1>Add Category</h1>
        <b-form class="form" @submit.prevent="save()">
            <div class="inputs">
                <Input 
                    v-model="category.categoryName" 
                    id="categoryName" 
                    titulo="Category name"
                    placeholder="Enter the name of the category" 
                    :error="validationErrors && !validateName"
                    messageError="The name of the category is required" 
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
    name: "AddCategory",
    components: {
        Input
    },
    data() {
        return {
            category: {
                categoryName: "",
            },
            validationErrors: false,
        };
    },
    computed: {
        validateName() {
            return (
                this.category.categoryName !== undefined &&
                this.category.categoryName !== ""
            );
        }
    },
    methods: {
        ...mapActions(["createCategory"]),
        save() {
            if (
                !(
                    this.validateName
                )
            ) {
                // Error: Do nothing
                this.validationErrors = true;
            } else {
                // Add Category
                this.validationErrors = false;
                this.createCategory({
                    body: this.category,
                    onComplete: res => {
                        this.$notify({
                            type: "success",
                            title: "Category created successfully!",
                        });
                        this.$router.push({
                            name: "Categories",
                        });
                    },
                    onError: err => {
                        this.$notify({
                            type: "error",
                            title: "Error creating category",
                        });
                    },
                });
            }
        },
    },
    // Life Cycle methods
};
</script>

<style scoped>
.form {
    margin: auto;
    height: 180px;
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
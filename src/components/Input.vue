<template>
	<div>
		<label :for="id">{{ titulo }}</label>
		<input
			:id="id"
			class="form-control"
			:value="value"
			:type="tipo"
			:maxlength="maxlength"
			:disabled="disabled"
			:placeholder="placeholder"
			@input="$emit('input', $event.target.value)"
		/>
		<span v-if="error" class="text-danger">{{ messageError }}</span>
	</div>
</template>

<script>
export default {
	name: "Input",
	props: {
		id: {
			type: [String, Number],
			required: true,
		},
		titulo: String,
		value: [String, Number],
		tipo: {
			type: String,
			default: "text",
		},
		maxlength: {
			type: Number,
			default: 100,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		placeholder: {
			type: String,
			default: "Enter value",
		},
		messageError: {
			type: String,
			default: "Required value",
		},
		error: {
			type: Boolean,
			default: false,
		},
	},
};
</script>

<style></style>

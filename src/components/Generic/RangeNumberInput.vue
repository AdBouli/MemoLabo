<template>
    <div class="input-group input-group-sm mt-2">
        <span class="input-group-text">{{ label }}</span>
        <input type="range" class="form-control" :id="rangeInputId"
            :min="min" :max="max" :step="step"
            :value="modelValue" @input="handleInput" />
        <input type="number" class="form-control" :id="numberInputId"
            :min="min" :max="max" :step="step"
            :value="modelValue" @input="handleInput" />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
    label: {
        type: String,
        required: true,
    },
    modelValue: {
        type: Number,
        required: true,
    },
    min: {
        type: Number,
        default: 0,
    },
    max: {
        type: Number,
        default: 100,
    },
    step: {
        type: Number,
        default: 1,
    },
    id: {
        type: String,
        default: () => `input-${Math.random().toString(36).substring(2, 9)}`,
    },
    feedbackText: {
        type: String,
        default: undefined
    }
});

const emit = defineEmits<{
    'update:modelValue': [value: number];
}>();

const rangeInputId = computed(() => `${props.id}-range`);
const numberInputId = computed(() => `${props.id}-number`);

const handleInput = (event: Event) => {
    emit('update:modelValue', (event.target as HTMLInputElement).valueAsNumber);
};

</script>

<template>
    <div class="input-group input-group-sm">
        <span class="input-group-text">{{ label }}</span>
        <input type="range" class="form-control" style="cursor: pointer;"
            :min="min" :max="max" :step="step"
            :value="modelValue" @input="handleInput"
            @wheel.prevent="handleWheel"/>
        <input type="number" class="form-control"
            :min="min" :max="max" :step="step"
            :value="modelValue" @input="handleInput" />
    </div>
</template>

<script setup lang="ts">

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
    feedbackText: {
        type: String,
        default: undefined
    }
})

const emit = defineEmits<{
    'update:modelValue': [value: number]
}>()

const handleInput = (event: Event) => {
    emit('update:modelValue', (event.target as HTMLInputElement).valueAsNumber)
}

const handleWheel = (event: any) => {
    if (event.deltaY > 0) {
        (event.target as HTMLInputElement).valueAsNumber -= parseFloat(event.target.step)*5
    } else {
        (event.target as HTMLInputElement).valueAsNumber += parseFloat(event.target.step)*5
    }
    handleInput(event)
}

</script>

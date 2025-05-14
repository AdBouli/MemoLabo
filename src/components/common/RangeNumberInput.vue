<template>
    <div class="input-group" :class="{'input-group-sm': size == 'sm', 'input-group-lg': size == 'lg'}"
        v-bs:tooltip="{ title: label }">
        <span class="input-group-text">
            <i v-if="icon" :class="icon"></i>
            <span v-else>{{ label }}</span>
        </span>
        <input type="range" class="form-control w-auto" style="cursor: pointer;"
            :min="min" :max="max" :step="step"
            :value="modelValue" @input="handleInput"
            @wheel.prevent="handleWheel"/>
        <input type="number" class="form-control w-25"
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
    icon: {
        type: Array<String>,
        required: false,
        default: null
    },
    modelValue: {
        type: Number,
        required: true,
    },
    min: {
        type: Number,
        required: true,
        default: 0,
    },
    max: {
        type: Number,
        required: true,
        default: 100,
    },
    step: {
        type: Number,
        required: true,
        default: 1,
    },
    size: {
        type: String,
        required: false,
        default: '',
        validator: (size) => size == '' || size == 'lg' || size == 'sm'
    }
})

const emit = defineEmits<{
    'update:modelValue': [value: number]
}>()

const handleInput = (event: Event) => {
    emit('update:modelValue', (event.target as HTMLInputElement).valueAsNumber)
}

const WHEEL_SPEED_FACTOR = 5

const handleWheel = (event: WheelEvent) => {
    const input = event.target as HTMLInputElement
    const step = parseFloat(input.step) * WHEEL_SPEED_FACTOR
    if (event.deltaY > 0) {
        input.valueAsNumber -= step
    } else {
        input.valueAsNumber += step
    }
    handleInput(event)
}

</script>

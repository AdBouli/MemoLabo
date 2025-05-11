<template>
    <div class="input-group input-group-sm"
        v-bs:tooltip="{ title: label }">
        <span class="input-group-text">
            <i :class="icon"></i>
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
        required: true
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

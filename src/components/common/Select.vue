<template>
    <div class="input-group input-group-sm"
        v-bs:tooltip="{title: label}">
        <span class="input-group-text">
            <i :class="icon"></i>
        </span>
        <select class="form-select form-select-sm"
            @change="handleChange" @wheel.prevent="handleWheel">
            <option v-for="(value, name) in options"
            :key="name" :value="value" :selected="value == modelValue">
                {{ name }}
            </option>
        </select>
    </div>
</template>

<script setup lang="ts">
import { string } from 'mathjs';
import { type PropType } from 'vue';

type ModelValueType = any

const props = defineProps({
    label: {
        type: String,
        required: true,
    },
    icon: {
        type: Array as PropType<string[]>,
        required: true
    },
    modelValue: {
        type: [String, Number, Boolean] as PropType<ModelValueType>,
        required: true
    },
    options: {
        type: Object as PropType<Record<string, ModelValueType>>,
        required: true
    }
})

const emit = defineEmits<{
    'update:modelValue': [value: any]
}>()

const handleChange = (event: Event) => {
    emit('update:modelValue', (event.target as HTMLInputElement).value)
}

const handleWheel = (event: WheelEvent) => {
    const select = event.target as HTMLSelectElement
    const nbOptions = select.options.length
    if (event.deltaY > 0) { 
        if (select.selectedIndex + 1 < nbOptions) ++select.selectedIndex
    } else {
        if (select.selectedIndex > 0) --select.selectedIndex
    }
    handleChange(event)
}

</script>
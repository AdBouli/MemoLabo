<template>
    <div class="input-group mb-2">
        <!-- Id span -->
        <span class="input-group-text border border-primary rounded-start ps-2 pe-1"
            :style="{backgroundColor: bgColor }">
            <strong><em>f(x)</em></strong>
        </span>
        <!-- Input expression -->
        <input type="text" class="form-control border border-primary w-50" :class="{ 'is-invalid': func.error }"
            v-model="func.expression" @keyup="func.compile()" />
        <!-- Input couleur -->
        <button class="btn btn-outline-primary text-reset"
            @click="openColorPicker"  :style="{backgroundColor: bgColor }">
            <i class="bi bi-palette-fill"></i>
            <input type="color" style="opacity: 0; position: absolute; pointer-events: none; width: 0; height: 0;"
                ref="colorPicker" v-model="func.color">
        </button>
        <!-- Bouton suppression -->
        <button class="btn btn-outline-primary text-reset"
            @click="$emit('delete', func)"  :style="{backgroundColor: bgColor }">
            <i class="bi bi-trash-fill"></i>
        </button>
    </div>
</template>

<script setup lang="ts">

import { onMounted, ref, watch } from 'vue'
import { MathFunc } from '@/components/modules/FunkyMath/Models/MathFunc'

const colorPicker = ref<HTMLInputElement | null>(null)
const bgColor = ref<string>("")

const func = defineModel({
    type: Object as () => MathFunc,
    default: () => MathFunc.create()
})

const openColorPicker = () => {
    if (colorPicker.value) {
        colorPicker.value.click()
    }
}

const emit = defineEmits(['delete'])

const ALPHA_TRANSPARENCE = '80'

const updateBgColor = () => {
    bgColor.value = `${func.value.color}${ALPHA_TRANSPARENCE}`
}

onMounted(() => {
    updateBgColor()
})

watch(() => func, () => {
    updateBgColor()
}, { deep: true })

</script>
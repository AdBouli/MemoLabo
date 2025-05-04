<template>
<div class="row mb-1">
    <div class="col">
        <div class="input-group">
            <!-- Id span -->
            <span class="input-group-text text-primary border border-primary rounded-start ps-2 pe-1">
                <strong><em>f(x)</em></strong>
            </span>
            <!-- Input expression -->
            <input type="text" class="form-control border border-primary w-50"
                v-model="func.expression" @keyup="func.compile()" />
            <!-- Input couleur -->
            <button class="btn btn-outline-primary" @click="openColorPicker">
                <i class="bi bi-palette-fill" :style="{ color: func.color }"></i>
                <input type="color" style="opacity: 0; position: absolute; pointer-events: none; width: 0; height: 0;"
                    ref="colorPicker" v-model="func.color">
            </button>
            <!-- Bouton suppression -->
            <button class="btn btn-outline-primary" @click="$emit('delete', func)">
                <i class="bi bi-trash-fill"></i>
            </button>
        </div>
    </div>
</div>

</template>

<script setup lang="ts">

import { onMounted, ref } from 'vue'
import { MathFunc } from './MathFunc'

const colorPicker = ref<HTMLInputElement | null>(null)

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

</script>
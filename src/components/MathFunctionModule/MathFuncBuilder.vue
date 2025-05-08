<template>
    <div class="input-group mb-2">
        <!-- Id span -->
        <span class="input-group-text text-dark border border-primary rounded-start ps-2 pe-1"
            :style="{backgroundColor: `${func.color}80` }">
            <strong><em>f(x)</em></strong>
        </span>
        <!-- Input expression -->
        <input type="text" class="form-control border border-primary w-50" :class="{ 'is-invalid': func.error }"
            v-model="func.expression" @keyup="func.compile()" />
        <!-- Input couleur -->
        <button class="btn btn-outline-primary text-dark"
            @click="openColorPicker"  :style="{backgroundColor: `${func.color}80` }">
            <i class="bi bi-palette-fill"></i>
            <input type="color" style="opacity: 0; position: absolute; pointer-events: none; width: 0; height: 0;"
                ref="colorPicker" v-model="func.color">
        </button>
        <!-- Bouton suppression -->
        <button class="btn btn-outline-primary text-dark"
            @click="$emit('delete', func)"  :style="{backgroundColor: `${func.color}80` }">
            <i class="bi bi-trash-fill"></i>
        </button>
    </div>
</template>

<script setup lang="ts">

import { ref } from 'vue'
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
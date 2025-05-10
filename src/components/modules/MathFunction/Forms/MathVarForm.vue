<template>
        <div class="input-group mb-2">
        <!-- Id span -->
        <span class="input-group-text border border-primary rounded-start">
            <strong><em>{{ var_.name }}</em></strong>
        </span>
        <!-- Bouton + -->
        <button class="btn btn-outline-primary"  @click="decrement">
            <i class="bi bi-dash"></i>
        </button>
        <!-- Input valeur -->
        <input type="number" class="form-control border border-primary w-50"
            v-model="var_.value" />
        <!-- Bouton - -->
        <button class="btn btn-outline-primary"  @click="increment">
            <i class="bi bi-plus"></i>
        </button>
    </div>
</template>

<script setup lang="ts">

import { MathVar } from '@/components/modules/MathFunction/Models/MathVar'

const var_ = defineModel({
    type: Object as () => MathVar,
    default: () => null
})

const increment = () => {
    ++var_.value.value
}

const decrement = () => {
    --var_.value.value
}

</script>
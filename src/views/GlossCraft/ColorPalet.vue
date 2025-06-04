<template>
    <div class="row mt-3 rounded shadow p-2">
        <div class="col-2 p-1 text-center " v-for="(color, index) in palet" :key="index" @click="handleClick(color)">
            <div class="rounded p-3" :style="{ backgroundColor: color.hex, cursor: 'pointer' }">
                <span class="bg-light text-dark px-1 fw-bold">
                    {{  color.hex  }}
                </span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

import { Color } from '@/models/GlossCraft/Color';

const props = defineProps({
    palet: {
        type: Array<Color>,
        required: true
    }
})

const emit = defineEmits<{
    'update:color': [value: Color]
}>()

const handleClick = (color: Color) => {
    emit('update:color',  color)
}

</script>
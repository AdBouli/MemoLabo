<template>
    <div class="row px-2">
        <div class="col-2 p-1 text-center " v-for="(color, index) in palet.colors" :key="index" @click="handleClick(color)">
            <div class="rounded p-3" :style="{ backgroundColor: color.value, color: ColorUtils.betterContrast(color).value, cursor: 'pointer' }">
                <span class="px-1 fw-bold">
                    {{ color.value  }}
                </span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

import { Color } from '@/models/GlossCraft/Color';
import { ColorPalet } from '@/models/GlossCraft/ColorPalet';
import { ColorUtils } from '@/models/GlossCraft/ColorUtils';
import { HexColor } from '@/models/GlossCraft/HexColor';

const props = defineProps({
    palet: {
        type: ColorPalet,
        required: true
    }
})

const emit = defineEmits<{
    'update': [value: HexColor]
}>()

const handleClick = (color: HexColor) => {
    emit('update',  color)
}

</script>

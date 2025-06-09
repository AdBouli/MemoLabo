<template>
    <!-- Couleurs HTML les plus proches -->
    <div class="mt-3" style="font-size: 0.8rem;">
        <p>
            Couleur HTML la plus proche :
            <span class="p-1" :style="{ backgroundColor: closestStdColor?.color.hex.value, color: betterClosestStdColorContrast?.value }">
                {{ closestStdColor?.color.name }} : {{ closestStdColor?.color.hex }}
            </span>
            ({{ Math.round((closestStdColor?.accurate ?? 0) * 100) }}%)
            plus précisément :
            <span class="p-1" :style="{ backgroundColor: closestColor?.color.hex.value, color: betterClosestColorContrast?.value }">
                {{ closestColor?.color.name }} : {{ closestColor?.color.hex }}
            </span>
            ({{ Math.round((closestColor?.accurate ?? 0) * 100) }}%)
        </p>
    </div>
</template>

<script setup lang="ts">

import { Color } from '@/models/GlossCraft/Color';
import { ColorUtils, type ClosestColorType } from '@/models/GlossCraft/ColorUtils';
import { HexColor } from '@/models/GlossCraft/HexColor';
import { onMounted, ref, watch } from 'vue';

const closestStdColor = ref<ClosestColorType>()
const closestColor = ref<ClosestColorType>()
const betterClosestStdColorContrast = ref<HexColor>()
const betterClosestColorContrast = ref<HexColor>()

const props = defineProps({
    color: {
        type: Color,
        required: true
    }
})

const computeClosestsAndContrast = () => {
    closestStdColor.value = ColorUtils.closest(props.color, ColorUtils.standardHtmlColors)
    closestColor.value = ColorUtils.closest(props.color, ColorUtils.allHtmlColors)
    betterClosestStdColorContrast.value = ColorUtils.betterContrast(closestStdColor.value.color.hex)
    betterClosestColorContrast.value = ColorUtils.betterContrast(closestColor.value.color.hex)
}

onMounted(() => {
    computeClosestsAndContrast()
})

// Au changement de la couleur
watch(() => props.color, () => {
    computeClosestsAndContrast()
}, { deep: true })

</script>
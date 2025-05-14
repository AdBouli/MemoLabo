<template>
    <div>
        <div class="card card-body mt-1 border border-primary">
            <!-- Grille -->
            <div class="form-check">
                <input type="checkbox" class="form-check-input" id="showGridInput" style="cursor: pointer;"
                    :checked="grid" @change="handleInput({ grid: ($event.target as HTMLInputElement).checked })" />
                <label for="showGridInput" class="form-check-label" style="cursor: pointer;">Afficher la grille</label>
            </div>
            <!-- Scale X -->
            <RangeNumberInput class="mt-2"
                :label="'Échelle X'" :id="'scaleX'"
                :icon="['bi', 'bi-arrows']" :size="'sm'"
                :min="10" :max="500" :step="1" 
                :model-value="scaleX" @update:model-value="handleInput({ scaleX: $event })"
                />
            <!-- Scale Y -->
            <RangeNumberInput class="mt-2"
                :label="'Échelle Y'" :id="'scaleY'"
                :icon="['bi', 'bi-arrows-vertical']" :size="'sm'"
                :min="10" :max="500" :step="1" 
                :model-value="scaleY" @update:model-value="handleInput({ scaleY: $event })"
                />
            <div class="row mt-2">
                <!-- Résolution -->
                <div class="col-6">
                    <Select :label="'Résolution'" :id="'resolution'"
                        :icon="['bi', 'bi-stars']" :size="'sm'"
                        :options="resolutions" :model-value="height"
                        @update:model-value="handleInput({ height: $event })"/>
                </div>
                <!-- Ratio d'affichage -->
                <div class="col-6">
                    <Select :label="'Ratio d\'affichage'" :id="'displayRatio'"
                        :icon="['bi', 'bi-aspect-ratio-fill']" :size="'sm'"
                        :options="ratios" :model-value="displayRatio"
                        @update:model-value="handleInput({ displayRatio: $event })"/>
                </div>
            </div>
            <!-- Précision -->
            <RangeNumberInput class="mt-2"
                :label="'Précision'" :id="'precision'"
                :icon="['bi', 'bi-rulers']" :size="'sm'"
                :min="0.1" :max="50" :step="0.1" 
                :model-value="precision" @update:model-value="handleInput({ precision: $event })"
                />
        </div>
    </div>
</template>

<script setup lang="ts">

import { onMounted, ref } from 'vue'
import RangeNumberInput from '@/components/common/RangeNumberInput.vue'
import Select from '@/components/common/Select.vue'

const props = defineProps({
    grid: {
        type: Boolean,
        default: false,
    },
    scaleX: {
        type: Number,
        default: 100,
    },
    scaleY: {
        type: Number,
        default: 100,
    },
    height: {
        type: Number,
        default: 720
    },
    displayRatio: {
        type: Number,
        default: 16/10
    },
    precision: {
        type: Number,
        default: 1,
    }
})

interface Scaling {
    grid?: boolean
    scaleX?: number
    scaleY?: number
    height?: number
    displayRatio?: number
    precision?: number
}

const resolutions = ref({
    '144p': 144,
     '240p': 240,
     '360p': 360,
     '480p': 480,
     '720p': 720,
     '1080p': 1080,
     '1440p': 1440,
     '2160p': 2160
})

const ratios = ref({
    '1:1': 1/1,
    '4:3': 4/3,
    '16:10': 16/10,
    '16:9': 16/9
})

onMounted(() => {
    console.log(typeof ratios.value)
})

const emit = defineEmits<{'update:scaling': [value: Scaling]}>()

const handleInput = (value: Scaling) => {
    emit('update:scaling', value)
}

</script>
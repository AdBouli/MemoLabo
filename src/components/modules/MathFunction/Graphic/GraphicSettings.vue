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
                :label="'Échelle X :'" :id="'scaleX'"
                :min="10" :max="500" :step="1" 
                :model-value="scaleX" @update:model-value="handleInput({ scaleX: $event })"
                />
            <!-- Scale Y -->
            <RangeNumberInput class="mt-2"
                :label="'Échelle Y :'" :id="'scaleY'"
                :min="10" :max="500" :step="1" 
                :model-value="scaleY" @update:model-value="handleInput({ scaleY: $event })"
                />
            <div class="row mt-2">
                <div class="col-6">
                    <select class="form-select form-select-sm"
                        @change="handleInput({ height: parseInt(($event.target as HTMLSelectElement).value) })">
                        <option v-for="(resolution, index) in resolutions" :key="index" :value="resolution" :selected="resolution == height">
                            {{ resolution }}p
                        </option>
                    </select>
                </div>
                <div class="col-6">
                    <select class="form-select form-select-sm"
                        @change="handleInput({ ratio: parseFloat(($event.target as HTMLSelectElement).value) })">
                        <option v-for="(ratio, name) in ratios" :key="name" :value="ratio" :selected="ratio == props.ratio">
                            {{ name }}
                        </option>
                    </select>
                </div>
            </div>
            <!-- Précision -->
            <RangeNumberInput class="mt-2"
                :label="'Précision :'" :id="'precision'"
                :min="0.1" :max="50" :step="0.1" 
                :model-value="precision" @update:model-value="handleInput({ precision: $event })"
                />
        </div>
    </div>
</template>

<script setup lang="ts">

import { ref } from 'vue'
import RangeNumberInput from '@/components/common/RangeNumberInput.vue'

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
    ratio: {
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
    ratio?: number
    precision?: number
}

const resolutions = ref([144, 240, 360, 480, 720, 1080, 1440, 2160])

const ratios = ref({
    '1:1': 1/1,
    '4:3': 4/3,
    '16:10': 16/10,
    '16:9': 16/9
})

const emit = defineEmits<{'update:scaling': [value: Scaling]}>()

const handleInput = (value: Scaling) => {
    emit('update:scaling', value)
}

</script>
<template>
    <div class="p-3 shadow rounded">
        <!-- Formulaire pour la couleur -->
        <div class="row align-items-end">
            <div class="col-2">
                <input type="color" class="form-control form-control-lg form-control-color w-100"
                    :value="colorModel.hex" @input="handleInput" />
            </div>
            <div class="col-10">
                <label for="color_hexa_input">Code couleur hexadécimal (6 caractères) :</label>
                <div class="input-group input-group">
                    <input type="text" class="form-control" id="color_hexa_input" :value="colorModel.hex" @change="handleInput">
                    <button trpe="button" class="btn btn btn-primary px-4"
                        @click="randomColor()">
                        <i class="bi bi-shuffle"></i>
                    </button>
                </div>
            </div>
        </div>
        <!-- Détails sur la couleur CSS la plus proche-->
        <div class="row mt-3">
            <div class="col">
                <p>
                    Couleur HTML standard la plus proche:
                    <span class="p-1" :style="{ backgroundColor: closestStdColor?.hex }">
                        {{ closestStdColor?.name }} : {{ closestStdColor?.hex }}
                    </span>
                    ({{ Math.round((closestStdColor?.accurate ?? 0) * 100) }}%)
                </p>
                <p>
                    Couleur HTML prédéfinie la plus proche:
                    <span class="p-1" :style="{ backgroundColor: closestColor?.hex }">
                        {{ closestColor?.name }} : {{ closestColor?.hex }}
                    </span>
                    ({{ Math.round((closestColor?.accurate ?? 0) * 100) }}%)
                </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Color, HtmlColorListEnum, type ClosestColorType } from '@/models/GlossCraft/Color';
import { ref, watch } from 'vue';

const closestStdColor = ref<ClosestColorType>()
const closestColor = ref<ClosestColorType>()

const props = defineProps({
    colorModel: {
        type: Color,
        required: true
    }
})

const emits = defineEmits<{
    update: [value: string]
    random: []
}>()

const handleInput = (event: Event) => {
    emits('update', (event.target as HTMLInputElement).value)
}

const randomColor = () => {
    emits('random')
}

// Au changement de la couleur
watch(() => props.colorModel, () => {
    closestStdColor.value = props.colorModel.closest(HtmlColorListEnum.STANDARD)
    closestColor.value = props.colorModel.closest(HtmlColorListEnum.ALL)
}, { deep: true })

</script>
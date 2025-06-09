<template>
    <!-- Titre -->
    <div class="row mt-2">
        <div class="col">
            <h2>Gloss craft</h2>
        </div>
    </div>

    <!-- Contenu -->
    <div class="row mt-2">
        <div class="col-8">

            <div class="Section">
                <!-- Formulaire de sélection de couleur -->
                <ColorGenForm :color="(color as Color)"
                    @update="updateFromHexColor($event)"
                    @random="randomColor()"/>

                <!-- Information sur la couleur HTML la plus proche -->
                <ClosestColor :color="(color as Color)" />

            </div>

            <!-- Palettes de couleurs -->
            <div class="mt-4 vstack gap-3">
                <div class="Section" v-for="(palet, index) in palets" :key="index">
                    <ColorPaletForm :palet="(palet as ColorPalet)" @update="updateColor($event)" />
                </div>
            </div>

        </div>

        <!-- Modèles de couleurs -->
        <div class="col-4">
            <div class="vstack gap-3">
                <ColorModelForm v-for="(model, index) in color.models" :key="index"
                    :color-model="model" @update="updateFromColorModel(model)" />
            </div>            
        </div>
    </div>

</template>

<script setup lang="ts">

import { onMounted, ref } from 'vue';
import type { IColorModel } from '@/models/GlossCraft/ColorModels/Base';
import { Color } from '@/models/GlossCraft/Color';
import { HexColor } from '@/models/GlossCraft/HexColor';
import { ColorUtils } from '@/models/GlossCraft/ColorUtils';
import { ColorPalet } from '@/models/GlossCraft/ColorPalet';
import ColorGenForm from '@/views/GlossCraft/Forms/ColorGenForm.vue';
import ClosestColor from '@/views/GlossCraft/ClosestColor.vue';
import ColorModelForm from '@/views/GlossCraft/Forms/ColorModelForm.vue';
import ColorPaletForm from '@/views/GlossCraft/Forms/ColorPaletForm.vue';

const color = ref<Color>(new Color(new HexColor('#230595')))
const palets = ref<ColorPalet[]>([])

const randomColor = () => {
    color.value = ColorUtils.random()
}

const updateColor = (hexColor: HexColor) => {
    color.value = new Color(hexColor)
}

const updateFromHexColor = (hex: HexColor) => {
    color.value = new Color(hex)
}

const updateFromColorModel = (colorModel: IColorModel) => {
    console.log(colorModel)
    color.value = new Color(colorModel.toRGB())
}

onMounted(() => {
    randomColor()
    palets.value = [
        ColorPalet.generateComplementaryPalet(color.value as Color, 5)
    ]
})

</script>


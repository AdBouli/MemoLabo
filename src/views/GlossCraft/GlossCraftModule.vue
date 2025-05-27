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
            <!-- Formulaire de sélection de couleur -->
             <ColorGenForm :color-hex="color.hex"
                @update="updateFromHex($event)"
                @random="randomColor()"/>
        </div>
        <!-- Modèles de couleurs -->
        <div class="col-4">
            <div class="vstack gap-1">
                <ColorModelForm id="color_rgb_form"
                    :color-model="color.rgb" @update:color-model="updateFromColorModel(color.rgb)" />
                <ColorModelForm id="color_hsl_form"
                    :color-model="color.hsl" @update:color-model="updateFromColorModel(color.hsl)" />
                <ColorModelForm id="color_cielab_form"
                    :color-model="color.cielab" @update:color-model="updateFromColorModel(color.cielab)" />
                <ColorModelForm id="color_ymck_form"
                    :color-model="color.ymck" @update:color-model="updateFromColorModel(color.ymck)" />
                <ColorModelForm id="color_hsv_form"
                    :color-model="color.hsv" @update:color-model="updateFromColorModel(color.hsv)" />
            </div>            
        </div>
    </div>

</template>

<script setup lang="ts">

import { onMounted, ref } from 'vue';
import { type IColorModel } from '@/models/GlossCraft/ColorModels/BaseColorModel';
import { Color } from '@/models/GlossCraft/Color';
import ColorGenForm from '@/views/GlossCraft/Forms/ColorGenForm.vue';
import ColorModelForm from '@/views/GlossCraft/Forms/ColorModelForm.vue';

const color = ref<Color>(new Color('#230595'))

const randomColor = () => {
    color.value = Color.random()
}

const updateFromHex = (hex: string) => {
    color.value = new Color(hex)
}

const updateFromColorModel = (colorModel: IColorModel) => {
    color.value = new Color(colorModel.toRGB())
}


onMounted(() => {
    randomColor()
})

</script>


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
            <div class="row align-items-end">
                <div class="col-2">
                    <input type="color" class="form-control form-control-lg form-control-color w-100"
                        v-model="color.hex" @input="updateFromHexa" />
                </div>
                <div class="col-10">
                    <label for="color_hexa_input">Code couleur hexadécimal (3 ou 6 caractères) :</label>
                    <div class="input-group input-group">
                        <input type="text" class="form-control" id="color_hexa_input" v-model="color.hex" @change="updateFromHexa">
                        <button trpe="button" class="btn btn btn-primary px-4"
                            @click="randomColor()">
                            <i class="bi bi-shuffle"></i>
                        </button>
                    </div>
                </div>
            </div>
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
import ColorModelForm from '@/views/GlossCraft/Forms/ColorModelForm.vue';

const color = ref<Color>(new Color('#230595'))

const randomColor = () => {
    color.value = new Color({
        red: Math.round(Math.random() * 255),
        green: Math.round(Math.random() * 255),
        blue: Math.round(Math.random() * 255)
    })
}

const updateFromHexa = () => {
    color.value = new Color(color.value.hex)
}

const updateFromColorModel = (colorModel: IColorModel) => {
    color.value = new Color(colorModel.toRGB())
}


onMounted(() => {
    randomColor()
})

</script>


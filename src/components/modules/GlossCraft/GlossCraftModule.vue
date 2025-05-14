<template>
    <!-- Titre -->
    <div class="row mt-2">
        <div class="col">
            <h2>Gloss craft</h2>
        </div>
    </div>
    <!-- Contenu -->
    <div class="row mt-2">
        <div class="col-6">
            <div class="input-group input-group">
                <div class="form-floating">
                    <input type="text" class="form-control" id="color_hexa_input" v-model="color.hexa" @change="updateFromHexa">
                    <label for="color_hexa_input">Code couleur hexadécimal (3 ou 6 caractères) :</label>
                </div>
            </div>
        </div>
        <div class="col-6" :style="{ backgroundColor: color.hexa }"></div>
    </div>
    <div class="row mt-2">
        <div class="col-3">
            <h4>RGB</h4>
            <RangeNumberInput class="mt-2"
                :label="'R'" :id="'color_rgb_red_input'"
                :min="0" :max="255" :step="1" 
                :model-value="color.rgb.red" @update:model-value="color.rgb.red = $event; updateFromRGB()"/>
            <RangeNumberInput class="mt-2"
                :label="'V'" :id="'color_rgb_green_input'"
                :min="0" :max="255" :step="1" 
                :model-value="color.rgb.green" @update:model-value="color.rgb.green = $event; updateFromRGB()"/>
            <RangeNumberInput class="mt-2"
                :label="'B'" :id="'color_rgb_blue_input'"
                :min="0" :max="255" :step="1" 
                :model-value="color.rgb.blue" @update:model-value="color.rgb.blue = $event; updateFromRGB()"/>
        </div>
        <div class="col-3">
            <h4>HSL</h4>
            <RangeNumberInput class="mt-2"
                :label="'H'" :id="'color_hsl_hue_input'"
                :min="0" :max="360" :step="1" 
                :model-value="color.hsl.hue" @update:model-value="color.hsl.hue = $event; updateFromHSL()"/>
            <RangeNumberInput class="mt-2"
                :label="'S'" :id="'color_hsl_saturation_input'"
                :min="0" :max="100" :step="1" 
                :model-value="color.hsl.saturation" @update:model-value="color.hsl.saturation = $event; updateFromHSL()"/>
            <RangeNumberInput class="mt-2"
                :label="'L'" :id="'color_hsl_lightness_input'"
                :min="0" :max="100" :step="1" 
                :model-value="color.hsl.lightness" @update:model-value="color.hsl.lightness = $event; updateFromHSL()"/>
        </div>
        <div class="col-3">
            <h4>HSV</h4>
            <RangeNumberInput class="mt-2"
                :label="'H'" :id="'color_hsv_hue_input'"
                :min="0" :max="360" :step="1" 
                :model-value="color.hsv.hue" @update:model-value="color.hsv.hue = $event; updateFromHSV()"/>
            <RangeNumberInput class="mt-2"
                :label="'S'" :id="'color_hsv_saturation_input'"
                :min="0" :max="100" :step="1" 
                :model-value="color.hsv.saturation" @update:model-value="color.hsv.saturation = $event; updateFromHSV()"/>
            <RangeNumberInput class="mt-2"
                :label="'V'" :id="'color_hsv_value_input'"
                :min="0" :max="100" :step="1" 
                :model-value="color.hsv.value" @update:model-value="color.hsv.value = $event; updateFromHSV()"/>
        </div>
        <div class="col-3">
            <h4>L*a*b*</h4>
            <RangeNumberInput class="mt-2"
                :label="'L'" :id="'color_lab_lightness_input'"
                :min="0" :max="255" :step="1" 
                :model-value="color.lab.lightness" @update:model-value="color.lab.lightness = $event; updateFromLab()"/>
            <RangeNumberInput class="mt-2"
                :label="'a'" :id="'color_lab_a_input'"
                :min="0" :max="255" :step="1" 
                :model-value="color.lab.a_" @update:model-value="color.lab.a_ = $event; updateFromLab()"/>
            <RangeNumberInput class="mt-2"
                :label="'b'" :id="'color_lab_b_input'"
                :min="0" :max="255" :step="1" 
                :model-value="color.lab.b_" @update:model-value="color.lab.b_ = $event; updateFromLab()"/>
        </div>
    </div>

</template>

<script setup lang="ts">

import { onMounted, ref } from 'vue';
import { Color } from '@/components/modules/GlossCraft/Models/Color';
import RangeNumberInput from '@/components/common/RangeNumberInput.vue';

const color = ref<Color>(new Color({
    hexa: '#230595'
}))

const updateFromHexa = () => {
    color.value = new Color({ 
        hexa: color.value.hexa
    })
}

const updateFromRGB = () => {
    color.value.hexa = color.value.rgb.toHexa()
    color.value.hsl = color.value.rgb.toHSL()
    color.value.hsv = color.value.rgb.toHSV()
    color.value.lab = color.value.rgb.toLab()
}

const updateFromHSL = () => {
    color.value.rgb = color.value.hsl.toRGB()
    color.value.hexa = color.value.rgb.toHexa()
    color.value.hsv = color.value.rgb.toHSV()
    color.value.lab = color.value.rgb.toLab()
}

const updateFromHSV = () => {
    color.value.rgb = color.value.hsv.toRGB()
    color.value.hexa = color.value.rgb.toHexa()
    color.value.hsl = color.value.rgb.toHSL()
    color.value.lab = color.value.rgb.toLab()
}

const updateFromLab = () => {
    color.value.rgb = color.value.lab.toRGB()
    color.value.hexa = color.value.rgb.toHexa()
    color.value.hsl = color.value.rgb.toHSL()
    color.value.hsv = color.value.rgb.toHSV()
}

</script>


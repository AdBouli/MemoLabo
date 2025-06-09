<template>
    <div class="input-group">

        <span class="input-group-text">
            Couleur :
        </span>

        <!-- Bouton aléatoire -->
        <button type="button" class="btn btn-primary px-4" @click="randomColor()">
            Aléatoire <i class="bi bi-shuffle"></i>
        </button>

        <!-- Selection couleur HTML prédéfinie -->
        <select class="form-select" @input="handleSelect">
            <option :value="noColor" selected>Personnalisée</option>
            <optgroup label="Standards">
                <option v-for="(namedColor, index) in ColorUtils.standardHtmlColors" :key="index" :value="namedColor.hex.value"
                    :style="{ backgroundColor: namedColor.hex.value, color: ColorUtils.betterContrast(namedColor.hex).value }">
                    {{ namedColor.name }}
                </option>
            </optgroup>
            <optgroup label="Toutes">
                <option v-for="(namedColor, index) in ColorUtils.allHtmlColors" :key="index" :value="namedColor.hex.value"
                    :style="{ backgroundColor: namedColor.hex.value, color: ColorUtils.betterContrast(namedColor.hex).value }"
                    :selected="namedColor.hex.value == color.hex.value">
                    {{ namedColor.name }}
                </option>
            </optgroup>
        </select>

        <!-- Entrée code couleur hexadécimal -->
        <input type="text" class="form-control" id="color_hexa_input" :value="color.hex"
            placeholder="Code hexadécimal 6 caractères" @change="handleInput">

        <!-- Color input -->
        <input type="color" class="form-control form-control-color"
            :value="color.hex.value" @input="handleInput" />
    </div>
</template>

<script setup lang="ts">
import { Color } from '@/models/GlossCraft/Color';
import { ColorUtils } from '@/models/GlossCraft/ColorUtils';
import { HexColor } from '@/models/GlossCraft/HexColor';
import { ref } from 'vue';

const noColor = ref('#nocolor')

const props = defineProps({
    color: {
        type: Color,
        required: true
    }
})

const emits = defineEmits<{
    update: [value: HexColor]
    random: []
}>()

const handleInput = (event: Event) => {
    const input = event.target as HTMLInputElement
    let hex = new HexColor(input.value)
    input.value = hex.value
    emits('update', hex)
}

const handleSelect = (event: Event) => {
    const input = event.target as HTMLInputElement
    if (input.value !== noColor.value) emits('update', new HexColor(input.value))
}

const randomColor = () => {
    emits('random')
}


</script>
<template>
    
    <div class="row align-items-end">
        <div class="col-2">
            <input type="color" class="form-control form-control-lg form-control-color w-100"
                :value="colorHex" @input="handleInput" />
        </div>
        <div class="col-10">
            <label for="color_hexa_input">Code couleur hexadécimal (3 ou 6 caractères) :</label>
            <div class="input-group input-group">
                <input type="text" class="form-control" id="color_hexa_input" :value="colorHex" @change="handleInput">
                <button trpe="button" class="btn btn btn-primary px-4"
                    @click="randomColor()">
                    <i class="bi bi-shuffle"></i>
                </button>
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
import { string } from 'mathjs';


const props = defineProps({
    colorHex: {
        type: String,
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


</script>
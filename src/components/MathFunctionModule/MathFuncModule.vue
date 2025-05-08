<template>
    <!-- Title -->
    <div class="row mt-2">
        <div class="col">
            <h2>Fonctions mathématiques</h2>
        </div>
    </div>
    <!-- Content -->
    <div class="row mt-2">
        <!-- Fonctions -->
        <div class="col-4 text-end">
            <div v-for="(fx, index) in functions" :key="index">
                <FuncBuilder v-model="functions[index]" @delete="(f) => functions.splice(functions.indexOf(f), 1)" />
            </div>
            <!-- Bouton d'ajout -->
            <button class="btn btn-primary mt-2" @click="functions.push(MathFunc.create())"> 
                <i class="bi bi-plus-circle"></i>
                Ajouter une fonction
            </button>
        </div>
        <!-- Graphique -->
        <div class="col-8">
            <Graphic :functions="functions"/>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted } from 'vue'
    import FuncBuilder from './MathFuncBuilder.vue'
    import Graphic from './Graphic/Graphic.vue'
    import { MathFunc } from './MathFunc'

    // Initialise les réferences
    const functions = ref<MathFunc[]>([MathFunc.create('x^2')]);

    // Au montage du module
    onMounted(() => {
        functions.value.push(MathFunc.create('x^3'))
        functions.value.push(MathFunc.create('1.5x'))
        functions.value.push(MathFunc.create('-2x+0.3'))
    });

</script>
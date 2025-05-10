<template>
    <!-- Titre -->
    <div class="row mt-2">
        <div class="col">
            <h2>Fonctions mathématiques</h2>
        </div>
    </div>
    <!-- Contenu -->
    <div class="row mt-2">
        <div class="col-4 ">
            <!-- Fonctions -->
            <div class="row">
                <div class="col">
                    <div v-for="(func, index) in functions" :key="index">
                        <MathFuncBuilder v-model="functions[index]" @delete="(f) => functions.splice(functions.indexOf(f), 1)" />
                    </div>
                </div>
            </div>
            <!-- Bouton d'ajout -->
            <div class="row">
                <div class="col text-end">
                    <button type="button" class="btn btn-primary" 
                        @click="functions.push(MathFunc.create())"> 
                        <i class="bi bi-plus-circle"></i>
                        Ajouter une fonction
                    </button>
                </div>
            </div>
            <hr>
            <!-- Variables -->
            <div class="row">
                <div class="col">
                     <div v-for="(variable, index) in variables" :key="index">
                        <MathVarBuilder v-model="variables[index]"/>
                     </div>
                </div>
            </div>
        </div>
        <!-- Graphique -->
        <div class="col-8">
            <!-- <Graphic :functions="functions" :variables="variables"/> -->
            <Graphic :functions="functions" :grid="showGrid"/>
        </div>
    </div>
</template>

<script setup lang="ts">

import { ref, onMounted, watch } from 'vue'
import MathFuncBuilder from '@/components/modules/MathFunction/Forms/MathFuncForm.vue'
import MathVarBuilder from '@/components/modules/MathFunction/Forms/MathVarForm.vue'
import Graphic from '@/components/modules/MathFunction/Graphic/Graphic.vue'
import { MathFunc } from '@/components/modules/MathFunction/Models/MathFunc'
import { MathVar } from '@/components/modules/MathFunction/Models/MathVar'

// Initialise les réferences
const functions = ref<MathFunc[]>([MathFunc.create('x^2')])
const variables = ref<{[key: string]: MathVar}>({})
const showGrid = ref(true)

// Au montage du module
onMounted(() => {
    functions.value.push(MathFunc.create('x^3'))
    functions.value.push(MathFunc.create('1.5x'))
    functions.value.push(MathFunc.create('-2x+0.3'))
})

watch(functions, (newFunctions) => {
    newFunctions.forEach((func) => {
        func.getVariables().forEach((var_) => {
            if (variables.value[var_] === undefined) {
                variables.value[var_] = new MathVar(var_, 0)
                // todo supprimer la variable si elle n'est plus utilisée
                //  Object.keys(variables.value).forEach((key) => {
                //     if (!newFunctions.some(func => func.getVariables().includes(key))) {
                //         delete variables.value[key]
                //     }
                // })
            }
        })
    })
}, { deep: true })

</script>
<template>
    <div class="row mt-2">
        <div class="col">
            <h2>Fonctions mathématiques</h2>
        </div>
    </div>
    <div class="row mt-2">
        <div class="col-4">
            <div class="row mb-3">
                <div class="col-10">
                    <input type="text" class="form-control"
                        placeholder="Expression à dessiner" v-model="expression"
                        @focusout="evaluateExpression"/>
                </div>
                <div class="col-2">
                    <button class="btn btn-primary w-100" @click="evaluateExpression">
                        <i class="bi bi-arrow-clockwise"></i>
                    </button>
                </div>
            </div>
        </div>
        <div class="col-8">
            <Graphic :func="evalFunc"/>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted } from 'vue'
    import { all, create, type EvalFunction } from 'mathjs'
    import Graphic from './Graphic.vue'

    // Initialise les réferences
    const expression = ref('x^2')
    const evalFunc = ref<EvalFunction>()
    const math = create(all)

    // Evalue l'expression
    const evaluateExpression = () => {
        evalFunc.value = math.compile(expression.value)
    }

    // Au montage du module
    onMounted(() => {
        evaluateExpression()
    });

</script>
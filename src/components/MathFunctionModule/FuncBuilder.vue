<template>
<div class="row mb-1">
    <div class="col">
        <div class="input-group">
            <!-- Id span -->
            <span class="input-group-text text-primary border border-primary rounded-start ps-2 pe-1">
                <strong><em>f(x)</em></strong>
            </span>
            <!-- Input expression -->
            <input type="text" class="form-control border border-primary"
                v-model="func.expression" @keyup="func.compile()" />
            <!-- Input couleur -->
            <input type="hidden" v-model="func.color" />
            <!-- Bouton couleur -->
            <button class="btn btn-outline-primary"
                data-bs-toggle="modal" data-bs-target="#exampleModal">
                <i class="bi bi-palette-fill" :style="{ color: func.color }"></i>
            </button>
            <!-- Modal couleur -->
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            ...
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Bouton suppression -->
            <button class="btn btn-outline-primary" @click="$emit('delete', func)">
                <i class="bi bi-trash-fill"></i>
            </button>
        </div>
    </div>
</div>

</template>

<script setup lang="ts">

import { MathFunc } from './MathFunc'

const func = defineModel({
    type: Object as () => MathFunc,
    default: () => MathFunc.create()
})

const emit = defineEmits(['delete'])

</script>
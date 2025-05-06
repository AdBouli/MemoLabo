<template>
    <Navbar />
    <div class="container">
        <div class="row">
            <div class="col">
                <MathFunction />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import Navbar from './components/Navbar.vue'
    import MathFunction from './components/MathFunctionModule/MathFunction.vue'
</script>
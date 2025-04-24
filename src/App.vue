<template>
    <Navbar />
    <div class="container">
        <div class="row">
            <div class="col">
                <FuncDrawer />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import Navbar from './components/Navbar.vue'
    import FuncDrawer from './components/MathFunctionModule/FuncDrawer.vue'
</script>
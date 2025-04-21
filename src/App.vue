<template>
    <Navbar />
    <div class="container">
        <div class="row">
            <div class="col">
                <DrawFunc />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import Navbar from './components/Navbar.vue';
    import DrawFunc from './components/DrawFunc.vue';
</script>
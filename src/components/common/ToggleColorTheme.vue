<template>
    <div class="form-check form-switch">
        <input type="checkbox" class="form-check-input" id="lightDarkSwitch"
            :checked="isDarkMode" @change="toggleDarkMode" />
        <label class="form-check-label" for="lightDarkSwitch" id="lightDarkLabel">
            <i v-if="isDarkMode" class="bi bi-moon-stars-fill"></i>
            <i v-else class="bi bi-sun-fill"></i>
        </label>
    </div>
</template>

<script setup lang="ts">

import { ref, onMounted, watch } from 'vue';

const isDarkMode = ref(false);
const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

onMounted(() => {
    // Vérifier la préférence système au montage
    if (localStorage.getItem('theme') === 'dark' || (localStorage.getItem('theme') === null && prefersDarkMode)) {
        enableDarkMode();
    } else {
        enableLightMode();
    }
});

watch(isDarkMode, (newVal) => {
    if (newVal) {
        enableDarkMode();
        localStorage.setItem('theme', 'dark');
    } else {
        enableLightMode();
        localStorage.setItem('theme', 'light');
    }
});

const enableDarkMode = () => {
    document.documentElement.setAttribute('data-bs-theme', 'dark');
    isDarkMode.value = true;
};

const enableLightMode = () => {
    document.documentElement.setAttribute('data-bs-theme', 'light');
    isDarkMode.value = false;
};

const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value;
};

</script>

<style scoped>
    #lightDarkLabel, #lightDarkSwitch {
        cursor: pointer;
    }
</style>
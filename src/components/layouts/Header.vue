<template>
    <header class="navbar navbar-expand-lg bg-body-secondary">
        <nav class="container-fluid">
            <RouterLink to="/" class="navbar-brand">{{ $appName }}</RouterLink>
            <button class="navbar-toggler" type="button"
                data-bs-toggle="collapse" data-bs-target="#nav-menu">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="nav-menu">
                <ul class="navbar-nav">
                    <RouterLink :to="{ name: 'home' }" class="nav-link" active-class="active">
                        Accueil
                    </RouterLink>
                    <RouterLink :to="{ name: 'mathfunc' }" class="nav-link" active-class="active">
                        Funcky maths
                    </RouterLink>
                    <RouterLink :to="{ name: 'second' }" class="nav-link" active-class="active">
                        Menu 2
                    </RouterLink>
                    <RouterLink to="/" class="nav-link disabled">
                        Menu 3
                    </RouterLink>
                    <RouterLink to="/" class="nav-link disabled">
                        Menu 4
                    </RouterLink>
                    <div class="form-check form-switch d-lg-none" >
                        <input type="checkbox" class="form-check-input" id="lightDarkSwitch"
                            :checked="isDarkMode" @change="toggleDarkMode"/>
                        <label class="form-check-label" for="lightDarkSwitch" id="lightDarkLabel">
                            <i v-if="isDarkMode" class="bi bi-moon-stars-fill"></i>
                            <i v-else class="bi bi-sun-fill"></i>
                        </label>
                    </div>
                </ul>
            </div>
            <div class="form-check form-switch d-none d-lg-block">
                <input type="checkbox" class="form-check-input" id="lightDarkSwitch"
                    :checked="isDarkMode" @change="toggleDarkMode" />
                <label class="form-check-label" for="lightDarkSwitch" id="lightDarkLabel">
                    <i v-if="isDarkMode" class="bi bi-moon-stars-fill"></i>
                    <i v-else class="bi bi-sun-fill"></i>
                </label>
            </div>
        </nav>
    </header>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { RouterLink } from 'vue-router';

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
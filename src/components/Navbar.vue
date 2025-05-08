<template>
    <header class="navbar navbar-expand-lg bg-body-secondary">
        <nav class="container">
            <div class="navbar-nav">
                <a class="navbar-brand" href="#">{{ $appName }}</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav-menu">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="nav-menu">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link active" href="#">Menu 1</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Menu 2</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Menu3</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Menu 4</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="form-check form-switch" >
                <input
                    class="form-check-input"
                    type="checkbox"
                    id="lightDarkSwitch"
                    :checked="isDarkMode"
                    @change="toggleDarkMode"
                />
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
<template>
    <header class="navbar navbar-expand-lg bg-primary bg-opacity-25">
        <nav class="container-fluid">
            <!-- Bouton d'accueil -->
            <RouterLink to="/" class="navbar-brand">
                <img src="/Snoopy_Peanuts.png" alt="Logo" height="48px">
                {{ $appName }}
            </RouterLink>
            <button class="navbar-toggler" type="button"
                data-bs-toggle="collapse" data-bs-target="#nav-menu">
                <span class="navbar-toggler-icon"></span>
            </button>
            <!-- Menu -->
            <div class="collapse navbar-collapse" id="nav-menu">
                <ul class="navbar-nav">
                    <RouterLink :to="{ name: 'home' }" class="nav-link" active-class="active">
                        Accueil
                    </RouterLink>
                    <RouterLink :to="{ name: 'mathfunc' }" class="nav-link" active-class="active">
                        Funcky maths
                    </RouterLink>
                    <RouterLink :to="{ name: 'glosscraft' }" class="nav-link" active-class="active">
                        Gloss craft
                    </RouterLink>
                    <RouterLink to="/" class="nav-link disabled">
                        Menu 3
                    </RouterLink>
                    <RouterLink to="/" class="nav-link disabled">
                        Menu 4
                    </RouterLink>
                    <!-- Bascule de thèmes clair/sombre [responsive : petit]-->
                    <ToggleColorTheme class="d-lg-none" />
                </ul>
            </div>
            <!-- Bascule de thèmes clair/sombre [responsive : large] -->
            <ToggleColorTheme class="d-none d-lg-block" />
        </nav>
    </header>
</template>

<script setup lang="ts">

import { RouterLink } from 'vue-router'
import ToggleColorTheme from '../common/ToggleColorTheme.vue'

</script>
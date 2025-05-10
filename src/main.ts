// Project: Memo Labo
// File: main.ts
// Description: Fichier principal de l'application Vue.js

// Importation des styles et des dépendances
import '@/assets/bootstrap-custom.scss'
import 'bootstrap-icons/font/bootstrap-icons.css'

// Importation de Vue et de l'application principale
import { createApp } from 'vue'
import App from '@/App.vue'
import { setGlobalProperties } from '@/start/GlobalProperties'
import vBootstrap from '@/directives/Bootstrap'
import { router } from '@/router'

// Création de l'application 
const app = createApp(App)

// Propriétées globales 
setGlobalProperties(app)

// Directives 
app.directive('bs', vBootstrap)

// Routage
app.use(router)

// Lancement de l'application dans <div id="app">
app.mount('#app')

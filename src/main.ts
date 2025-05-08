// Project: Memo Labo
// File: main.ts
// Description: Fichier principal de l'application Vue.js

// Importation des styles et des dépendances
import './assets/bootstrap-custom.scss'
import 'bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.css'

// Importation de Vue et de l'application principale
import { createApp } from 'vue'
import App from './App.vue'
import vBootstrap from './directives/Bootstrap'
import { setGlobalProperties } from './start/GlobalProperties'

// Création de l'application 
const app = createApp(App)

// Propriétées globales 
setGlobalProperties(app)

// Directives 
app.directive('bs', vBootstrap)

// Lancement de l'application dans <div id="app">
app.mount('#app')

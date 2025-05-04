import './assets/bootstrap-custom.scss'
import 'bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.css'

import { createApp, withDirectives } from 'vue'
import App from './App.vue'
import vBootstrap from './directives/Bootstrap'

const app = createApp(App)

app.directive('bs', vBootstrap)

app.mount('#app')

import './assets/bootstrap-custom.scss'
import 'bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.css'

import { createApp, withDirectives } from 'vue'
import App from './App.vue'
import vTooltip from './directives/Tooltip'

const app = createApp(App)

app.directive('tooltip', vTooltip)

app.mount('#app')

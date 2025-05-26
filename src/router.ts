import { createWebHistory, createRouter } from "vue-router"

import HomeModule from "@/views/Home/HomeModule.vue"
import MathFuncModule from "@/views/FunkyMath/FunkyMathModule.vue"
import GlossCraft from "@/views/GlossCraft/GlossCraftModule.vue"
import Error404 from "@/views/Error/Error404.vue"

const routes = [
    { path: '/', component: HomeModule, name: 'home' },
    { path: '/FunkyMath', component: MathFuncModule, name: 'funkymath' },
    { path: '/GlossCraft', component: GlossCraft, name: 'glosscraft' },
    { path: '/:pathMatch(.*)*', component: Error404, name: 'error404' }
]

export const router =  createRouter({
    history: createWebHistory(),
    routes
})

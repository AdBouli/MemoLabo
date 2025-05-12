import { createWebHistory, createRouter } from "vue-router"

import HomeModule from "@/components/modules/Home/HomeModule.vue"
import MathFuncModule from "@/components/modules/MathFunction/MathFuncModule.vue"
import GlossCraft from "@/components/modules/GlossCraft/GlossCraftModule.vue"
import Error404 from "./components/modules/Error/Error404.vue"

const routes = [
    { path: '/', component: HomeModule, name: 'home' },
    { path: '/FunckyMath', component: MathFuncModule, name: 'mathfunc' },
    { path: '/GlossCraft', component: GlossCraft, name: 'glosscraft' },
    { path: '/:pathMatch(.*)*', component: Error404, name: 'error404' }
]

export const router =  createRouter({
    history: createWebHistory(),
    routes
})

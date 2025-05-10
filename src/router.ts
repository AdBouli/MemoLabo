import { createWebHistory, createRouter } from "vue-router";

import HomeModule from "@/components/modules/Home/HomeModule.vue";
import MathFuncModule from "@/components/modules/MathFunction/MathFuncModule.vue";
import SecondModule from "@/components/modules/SecondModule/SecondModule.vue";
import Error404 from "./components/modules/Error/Error404.vue";

const routes = [
    { path: '/', component: HomeModule, name: 'home' },
    { path: '/FunckyMath', component: MathFuncModule, name: 'mathfunc' },
    { path: '/Second', component: SecondModule, name: 'second' },
    { path: '/:pathMatch(.*)*', component: Error404, name: 'error404' }
]

export const router =  createRouter({
    history: createWebHistory(),
    routes
})

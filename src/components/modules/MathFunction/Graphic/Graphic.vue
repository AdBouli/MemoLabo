<template>
    <div class="row">
        <div class="col position-relative p-0">
            <!-- Graphique -->
            <canvas 
                class="border border-primary rounded w-100 h-100" style="cursor: grab;"
                ref="graphic"
                @wheel.prevent="doZoom"
                @mousedown="startTransition"
                @mousemove="doTransition"
                @mouseup="endTransition"
                @mouseleave="endTransition">
            </canvas>
            <!-- Boutons des paramètres -->
            <div class="position-absolute top-0 start-0 mt-2 ms-2">
                <button type="button" class="btn btn-outline-primary"
                    v-bs:tooltip="{title: 'Paramètres', placement: 'right'}"
                    data-bs-toggle="collapse" data-bs-target="#graphicSettingsCollapse">
                    <i class="bi bi-sliders"></i>
                </button>
                <GraphicSettings :id="'graphicSettingsCollapse'"
                    :grid="grid" :scaleX="scaleX" :scaleY="scaleY" :height="height" :precision="precision"
                    @update:scaling="setGraphic($event)" />
            </div>
            <!-- Bouton de recentrage -->
            <div class="position-absolute top-0 end-0 mt-2 me-2">
                <button type="button" class="btn btn-outline-primary"
                    v-bs:tooltip="{title: 'Recentrer le graphique', placement: 'left'}"
                    @click="centerGraph">
                    <i class="bi bi-crosshair"></i>
                </button>
            </div>
            <!-- Bouton de réinitialisation -->
            <div class="position-absolute bottom-0 end-0 mb-2 me-2">
                <button type="button" class="btn btn-outline-primary"
                    v-bs:tooltip="{title: 'Réinitialiser le graphique', placement: 'right'}"
                    @click="resetGraph">
                    <i class="bi bi-arrow-clockwise"></i> 
                </button>
            </div>
        </div>
    </div>
    <!-- Informations  -->
    <div class="row text-muted" style="font-size: 0.8rem;">
        <div class="col-6">
            <p>Graphique généré en {{ timeToDraw }}  ms.</p>
        </div>
        <div class="col-6 text-end">
            <p>Nombre d'opérations : {{ nbOperations }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">

import { ref, onMounted, watch } from 'vue'
import { MathFunc } from '@/components/modules/MathFunction/Models/MathFunc'
import { MathVar } from '@/components/modules/MathFunction/Models/MathVar'
import GraphicSettings from '@/components/modules/MathFunction/Graphic/GraphicSettings.vue'

// Propriétés
const props = defineProps({
    functions: {
        type: Array as () => MathFunc[],
        default: () => []
    },
    variables: {
        type: Array as () => MathVar[],
        default: () => []
    }
})

// Valeurs par défaut
const DEFAULT_RATIO = 16 / 10
const DEFAULT_HEIGHT = 720
const DEFAULT_WIDTH = DEFAULT_HEIGHT * DEFAULT_RATIO
const DEFAULT_SCALE = 100
const DEFAULT_PRECISION = 1
const DEFAULT_ZOOM_FACTOR = 2

// Couleurs
const AXIS_COLOR = '#CCF'
const TEXT_COLOR = '#BBE'
const FUNC_COLOR = '#F00'

// Initialise les réferences
const graphic = ref<HTMLCanvasElement | null>(null)
const ratio = ref<number>(DEFAULT_RATIO)
const width = ref<number>(DEFAULT_WIDTH)
const height = ref<number>(DEFAULT_HEIGHT)
const scaleX = ref<number>(DEFAULT_SCALE)
const scaleY = ref<number>(DEFAULT_SCALE)
const widthRatio = ref<number>(1)
const originX = ref<number>(DEFAULT_WIDTH / 2)
const originY = ref<number>(DEFAULT_HEIGHT / 2)
const precision = ref<number>(DEFAULT_PRECISION)
const zoomFactor = ref<number>(DEFAULT_ZOOM_FACTOR)
const isTransitioning = ref<boolean>(false)
const transitionStartX = ref<number>(0)
const transitionStartY = ref<number>(0)
const grid = ref<boolean>(true)
    
const timeToDraw = ref(0)
const nbOperations = ref(0)


// Paramètre le graphique
const setGraphic = (options: {
    ratio?: number
    height?: number
    scaleX?: number
    scaleY?: number
    precision?: number
    grid?: boolean
}) => {
    if (graphic.value) {
        // ratio
        if (options.ratio !== undefined) {
            ratio.value = options.ratio
            options.height = options.height ?? height.value // pour recalculer les dimensions juste après
        }
        // height
        if (options.height !== undefined) {
            // Sauvegarde la taille actuelle
            const oldWidth = width.value
            const oldHeight = height.value
            // Taille du graphique
            height.value = options.height
            width.value = height.value * ratio.value
            widthRatio.value = (graphic.value.parentNode as HTMLElement)?.offsetWidth / width.value
            // Redimensionne le canvas
            graphic.value.width = width.value
            graphic.value.height = height.value
            // Repositionne au même endroit
            originX.value = originX.value * width.value / oldWidth
            originY.value = originY.value * height.value / oldHeight
        }
        // scaleX
        if (options.scaleX !== undefined) {
            scaleX.value = options.scaleX
        }
        // scaleY
        if (options.scaleY !== undefined) {
            scaleY.value = options.scaleY
        }
        // precision
        if (options.precision !== undefined) {
            precision.value = options.precision
        }
        // grid
        if (options.grid !== undefined) {
            grid.value = options.grid
        }
        // Dessine le graphique
        drawGraph()
    }
}

// Dessine les axes x et y et le quadrillage dans le canvas
const drawAxis = (ctx: CanvasRenderingContext2D) => {
    const toStrWith2digitsMax = (value: number):string => {
        return String(Math.round(value + Number.EPSILON))
    }
    ctx.strokeStyle = AXIS_COLOR
    ctx.fillStyle = TEXT_COLOR
    ctx.font = '12px Arial'
    // Axe X
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(0, originY.value)
    ctx.lineTo(width.value, originY.value)
    ctx.stroke()
    // Axe Y
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(originX.value, 0)
    ctx.lineTo(originX.value, height.value)
    ctx.stroke()
    if (grid.value) {
        // X positif
        for (let i = originX.value; i < width.value; i += scaleX.value) {
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(i, 0)
            ctx.lineTo(i, height.value)
            ctx.stroke()
            ctx.fillText(
                toStrWith2digitsMax((i - originX.value)/scaleX.value),
                i+5,
                originY.value + 15
            )
        }
        // X négatif
        for (let i = originX.value; i > 0; i -= scaleX.value) {
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(i, 0)
            ctx.lineTo(i, height.value)
            ctx.stroke()
            const graduation = toStrWith2digitsMax((i - originX.value)/scaleX.value)
            ctx.fillText(
                graduation,
                i-5*(graduation.length+1), // pour ne pas écrire sur l'axe
                originY.value + 15
            )
        }
        // Y négatif (inversé)
        for (let i = originY.value; i < height.value; i += scaleY.value) {
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(0, i)
            ctx.lineTo(width.value, i)
            ctx.stroke()
            ctx.fillText(
                toStrWith2digitsMax(-(i - originY.value)/scaleY.value),
                originX.value + 5,
                i+15
            )
        }
        // Y positif (inversé)
        for (let i = originY.value; i > 0; i -= scaleY.value) {
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(0, i)
            ctx.lineTo(width.value, i)
            ctx.stroke()
            ctx.fillText(
                toStrWith2digitsMax(-(i - originY.value)/scaleY.value),
                originX.value + 5,
                i-5
            )
        }
        // ctx.stroke()
    }
}

// Dessine la courbe de la fonction dans le canvas
const drawFunctions = (ctx: CanvasRenderingContext2D) => {
    ctx.lineWidth = 3
    props.functions.forEach((func: any) => {
        if (func.error) return
        ctx.strokeStyle = func.color ?? FUNC_COLOR
        ctx.beginPath()
        for (let x = -originX.value; x < width.value - originX.value; x+=precision.value) {
            const y = func.evaluate({x: (x / scaleX.value)}) * scaleY.value
            ++nbOperations.value
            const canvasX = x + originX.value
            const canvasY = originY.value - y // Soustraire y car l'axe Y du canvas est inversé
            if (x === -originX.value) {
                ctx.moveTo(canvasX, canvasY)
            } else {
                ctx.lineTo(canvasX, canvasY)
            }
        }
        ctx.stroke();
    })
};

// Efface le canvas puis dessine les axes et la courbe
const drawGraph = () => {
    if (graphic.value) {
        const startTime = new Date()
        nbOperations.value = 0
        const context = graphic.value.getContext('2d')
        if (context) {
            // Efface le canvas
            context.clearRect(0, 0, width.value, height.value)
            // Dessine les axes et le quadrillage
            drawAxis(context)
            // Dessine la ou les courbes
            drawFunctions(context)
        }
        timeToDraw.value = new Date().getTime() - startTime.getTime()
    }
}

// Zoom ou dezoom sur le graphique
const doZoom = (event: any) => {
    if (event.deltaY > 0) {
        scaleX.value /= zoomFactor.value
        scaleY.value /= zoomFactor.value
    } else {
        scaleX.value *= zoomFactor.value
        scaleY.value *= zoomFactor.value
    }
    drawGraph();
};

// Commence la transition du graphique
const startTransition = (event: any) => {
    isTransitioning.value = true
    transitionStartX.value = event.clientX
    transitionStartY.value = event.clientY
    if (graphic.value) {
        graphic.value.style.cursor = 'grabbing'
    }
};

// Effectue la transition du graphique
const doTransition = (event: any) => {
    // Si la souris est enfoncée, on déplace le graphique
    if (isTransitioning.value) {
        originX.value += (event.clientX - transitionStartX.value) / widthRatio.value
        originY.value += (event.clientY - transitionStartY.value) / widthRatio.value
        transitionStartX.value = event.clientX
        transitionStartY.value = event.clientY
        drawGraph()
    }
};

// Termine la transition du graphique
const endTransition = (event: any) => {
    isTransitioning.value = false
    if (graphic.value) {
        graphic.value.style.cursor = 'grab'
    }
};

// Centre le graphique
const centerGraph = () => {
    originX.value = width.value / 2
    originY.value = height.value / 2
    drawGraph()
}

// Reinitialise le graphique
const resetGraph = () => {
    setGraphic({
        height: DEFAULT_HEIGHT,
        scaleX: DEFAULT_SCALE,
        scaleY: DEFAULT_SCALE,
        precision: DEFAULT_PRECISION
    })
    scaleX.value = DEFAULT_SCALE
    scaleY.value = DEFAULT_SCALE
    precision.value = DEFAULT_PRECISION
    centerGraph()
    drawGraph()
}


// Au montage du module
onMounted(() => {
    resetGraph()
});

// Au changement des fonctions
watch(() => props.functions, () => {
    drawGraph()
}, { deep: true });

// Au changement des variables
watch(() => props.variables, () => {
    drawGraph()
}, { deep: true });

</script>

<template>
    <div class="row">
        <div class="col position-relative p-0">
            <!-- Graphique -->
            <canvas 
                class="border border-primary rounded w-100 h-100"
                ref="graph"
                style="cursor: grab;"
                @wheel="doZoom"
                @mousedown="startTransition"
                @mousemove="doTransition"
                @mouseup="endTransition"
                @mouseleave="endTransition"
            >
            </canvas>
            <!-- Bouton reset -->
            <button type="button" class="btn btn-outline-primary position-absolute top-0 end-0 mt-2 me-2"
                v-bs:tooltip="{title: 'Réinitialiser le graphique', placement: 'left'}" @click="resetGraph">
                <i class="bi bi-crosshair"></i>
            </button>
            <!-- Bouton de sélection de la résolution -->
            <div class="dropup position-absolute bottom-0 end-0 mb-2 me-2"
                v-bs:tooltip="{title: 'Changer la résolution', placement: 'left'}">
                <button type="button" class="btn btn-outline-primary"
                    data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="bi bi-stars"></i>
                </button>
                <ul class="dropdown-menu">
                    <li v-for="(resolution, index) in resolutions" :key="index">
                        <button class="dropdown-item" @click="changeResolution" :value="index">
                            {{resolution}}p<i class="bi bi-check" v-if="resolution == height"></i>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <!-- Informations  -->
    <div class="row">
        <div class="col">
            <p class="text-muted fs-6">Graphique généré en {{ timeToDraw }}  ms.</p>
        </div>
    </div>
    <div class="row">
        <div class="col-4">
            <p class="text-muted fs-6">width : {{ width }}</p>
        </div>
        <div class="col-4">
            <p class="text-muted fs-6">x scale : {{ scaleX }}</p>
        </div>
        <div class="col-4">
            <p class="text-muted fs-6">x origin : {{ originX }}</p>
        </div>
    </div>
    <div class="row">
        <div class="col-4">
            <p class="text-muted fs-6">height : {{ height }}</p>
        </div>
        <div class="col-4">
            <p class="text-muted fs-6">y scale : {{ scaleY }}</p>
        </div>
        <div class="col-4">
            <p class="text-muted fs-6">y origin : {{ originY }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">

    import { ref, onMounted, watch, watchEffect } from 'vue'
    import { debounce } from 'lodash'
    import { MathFunc } from './MathFunc'

    // Propriétés
    const props = defineProps({
        functions: {
            type: Array as () => MathFunc[],
            default: () => []
        }
    })
    
    // Valeurs par défaut
    const DEFAULT_HEIGHT = 480
    const DEFAULT_WIDTH = DEFAULT_HEIGHT * (16/10)
    const DEFAULT_SCALE = 100
    const DEFAULT_PRECISION = 10
    const DEFAULT_ZOOM_FACTOR = 2

    // Couleurs
    const AXIS_COLOR = '#CCC'
    const TEXT_COLOR = '#BBD'
    const FUNC_COLOR = '#5B4'
    
    // Initialise les réferences
    const graph = ref<HTMLCanvasElement | null>(null)
    const width = ref(DEFAULT_WIDTH)
    const height = ref(DEFAULT_HEIGHT)
    const scaleX = ref(DEFAULT_SCALE)
    const scaleY = ref(DEFAULT_SCALE)
    const widthRatio = ref(1)
    const originX = ref(DEFAULT_WIDTH / 2)
    const originY = ref(DEFAULT_HEIGHT / 2)
    const precision = ref(DEFAULT_PRECISION)
    const zoomFactor = ref(DEFAULT_ZOOM_FACTOR)
    const isTransitioning = ref(false)
    const transitionStartX = ref(0)
    const transitionStartY = ref(0)

    const resolutions = ref([144, 240, 360, 480, 720, 1080])

    const startTime = ref<Date|null>(null)
    const timeToDraw = ref(0)

    const resetTime = () => {
        startTime.value = new Date()
    }

    const time = (label: string) => {
        if (startTime.value) {
            console.log(label, new Date().getTime() - startTime.value.getTime(), 'ms')
        }
    }

    // Initialise les valeurs du canvas
    const initCanvas = () => {
        time('start initCanvas')
        if (graph.value) {
            const parentWidth = (graph.value.parentNode as HTMLElement)?.offsetWidth
            widthRatio.value = parentWidth / width.value
            graph.value.width = width.value
            graph.value.height = height.value
            originX.value = width.value / 2
            originY.value = height.value / 2
            scaleX.value = DEFAULT_SCALE
            scaleY.value = DEFAULT_SCALE
            transitionStartX.value = 0
            transitionStartY.value = 0
        }
        time('end initCanvas')
    }

    // Dessine les axes x et y dans le canvas
    const drawAxis = (ctx: CanvasRenderingContext2D) => {
        const toStrWith2digitsMax = (value: number):string => {
            return String(Math.round((value + Number.EPSILON) * 100) / 100)
        }
        time('start drawAxis')
        ctx.strokeStyle = AXIS_COLOR
        ctx.lineWidth = 2
        ctx.fillStyle = TEXT_COLOR
        ctx.font = '10px Arial'
        ctx.beginPath()
        // Axe X
        ctx.moveTo(0, originY.value)
        ctx.lineTo(width.value, originY.value)
        for (let i = originX.value; i < width.value; i += scaleX.value) {
            ctx.fillText(
                toStrWith2digitsMax(i - originX.value),
                i,
                originY.value + 10
            )
        }
        for (let i = originX.value; i > 0; i -= scaleX.value) {
            ctx.fillText(
                toStrWith2digitsMax(i - originX.value),
                i,
                originY.value + 10
            )
        }
        // Axe Y
        ctx.moveTo(originX.value, 0)
        ctx.lineTo(originX.value, height.value)
        for (let i = originY.value; i < height.value; i += scaleY.value) {
            ctx.fillText(
                toStrWith2digitsMax(-(i - originY.value)),
                originX.value + 10,
                i
            )
        }
        for (let i = originY.value; i > 0; i -= scaleY.value) {
            ctx.fillText(
                toStrWith2digitsMax(-(i - originY.value)),
                originX.value + 10,
                i
            )
        }
        ctx.stroke()
        time('end drawAxis')
    }

    // Dessine la courbe de la fonction dans le canvas
    const drawFunctions = (ctx: CanvasRenderingContext2D) => {
        time('start drawFunctions')
        ctx.lineWidth = 3
        props.functions?.forEach((func: any) => {
            ctx.strokeStyle = func.color ?? FUNC_COLOR
            ctx.beginPath()
            for (let x = -originX.value; x < width.value - originX.value; x+=precision.value) {
                const y = func.evaluate({x: (x / scaleX.value)}) * scaleY.value
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
        time('end drawFunctions')
    };

    // Efface le canvas puis dessine les axes et la courbe
    const drawGraph = debounce(function () {
        time('start drawGraph')
        if (graph.value) {
            const t = new Date()
            const context = graph.value.getContext('2d')
            if (context) {
                context.clearRect(0, 0, width.value, height.value)
                drawAxis(context)
                drawFunctions(context)
            }
            timeToDraw.value = new Date().getTime() - t.getTime()
        }
        time('end drawGraph')
    }, 10);

    // Zoom ou dezoom sur le graphique
    const doZoom = (event: any) => {
        event.preventDefault()
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
        if (graph.value) {
            graph.value.style.cursor = 'grabbing'
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
        if (graph.value) {
            graph.value.style.cursor = 'grab'
        }
    };
    
    // Reinitialise le graphique
    const resetGraph = () => {
        resetTime()
        initCanvas()
        drawGraph()
    }

    const changeResolution =  (event: any) => {
        height.value = resolutions.value[event.target.value]
        width.value = height.value * (16/10)
        resetGraph()
    }

    // Au montage du module
    onMounted(() => {
        width.value = DEFAULT_WIDTH
        height.value = DEFAULT_HEIGHT
        resetGraph()
    });

    // Au changement des fonctions
    watch(() => props.functions, (newVal, oldVal) => {
        console.log('WATCHHH')
        resetGraph()
    }, { deep: true });

</script>
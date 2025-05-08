<template>
    <div class="row">
        <div class="col position-relative p-0">
            <!-- Graphique -->
            <canvas 
                class="border border-primary rounded w-100 h-100"
                ref="graphic"
                style="cursor: grab;"
                @wheel.prevent="doZoom"
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
            <GraphicResolution :actual-resolution="height" @change-resolution="changeResolution"/>
            <!-- Boutons de changement d'échelle -->
            <div class="dropup position-absolute top-0 start-0 mt-2 ms-2">
                <button type="button" class="btn btn-outline-primary"
                    data-bs-toggle="collapse" data-bs-target="#scalingSettings">
                    <i class="bi bi-rulers" />
                </button>
                <div class="collapse" id="scalingSettings">
                    <div class="card card-body mt-2 border border-primary">
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Informations  -->
    <div class="row text-muted" style="font-size: 0.8rem;">
        <div class="col-6">
            <p>Nombre d'opérations : {{ nbOperations }}</p>
        </div>
        <div class="col-6 text-end">
            <p>Graphique généré en {{ timeToDraw }}  ms.</p>
        </div>
    </div>
    <div class="row text-muted text-center" style="font-size: 0.8rem;">
        <div class="col-4">
            <p>width : {{ $fmtNum(width) }} ; height: {{ $fmtNum(height) }}</p>
        </div>
        <div class="col-4">
            <p>scale : x: {{ $fmtNum(scaleX) }} ; y: {{ $fmtNum(scaleY) }}</p>
        </div>
        <div class="col-4">
            <p>origin : x: {{ $fmtNum(originX) }} ; y: {{ $fmtNum(originY) }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">

    import { ref, onMounted, watch } from 'vue'
    import { MathFunc } from '../MathFunc'
    import GraphicResolution from './GraphicResolution.vue'

    // Propriétés
    const props = defineProps({
        functions: {
            type: Array as () => MathFunc[],
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
    
    
    const nbOperations = ref(0)
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
        if (graphic.value) {
            const parentWidth = (graphic.value.parentNode as HTMLElement)?.offsetWidth
            widthRatio.value = parentWidth / width.value
            graphic.value.width = width.value
            graphic.value.height = height.value
            originX.value = width.value / 2
            originY.value = height.value / 2
            scaleX.value = DEFAULT_SCALE
            scaleY.value = DEFAULT_SCALE
            transitionStartX.value = 0
            transitionStartY.value = 0
        }
        time('end initCanvas')
    }

    // Dessine les axes x et y et le quadrillage dans le canvas
    const drawAxis = (ctx: CanvasRenderingContext2D) => {
        const toStrWith2digitsMax = (value: number):string => {
            return String(Math.round(value + Number.EPSILON))
        }
        time('start drawAxis')
        ctx.strokeStyle = AXIS_COLOR
        ctx.fillStyle = TEXT_COLOR
        ctx.font = '12px Arial'
        // Axe X
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(0, originY.value)
        ctx.lineTo(width.value, originY.value)
        ctx.stroke()
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
            ctx.fillText(
                toStrWith2digitsMax((i - originX.value)/scaleX.value),
                i+5,
                originY.value + 15
            )
        }
        // Axe Y
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(originX.value, 0)
        ctx.lineTo(originX.value, height.value)
        ctx.stroke()
        // Y négatif (inversé)
        for (let i = originY.value; i < height.value; i += scaleY.value) {
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(0, i)
            ctx.lineTo(width.value, i)
            ctx.stroke()
            ctx.fillText(
                toStrWith2digitsMax(-(i - originY.value)/scaleY.value),
                originX.value + 15,
                i+5
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
                originX.value + 15,
                i+5
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
            console.log(func.getVariables())
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
        time('end drawFunctions')
    };

    // Efface le canvas puis dessine les axes et la courbe
    const drawGraph = () => {
        time('start drawGraph')
        if (graphic.value) {
            const t = new Date()
            nbOperations.value = 0
            const context = graphic.value.getContext('2d')
            if (context) {
                context.clearRect(0, 0, width.value, height.value)
                drawAxis(context)
                drawFunctions(context)
            }
            timeToDraw.value = new Date().getTime() - t.getTime()
        }
        time('end drawGraph')
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
    
    // Reinitialise le graphique
    const resetGraph = () => {
        resetTime()
        initCanvas()
        drawGraph()
    }

    const changeResolution =  (resolution: number) => {
        height.value = resolution
        width.value = height.value * DEFAULT_RATIO
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
        resetGraph()
    }, { deep: true });

</script>
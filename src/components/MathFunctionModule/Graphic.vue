<template>
    <div class="row">
        <div class="col position-relative p-0">
            <canvas 
                class="border border-primary rounded w-100 h-100"
                ref="canvas"
                style="cursor: grab;"
                @wheel="toZoom"
                @mousedown="startTransition"
                @mousemove="doTransition"
                @mouseup="endTransition"
                @mouseleave="endTransition"
            >
            </canvas>
            <button type="button" class="btn btn-outline-primary position-absolute top-0 end-0 mt-2 me-2"
                v-tooltip:left="'Recentrer le graphique'" @click="resetCanvas">
                <i class="bi bi-crosshair"></i>
            </button>
            <button type="button" class="btn btn-outline-primary position-absolute bottom-0 end-0 tra mb-2 me-2"
                v-tooltip:left="'Affiche le panneau de débugage'" @click="resetCanvas"
                data-bs-toggle="collapse" data-bs-target="#debugPanel"
                aria-expanded="false" aria-controls="debugPanel">
                <i class="bi bi-bug"></i>
            </button>
        </div>
    </div>
    <div class="row mt-3">
        <div class="col">
            <div class="collapse mt-2" id="debugPanel">
                <div class="card card-body">
                    <div class="row">
                        <div class="col-lg-3 col-4"><span>width : {{ width }}<br/></span></div>
                        <div class="col-lg-3 col-4"><span>height : {{ height }}<br/></span></div>
                        <div class="col-lg-3 col-4"><span>scale : {{ scale }}<br/></span></div>
                        <div class="col-lg-3 col-4"><span>originX : {{ originX }}<br/></span></div>
                        <div class="col-lg-3 col-4"><span>originY : {{ originY }}<br/></span></div>
                        <div class="col-lg-3 col-4"><span>zoomFactor : {{ zoomFactor }}<br/></span></div>
                        <div class="col-lg-3 col-4"><span>isTransitioning : {{ isTransitioning }}<br/></span></div>
                        <div class="col-lg-3 col-4"><span>transitionStartX : {{ transitionStartX }}<br/></span></div>
                        <div class="col-lg-3 col-4"><span>transitionStartY : {{ transitionStartY }}<br/></span></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted, defineProps, watch } from 'vue'
    import { debounce } from 'lodash'

    // Propriétés
    const props = defineProps(['func'])
    
    // Valeurs par défaut
    const DEFAULT_WIDTH = 600
    const DEFAULT_HEIGHT = 375
    const DEFAULT_SCALE = 20
    const ZOOM_FACTOR = 1.2

    // Couleurs
    const AXIS_COLOR = '#CCC'
    const TEXT_COLOR = '#33C'
    const FUNC_COLOR = '#C22'
    
    // Initialise les réferences
    const canvas = ref<HTMLCanvasElement | null>()
    const width = ref(0)
    const height = ref(0)
    const scale = ref(0)
    const originX = ref(0)
    const originY = ref(0)
    const zoomFactor = ref(ZOOM_FACTOR)
    const isTransitioning = ref(false)
    const transitionStartX = ref(0)
    const transitionStartY = ref(0)

    // Dessine les axes x et y dans le canvas
    const drawAxis = (ctx: CanvasRenderingContext2D) => {
        ctx.beginPath()
        ctx.strokeStyle = AXIS_COLOR
        ctx.moveTo(0, originY.value)
        ctx.lineTo(width.value, originY.value)
        ctx.moveTo(originX.value, 0)
        ctx.lineTo(originX.value, height.value)
        ctx.stroke()
    }

    // Dessine la courbe de la fonction dans le canvas
    const drawFunction = (ctx: CanvasRenderingContext2D) => {
        ctx.beginPath()
        ctx.strokeStyle = FUNC_COLOR
        ctx.lineWidth = 2
        for (let x = -originX.value; x < width.value - originX.value; x++) {
            const y = props.func?.evaluate({x: (x / scale.value)}) * scale.value
            const canvasX = x + originX.value
            const canvasY = originY.value - y // Soustraire y car l'axe Y du canvas est inversé
            if (x === -originX.value) {
                ctx.moveTo(canvasX, canvasY)
            } else {
                ctx.lineTo(canvasX, canvasY)
            }
            ctx.stroke();
        }
    };

    // Efface le canvas puis dessine les axes et la courbe
    const drawCanvas = debounce(function () {
        if (canvas.value) {
            const context = canvas.value.getContext('2d')
            if (context) {
                context.clearRect(0, 0, width.value, height.value)
                drawAxis(context)
                drawFunction(context)
            }
        }
    }, 10);

    // Zoom ou dezoom sur le graphique
    const toZoom = (event: any) => {
        event.preventDefault()
        if (event.deltaY > 0) {
            scale.value /= zoomFactor.value
        } else {
            scale.value *= zoomFactor.value
        }
        drawCanvas();
    };

    // Commence la transition du graphique
    const startTransition = (event: any) => {
        isTransitioning.value = true
        transitionStartX.value = event.clientX
        transitionStartY.value = event.clientY
        if (canvas.value) {
            canvas.value.style.cursor = 'grabbing'
        }
    };
    
    // Effectue la transition du graphique
    const doTransition = (event: any) => {
        if (isTransitioning.value) {
            originX.value += event.clientX - transitionStartX.value
            originY.value += event.clientY - transitionStartY.value
            transitionStartX.value = event.clientX
            transitionStartY.value = event.clientY
            drawCanvas()
        }
    };

    // Termine la transition du graphique
    const endTransition = (event: any) => {
        isTransitioning.value = false
        if (canvas.value) {
            canvas.value.style.cursor = 'grab'
        }
    };
    
    // Reinitialise le graphique
    const resetCanvas = () => {
        width.value = DEFAULT_WIDTH
        height.value = DEFAULT_HEIGHT
        scale.value = DEFAULT_SCALE
        originX.value = width.value / 2
        originY.value = height.value / 2
        transitionStartX.value = 0
        transitionStartY.value = 0
        if (canvas.value) {
            canvas.value.width = width.value
            canvas.value.height = height.value
            drawCanvas()
        }
    }

    // Au montage du module
    onMounted(() => {
        resetCanvas()
    });

    watch(() => props.func, (newVal, oldVal) => {
        if (oldVal != newVal) {
            resetCanvas()
        }
    });

</script>
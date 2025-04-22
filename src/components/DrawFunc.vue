<template>
    <div class="row mt-2">
        <div class="col-4">
            <div class="row mb-3">
                <div class="col">
                    <h2>Fonctions mathématiques</h2>
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-10">
                    <input type="text" class="form-control"
                        placeholder="Expression à dessiner" v-model="expression"
                        @="resetCanvas"/>
                </div>
                <div class="col-2">
                    <button class="btn btn-primary w-100" @click="resetCanvas">
                        <i class="bi bi-arrow-clockwise"></i>
                    </button>
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-12">
                    <div class="card card-body">
                        <button class="btn btn-primary" type="button"
                            data-bs-toggle="collapse" data-bs-target="#debugPanel"
                            aria-expanded="false" aria-controls="debugPanel"
                        >
                            Debug
                        </button>
                        <div class="collapse mt-2" id="debugPanel">
                            <span>width : {{ width }}<br/></span>
                            <span>height : {{ height }}<br/></span>
                            <span>scale : {{ scale }}<br/></span>
                            <span>originX : {{ originX }}<br/></span>
                            <span>originY : {{ originY }}<br/></span>
                            <span>zoomFactor : {{ zoomFactor }}<br/></span>
                            <span>isTransitioning : {{ isTransitioning }}<br/></span>
                            <span>transitionStartX : {{ transitionStartX }}<br/></span>
                            <span>transitionStartY : {{ transitionStartY }}<br/></span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
            </div>
        </div>
        <div class="col-8">
            <canvas 
                class="border border-primary"
                ref="canvas"
                @wheel="toZoom"
                @mousedown="startTransition"
                @mousemove="doTransition"
                @mouseup="endTransition"
                @mouseleave="endTransition"
                style="cursor: grab;"
            ></canvas>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import { debounce } from 'lodash';
    import { all, create, type EvalFunction } from 'mathjs';

    // Valeurs par défaut
    const DEFAULT_WIDTH = 800;
    const DEFAULT_HEIGHT = 450;
    const DEFAULT_SCALE = 20;
    const ZOOM_FACTOR = 1.2;

    // Couleurs
    const AXIS_COLOR = '#CCC';
    const TEXT_COLOR = '#33C';
    const FUNC_COLOR = '#C22';

    // Initialise les réferences
    const expression = ref('x^2');
    const evalFunc = ref<EvalFunction>()
    const canvas = ref<HTMLCanvasElement | null>();
    const width = ref(0);
    const height = ref(0);
    const scale = ref(0);
    const originX = ref(0);
    const originY = ref(0);
    const zoomFactor = ref(ZOOM_FACTOR);
    const isTransitioning = ref(false);
    const transitionStartX = ref(0);
    const transitionStartY = ref(0);

    // Dessine les axes x et y dans le canvas
    const drawAxis = (ctx: CanvasRenderingContext2D) => {
        ctx.beginPath();
        ctx.strokeStyle = AXIS_COLOR;
        ctx.moveTo(0, originY.value);
        ctx.lineTo(width.value, originY.value);
        ctx.moveTo(originX.value, 0);
        ctx.lineTo(originX.value, height.value);
        ctx.stroke();
    }

    // Dessine la courbe de la fonction dans le canvas
    const drawFunction = (ctx: CanvasRenderingContext2D) => {
        ctx.beginPath();
        ctx.strokeStyle = FUNC_COLOR;
        ctx.lineWidth = 2;
        for (let x = -originX.value; x < width.value - originX.value; x++) {
            // const y = func(x / scale.value) * scale.value;
            const y = evalFunc.value?.evaluate({x: (x / scale.value)}) * scale.value;
            const canvasX = x + originX.value;
            const canvasY = originY.value - y; // Soustraire y car l'axe Y du canvas est inversé
            if (x === -originX.value) {
                ctx.moveTo(canvasX, canvasY);
            } else {
                ctx.lineTo(canvasX, canvasY);
            }
            ctx.stroke();
        }
    };

    // Efface le canvas puis dessine les axes et la courbe
    const drawCanvas = debounce(function () {
        if (canvas.value) {
            const context = canvas.value.getContext('2d');
            if (context) {
                context.clearRect(0, 0, width.value, height.value);
                drawAxis(context);
                drawFunction(context);
            }
        }
    }, 10);

    // Zoom ou dezoom sur le graphique
    const toZoom = (event: any) => {
        event.preventDefault();
        if (event.deltaY > 0) {
            scale.value /= zoomFactor.value;
        } else {
            scale.value *= zoomFactor.value;
        }
        drawCanvas();
    };

    // Commence la transition du graphique
    const startTransition = (event: any) => {
        isTransitioning.value = true;
        transitionStartX.value = event.clientX;
        transitionStartY.value = event.clientY;
        if (canvas.value) {
            canvas.value.style.cursor = 'grabbing';
        }
    };
    
    // Effectue la transition du graphique
    const doTransition = (event: any) => {
        if (isTransitioning.value) {
            originX.value += event.clientX - transitionStartX.value;
            originY.value += event.clientY - transitionStartY.value;
            transitionStartX.value = event.clientX;
            transitionStartY.value = event.clientY;
            drawCanvas();
        }
    };

    // Termine la transition du graphique
    const endTransition = (event: any) => {
        isTransitioning.value = false;
        if (canvas.value) {
            canvas.value.style.cursor = 'grab';
        }
    };

    // Evalue l'expression
    const evaluateExpression = () => {
        const math = create(all)
        evalFunc.value = math.compile(expression.value);
    }
    
    // Reinitialise le graphique
    const resetCanvas = () => {
        width.value = DEFAULT_WIDTH;
        height.value = DEFAULT_HEIGHT;
        scale.value = DEFAULT_SCALE;
        originX.value = width.value / 2;
        originY.value = height.value / 2;
        transitionStartX.value = 0;
        transitionStartY.value = 0;
        if (canvas.value) {
            canvas.value.width = width.value;
            canvas.value.height = height.value;
            evaluateExpression();
            drawCanvas();
        }
    }

    // Au montage du module
    onMounted(() => {
        resetCanvas();
    });
</script>
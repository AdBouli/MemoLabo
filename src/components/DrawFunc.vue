<template>
    <div class="row">
        <div class="col-4">
            <h4>Debug</h4>
            <p>width : {{ width }}</p>
            <p>height : {{ height }}</p>
            <p>scale : {{ scale }}</p>
            <p>originX : {{ originX }}</p>
            <p>originY : {{ originY }}</p>
            <p>zoomFactor : {{ zoomFactor }}</p>
            <p>isTransitioning : {{ isTransitioning }}</p>
            <p>transitionStartX : {{ transitionStartX }}</p>
            <p>transitionStartY : {{ transitionStartY }}</p>
            <button class="btn btn-primary" @click="resetCanvas">Réinitialiser</button>
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

    // Valeurs par défaut
    const DEFAULT_WIDTH = 800;
    const DEFAULT_HEIGHT = 450;
    const DEFAULT_SCALE = 20;

    // Couleurs
    const AXIS_COLOR = '#CCC';
    const TEXT_COLOR = '#33C';
    const FUNC_COLOR = '#C22';

    // Initialise les réferences
    const canvas = ref<HTMLCanvasElement | null>();
    const width = ref(DEFAULT_WIDTH);
    const height = ref(DEFAULT_HEIGHT);
    const scale = ref(DEFAULT_SCALE);
    const originX = ref(DEFAULT_WIDTH / 2);
    const originY = ref(DEFAULT_HEIGHT / 2);
    const zoomFactor = ref(1.2);
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
        const func = (x: number) => Math.pow(x, 3); // Fonction a dessiner
        ctx.beginPath();
        ctx.strokeStyle = FUNC_COLOR;
        ctx.lineWidth = 2;
        for (let x = -originX.value; x < width.value - originX.value; x++) {
            const y = func(x / scale.value) * scale.value;
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

    const toZoom = (event: any) => {
        event.preventDefault();
        if (event.deltaY > 0) {
            scale.value /= zoomFactor.value;
        } else {
            scale.value *= zoomFactor.value;
        }
        drawCanvas();
    };

    const startTransition = (event: any) => {
        isTransitioning.value = true;
        transitionStartX.value = event.clientX;
        transitionStartY.value = event.clientY;
        if (canvas.value) {
            canvas.value.style.cursor = 'grabbing';
        }
    };
    
    const doTransition = (event: any) => {
        if (isTransitioning.value) {
            originX.value += event.clientX - transitionStartX.value;
            originY.value += event.clientY - transitionStartY.value;
            transitionStartX.value = event.clientX;
            transitionStartY.value = event.clientY;
            drawCanvas();
        }
    };

    const endTransition = (event: any) => {
        isTransitioning.value = false;
        if (canvas.value) {
            canvas.value.style.cursor = 'grab';
        }
    };
    
    const resetCanvas = () => {
        width.value = DEFAULT_WIDTH;
        height.value = DEFAULT_HEIGHT;
        scale.value = DEFAULT_SCALE;
        originX.value = DEFAULT_WIDTH / 2;
        originY.value = DEFAULT_HEIGHT / 2;
        transitionStartX.value = 0;
        transitionStartY.value = 0;
        drawCanvas();
    }

    onMounted(() => {
        if (canvas.value) {
            canvas.value.width = width.value;
            canvas.value.height = height.value;
            originX.value = width.value / 2;
            originY.value = height.value / 2;
            drawCanvas();
        }
    });
</script>
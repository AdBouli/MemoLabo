<template>
    <div class="dropup position-absolute bottom-0 end-0 mb-2 me-2"
        v-bs:tooltip="{title: 'Changer la résolution', placement: 'left'}">
        <button type="button" class="btn btn-outline-primary"
            data-bs-toggle="dropdown">
            <i class="bi bi-stars"></i>
        </button>
        <ul class="dropdown-menu dropdown-menu-end">
            <li class="dropdown-header text-end py-0">
                <h6>Résolutions</h6>
            </li>
            <li v-for="(resolution, index) in resolutions" :key="index">
                <button class="dropdown-item text-end" @click.prevent="changeResolution" :value="index">
                    <i class="bi bi-check" v-if="resolution == actualResolution"/>
                    {{resolution}}p
                </button>
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>

    import { ref } from 'vue'

    const resolutions = ref([144, 240, 360, 480, 720, 1080, 1440, 2160]);

    const props = defineProps({
        actualResolution: {
            type: Number,
            required: true
        }
    })

    const emit = defineEmits(['changeResolution'])

    const changeResolution = (event: Event) => {
        const target = event.target as HTMLButtonElement;
        emit('changeResolution', resolutions.value[parseInt(target.value)]);
    }
    
</script>
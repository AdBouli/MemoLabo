<template>
    <div class="border border-secondary rounded p-2">
        <div class="row align-items-center">
            <div class="col">
                <h4>{{ colorModel.getName() }}</h4>
            </div>
            <div class="col-auto">
                <span class="text-muted">{{ colorModel.toString() }}</span>
            </div>
            <div class="col-auto">
                <button type="button" class="btn btn-outline-secondary"
                    data-bs-toggle="collapse" :data-bs-target="`#${collapseId}`">
                    <i class="bi bi-caret-down"></i>
                </button>
            </div>
        </div>
        <div class="collapse show" :id="collapseId">
            <RangeNumberInput v-for="(component, index) in colorModel.getComponents()" :key="index" :size="'sm'"
                class="mt-1" :label="component.label" :id="`color_${colorModel.getName}_${component.name}_input`"
                :min="component.minValue" :max="component.maxValue" :step="component.valuePrecision" 
                :model-value="component.value" @update:model-value="component.value = $event; handleInput()" />
        </div>
    </div>
</template>

<script setup lang="ts">
import RangeNumberInput from '@/components/RangeNumberInput.vue';
import { type IColorModel } from '@/models/GlossCraft/ColorModels/BaseColorModel';
import { useId } from 'vue';

const collapseId = useId()

const props = defineProps({
    colorModel: {
        type: Object as () => IColorModel,
        required: true,
    }
})

const emit = defineEmits<{
    'update:colorModel': [value: IColorModel]
}>()

const handleInput = () => {
    emit('update:colorModel', props.colorModel)
}

</script>
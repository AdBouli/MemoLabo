<template>
    <p>Exemple de module</p>

    <div :style="{backgroundColor: baseColor?.hexa }">
      <p>{{ baseColor?.hexa }}</p>
      <p>{{ baseColor?.rgb }}</p>
      <p>{{ baseColor?.hsl }}</p>
      <p>{{ baseColor?.hsv }}</p>
      <p>{{ baseColor?.lab }}</p>
    </div>

</template>

<script setup lang="ts">

import { onMounted, ref } from 'vue';
import { Color } from '@/components/modules/GlossCraft/Models/Color';

const baseColor = ref<Color>()

onMounted(() => {
  baseColor.value = new Color({
    hexa: '#FF00FF'
  })
})

// gérer la composante a de rgba

</script>


<template>
    <p>Exemple de module</p>

    <div :style="{backgroundColor: baseColor?.hexa }">
      <p>{{ baseColor?.hexa }}</p>
      <p>{{ baseColor?.rgb }}</p>
      <p>{{ baseColor?.hsl }}</p>
      <p>{{ baseColor?.hsl.toRGB() }}</p>
      <p>{{ baseColor?.hsv }}</p>
      <p>{{ baseColor?.hsv.toRGB() }}</p>
      <p>{{ baseColor?.lab }}</p>
      <p>{{ baseColor?.lab.toRGB() }}</p>
    </div>

</template>

<script setup lang="ts">

import { onMounted, ref } from 'vue';
import { Color } from '@/components/modules/GlossCraft/Models/Color';

const baseColor = ref<Color>()

onMounted(() => {
  baseColor.value = new Color({
    hexa: '#ab6715'
  })
})

// gérer la composante a de rgba

</script>


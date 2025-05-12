<template>
    <p>Exemple de module</p>

    <div :style="{backgroundColor: baseColor?.toHex() }">
      <p>{{ baseColor?.toHex() }}</p>
      <p>{{ baseColor?.toRGB() }}</p>
      <p>{{ baseColor?.toHSL() }}</p>
      <p>{{ baseColor?.toLab() }}</p>
    </div>
    
</template>

<script setup lang="ts">

import { onMounted, ref } from 'vue';
import { Color } from '@/components/modules/GlossCraft/Models/Color';

const baseColor = ref<Color|null>(null)

onMounted(() => {
  baseColor.value = new Color({
    hexa: '#567843'
  })
})

// gérer le constructeur avec rgb, hsl lab ... et les conversions adequat
// gérer la composante a de rgba
// vérifier et corriger les éventuelles erreurs de conversion

</script>


<script setup>
import Parcels from './components/Parcels.vue';
import { useParcelsHandlingStore } from './stores/ParcelsHandling';

const store = useParcelsHandlingStore();
store.getParcels();
store.getWeightBusinessRules();
store.getValueBusinessRules();
</script>

<template>
  <Parcels />
</template>

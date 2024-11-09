<script setup>
import BusinessRules from './components/BusinessRules.vue';
import Parcels from './components/Parcels.vue';
import { useParcelsHandlingStore } from './stores/ParcelsHandling';

const store = useParcelsHandlingStore();
store.getParcels();
store.getWeightBusinessRules();
store.getValueBusinessRules();
</script>

<template>
  <div class="parcels-handling">
    <div>
      <Parcels />
    </div>
    <div>
      <BusinessRules />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.parcels-handling {
  display: flex;
  gap: 64px;
}
</style>

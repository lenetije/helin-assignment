<script setup>
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { useParcelsHandlingStore } from '../stores/ParcelsHandling';

const store = useParcelsHandlingStore();
const { weightBusinessRules, valueBusinessRules } = storeToRefs(store);

const departmentsForRemoval = computed(() => [
  ...weightBusinessRules.value,
  ...valueBusinessRules.value,
]);
const selectedDepartment = ref(null);

const removeDepartment = () => {
  store.removeDepartment(selectedDepartment.department);
};

const cleanLocalStorage = () => {
  store.cleanLocalStorage();
};
</script>

<template>
  <div>
    <div>Remove department</div>
    <select v-model="selectedDepartment">
      <option v-for="department in departmentsForRemoval">{{ department.department }}</option>
    </select>
    <button @click="removeDepartment">Remove</button>
  </div>
  <div>
    <button @click="cleanLocalStorage">Clean local storage</button>
  </div>
</template>

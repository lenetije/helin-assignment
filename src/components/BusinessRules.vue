<script setup>
import { storeToRefs } from 'pinia';
import { computed, reactive, ref } from 'vue';
import { useParcelsHandlingStore } from '../stores/ParcelsHandling';
import { businessRulesTypes } from '@/utils/BusinessRulesTypes';

const store = useParcelsHandlingStore();
const { weightBusinessRules, valueBusinessRules } = storeToRefs(store);

const departmentsForRemoval = computed(() => [
  ...weightBusinessRules.value,
  ...valueBusinessRules.value,
]);
const selectedDepartment = ref(null);

const newRule = reactive({ department: null, lowerLimit: null, upperLimit: null });
const newRuleType = ref(businessRulesTypes.byWeight);
const precedence = ref(false);

const disableAddButton = computed(
  () =>
    !newRule.department ||
    (!newRule.lowerLimit && !newRule.upperLimit) ||
    (newRule.lowerLimit && newRule.upperLimit && newRule.lowerLimit > newRule.upperLimit),
);

const removeDepartment = () => {
  store.removeDepartment(selectedDepartment);
};

const cleanLocalStorage = () => {
  store.cleanLocalStorage();
};

const addBusinessRule = () => {
  store.addBusinessRule(newRule, newRuleType, precedence);
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
    <div>Add department</div>
    <input type="text" v-model="newRule.department" />
    <input type="number" v-model="newRule.lowerLimit" min="0" />
    <input type="number" v-model="newRule.upperLimit" min="0" />
    <select v-model="newRuleType">
      <option v-for="type in businessRulesTypes">{{ type }}</option>
    </select>
    <input id="precedence" type="checkbox" v-model="precedence" /><label for="precedence"
      >Takes precedence over other business rules</label
    >
    <button @click="addBusinessRule" :disabled="disableAddButton">Add</button>
  </div>
  <div>
    <button @click="cleanLocalStorage">Clean local storage</button>
  </div>
</template>

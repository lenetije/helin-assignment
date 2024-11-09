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
  <div class="business-rules">
    <h3>Edit business rules</h3>
    <div class="business-rules__action">
      <div class="business-rules__action-title">Remove department</div>
      <div class="business-rules__action-input">
        <select v-model="selectedDepartment">
          <option v-for="department in departmentsForRemoval">{{ department.department }}</option>
        </select>
        <button @click="removeDepartment">Remove</button>
      </div>
    </div>
    <div class="business-rules__action">
      <div class="business-rules__action-title">Add department</div>
      <div class="business-rules__action-input">
        <label for="department">Department Name</label
        ><input id="department" type="text" v-model="newRule.department" />
      </div>
      <div class="business-rules__action-input">
        <label for="lower">Lower Limit</label
        ><input id="lower" type="number" v-model="newRule.lowerLimit" min="0" />
      </div>
      <div class="business-rules__action-input">
        <label for="upper">Upper Limit</label
        ><input id="upper" type="number" v-model="newRule.upperLimit" min="0" />
      </div>
      <div class="business-rules__action-input">
        <label for="type">Type</label>
        <select id="type" v-model="newRuleType">
          <option v-for="type in businessRulesTypes">{{ type }}</option>
        </select>
      </div>
      <div class="business-rules__action-input">
        <input id="precedence" type="checkbox" v-model="precedence" /><label for="precedence"
          >Takes precedence over other business rules</label
        >
      </div>

      <button @click="addBusinessRule" :disabled="disableAddButton">Add</button>
    </div>
    <div class="business-rules__action">
      <button @click="cleanLocalStorage">Clean local storage</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.business-rules {
  &__action {
    margin-bottom: 32px;
    &-title {
      margin-bottom: 16px;
      font-weight: 600;
    }
    &-input {
      display: flex;
      align-items: baseline;
      gap: 8px;
      margin-bottom: 8px;
      font-size: 14px;
    }
  }
  input,
  select {
    background: white;
    border: 1px solid #f07f12;
    border-radius: 4px;
    padding: 4px;
    &:focus-visible {
      outline: 2px solid #ebaa6d;
    }
  }
  button {
    background-color: #f07f12;
    border-radius: 4px;
    padding: 4px 8px;
    border: none;
    color: white;
    cursor: pointer;
    &:disabled {
      cursor: initial;
      opacity: 0.5;
    }
  }
}
</style>

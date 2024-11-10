import { ref } from 'vue';
import { defineStore } from 'pinia';
import { XMLParser } from 'fast-xml-parser';
import { defaultWeightBusinessRules, defaultValueBusinessRules } from './DefaultBusinessRules';
import { businessRulesTypes } from '@/utils/BusinessRulesTypes';

export const useParcelsHandlingStore = defineStore('parcelsHandling', () => {
  // state
  const parcels = ref([]);
  const weightBusinessRules = ref([]);
  const valueBusinessRules = ref([]);
  const date = ref(null);

  // getters
  const getParcels = () => {
    const parser = new XMLParser();
    fetch('/Container_68465468.xml')
      .then((r) => r.text())
      .then((xmlData) => {
        const obj = parser.parse(xmlData).Container;
        parcels.value = obj.parcels.Parcel;
        date.value = obj.ShippingDate;
      });
  };
  const getWeightBusinessRules = () => {
    const storedBusinessRules = localStorage.getItem(businessRulesTypes.byWeight);
    if (!storedBusinessRules) {
      weightBusinessRules.value = defaultWeightBusinessRules;
      localStorage.setItem(businessRulesTypes.byWeight, JSON.stringify(defaultWeightBusinessRules));
    } else {
      weightBusinessRules.value = JSON.parse(storedBusinessRules);
    }
  };
  const getValueBusinessRules = () => {
    const storedBusinessRules = localStorage.getItem(businessRulesTypes.byValue);
    if (!storedBusinessRules) {
      valueBusinessRules.value = defaultValueBusinessRules;
      localStorage.setItem(businessRulesTypes.byValue, JSON.stringify(defaultValueBusinessRules));
    } else {
      valueBusinessRules.value = JSON.parse(storedBusinessRules);
    }
  };

  // actions
  const removeDepartment = (departmentName) => {
    const weightBusinessRuleToRemove = weightBusinessRules.value.findIndex(
      (rule) => rule.department === departmentName.value,
    );
    if (weightBusinessRuleToRemove !== -1) {
      weightBusinessRules.value = weightBusinessRules.value.toSpliced(
        weightBusinessRuleToRemove,
        1,
      );
      localStorage.setItem(businessRulesTypes.byWeight, JSON.stringify(weightBusinessRules.value));
    } else {
      const valueBusinessRuleToRemove = valueBusinessRules.value.findIndex(
        (rule) => rule.department === departmentName.value,
      );
      valueBusinessRules.value = valueBusinessRules.value.toSpliced(valueBusinessRuleToRemove, 1);
      localStorage.setItem(businessRulesTypes.byValue, JSON.stringify(valueBusinessRules.value));
    }
  };

  const addBusinessRule = (businessRule, type, precedence) => {
    if (type.value === businessRulesTypes.byWeight) {
      if (precedence) {
        weightBusinessRules.value.unshift(businessRule);
      } else {
        weightBusinessRules.value.push(businessRule);
      }
      localStorage.setItem(businessRulesTypes.byWeight, JSON.stringify(weightBusinessRules.value));
    } else if (type.value === businessRulesTypes.byValue) {
      if (precedence) {
        valueBusinessRules.value.unshift(businessRule);
      } else {
        valueBusinessRules.value.push(businessRule);
      }
      localStorage.setItem(businessRulesTypes.byValue, JSON.stringify(valueBusinessRules.value));
    } else {
      throw new Error('no type of business rule recognized');
    }
  };

  const cleanLocalStorage = () => {
    localStorage.removeItem(businessRulesTypes.byWeight);
    localStorage.removeItem(businessRulesTypes.byValue);
  };

  return {
    date,
    parcels,
    valueBusinessRules,
    weightBusinessRules,
    addBusinessRule,
    cleanLocalStorage,
    getParcels,
    getValueBusinessRules,
    getWeightBusinessRules,
    removeDepartment,
  };
});

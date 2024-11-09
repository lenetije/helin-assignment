import { ref } from 'vue';
import { defineStore } from 'pinia';
import { XMLParser } from 'fast-xml-parser';
import { defaultWeightBusinessRules, defaultValueBusinessRules } from './defaultBusinessRules';

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
    const storedBusinessRules = localStorage.getItem('weightBusinessRules');
    if (!storedBusinessRules) {
      weightBusinessRules.value = defaultWeightBusinessRules;
      localStorage.setItem('weightBusinessRules', JSON.stringify(defaultWeightBusinessRules));
    } else {
      weightBusinessRules.value = JSON.parse(storedBusinessRules);
    }
  };
  const getValueBusinessRules = () => {
    const storedBusinessRules = localStorage.getItem('valueBusinessRules');
    if (!storedBusinessRules) {
      valueBusinessRules.value = defaultValueBusinessRules;
      localStorage.setItem('valueBusinessRules', JSON.stringify(defaultValueBusinessRules));
    } else {
      valueBusinessRules.value = JSON.parse(storedBusinessRules);
    }
  };

  return {
    parcels,
    valueBusinessRules,
    weightBusinessRules,
    getParcels,
    getValueBusinessRules,
    getWeightBusinessRules,
  };
});

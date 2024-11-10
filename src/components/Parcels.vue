<script setup>
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useParcelsHandlingStore } from '@/stores/ParcelsHandlingStore';
import { assignDepartmentsToParcel } from '@/utils/AssignDepartmentsToParcel';

const store = useParcelsHandlingStore();
const { weightBusinessRules, valueBusinessRules, parcels, date } = storeToRefs(store);

const parcelsWithDepartments = computed(() => {
  return parcels.value.map((parcel) => {
    return assignDepartmentsToParcel(parcel, weightBusinessRules, valueBusinessRules);
  });
});

const addressFirstLine = (address) => `${address.Street} ${address.HouseNumber}`;
const addressSecondLine = (address) => `${address.PostalCode} ${address.City}`;

const displayDate = computed(() => new Date(date.value).toLocaleDateString());
</script>

<template>
  <h3>Shipping date: {{ displayDate }}</h3>
  <table>
    <thead>
      <th>Recipient</th>
      <th>Address</th>
      <th>Value check</th>
      <th>Handling</th>
    </thead>
    <tbody>
      <tr v-for="parcel in parcelsWithDepartments">
        <td>{{ parcel.Receipient.Name }}</td>
        <td>
          <div>
            {{ addressFirstLine(parcel.Receipient.Address) }}
          </div>
          <div>
            {{ addressSecondLine(parcel.Receipient.Address) }}
          </div>
        </td>
        <td>{{ parcel.valueDepartment || 'No applicable department' }}</td>
        <td>{{ parcel.handlingDepartment || 'No applicable department' }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style lang="scss" scoped>
table {
  table-layout: fixed;
  border-collapse: collapse;
  border: 1px solid #1e2143;
  font-size: 14px;
}
th,
td {
  padding: 8px 16px;
  border: 1px solid #1e2143;
}
</style>

export const assignDepartmentsToParcel = (parcel, weightBusinessRules, valueBusinessRules) => {
  let handlingDeparment = null;
  for (let rule of weightBusinessRules.value) {
    if (parcel.Weight > rule.lowerLimit && (!rule.upperLimit || parcel.Weight <= rule.upperLimit)) {
      handlingDeparment = rule.department;
      break;
    }
  }
  let valueDepartment = null;
  for (let rule of valueBusinessRules.value) {
    if (parcel.Value > rule.lowerLimit && (!rule.upperLimit || parcel.Value <= rule.upperLimit)) {
      valueDepartment = rule.department;
      break;
    }
  }
  return { ...parcel, handlingDepartment: handlingDeparment, valueDepartment: valueDepartment };
};

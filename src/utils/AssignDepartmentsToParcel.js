export const assignDepartmentsToParcel = (parcel, weightBusinessRules, valueBusinessRules) => {
  const handlingDeparment = assignDepartment(parcel.Weight, weightBusinessRules.value);
  const valueDepartment = assignDepartment(parcel.Value, valueBusinessRules.value);
  return { ...parcel, handlingDepartment: handlingDeparment, valueDepartment: valueDepartment };
};

const assignDepartment = (parcelData, rules) => {
  let department = null;
  for (let rule of rules) {
    if (parcelData > rule.lowerLimit && (!rule.upperLimit || parcelData <= rule.upperLimit)) {
      department = rule.department;
      break;
    }
  }
  return department;
};

import { describe, it, expect, beforeAll } from 'vitest';
import { ref } from 'vue';

import { assignDepartmentsToParcel } from '../../utils/assignDepartmentsToParcel';
import {
  defaultValueBusinessRules,
  defaultWeightBusinessRules,
} from '@/stores/defaultBusinessRules';

describe('assignDepartmentToParcel', () => {
  const weightBusinessRules = ref(defaultWeightBusinessRules);
  const valueBusinessRules = ref(defaultValueBusinessRules);

  it('assigns to Mail a parcel under 1kg', () => {
    const parcel = { Weight: 0.9, Value: 0 };
    const parcelWithDepartments = assignDepartmentsToParcel(
      parcel,
      weightBusinessRules,
      valueBusinessRules,
    );
    expect(parcelWithDepartments.handlingDepartment).toBe('Mail');
  });

  it('assigns to Mail a parcel of 1kg', () => {
    const parcel = { Weight: 1, Value: 0 };
    const parcelWithDepartments = assignDepartmentsToParcel(
      parcel,
      weightBusinessRules,
      valueBusinessRules,
    );
    expect(parcelWithDepartments.handlingDepartment).toBe('Mail');
  });

  it('assigns to Regular a parcel of 1.001kg', () => {
    const parcel = { Weight: 1.001, Value: 0 };
    const parcelWithDepartments = assignDepartmentsToParcel(
      parcel,
      weightBusinessRules,
      valueBusinessRules,
    );
    expect(parcelWithDepartments.handlingDepartment).toBe('Regular');
  });

  it('assigns to Regular a parcel of 10kg', () => {
    const parcel = { Weight: 10, Value: 0 };
    const parcelWithDepartments = assignDepartmentsToParcel(
      parcel,
      weightBusinessRules,
      valueBusinessRules,
    );
    expect(parcelWithDepartments.handlingDepartment).toBe('Regular');
  });

  it('assigns to Heavy a parcel of 10.001kg', () => {
    const parcel = { Weight: 10.001, Value: 0 };
    const parcelWithDepartments = assignDepartmentsToParcel(
      parcel,
      weightBusinessRules,
      valueBusinessRules,
    );
    expect(parcelWithDepartments.handlingDepartment).toBe('Heavy');
  });

  it('does not send to Insurance a parcel with less than €1000 value', () => {
    const parcel = { Weight: 1, Value: 500 };
    const parcelWithDepartments = assignDepartmentsToParcel(
      parcel,
      weightBusinessRules,
      valueBusinessRules,
    );
    expect(parcelWithDepartments.valueDepartment).toBe(null);
  });

  it('does not send to Insurance a parcel with exactly €1000 value', () => {
    const parcel = { Weight: 1, Value: 1000 };
    const parcelWithDepartments = assignDepartmentsToParcel(
      parcel,
      weightBusinessRules,
      valueBusinessRules,
    );
    expect(parcelWithDepartments.valueDepartment).toBe(null);
  });

  it('sends to Insurance a parcel with more than €1000 value', () => {
    const parcel = { Weight: 1, Value: 2500 };
    const parcelWithDepartments = assignDepartmentsToParcel(
      parcel,
      weightBusinessRules,
      valueBusinessRules,
    );
    expect(parcelWithDepartments.valueDepartment).toBe('Insurance');
  });
});

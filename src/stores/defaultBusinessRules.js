export const defaultWeightBusinessRules = [
  {
    department: 'Mail',
    lowerLimit: null,
    upperLimit: 1,
  },
  {
    department: 'Regular',
    lowerLimit: 1.001,
    upperLimit: 10,
  },
  {
    department: 'Heavy',
    lowerLimit: 10.001,
    upperLimit: null,
  },
];

export const defaultValueBusinessRules = [
  {
    department: 'Insurance',
    lowerLimit: 1000,
    upperLimit: null,
  },
];

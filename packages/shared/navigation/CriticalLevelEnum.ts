// src/shared/navigation/CriticalLevelEnum.ts

export type CriticalLevel = 'LOW' | 'INFO' | 'MEDIUM' | 'HIGH';

const CriticalLevelEnum = {
  LOW: 'LOW',
  INFO: 'INFO',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
} as const;

export default CriticalLevelEnum;

import { Calculation } from './calculation.interface';

export interface Result {
  result: boolean;
  index: number;
  calculation: Calculation;
  timestamp: number;
}

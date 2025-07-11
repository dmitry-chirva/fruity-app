import { Fruit } from '../types/fruit.type.ts';

export const calculateCalories = (fruits: Fruit[]): number =>
  fruits.reduce((sum, fruit) => sum + (fruit.nutritions.calories || 0), 0);

import { create } from 'zustand';
import { Fruit } from '../shared/types/fruit.type';
import { FruitViewMode } from '../shared/enums/fruit.enum';
import { FRUIT_ATTRIBUTE_TYPES } from '../shared/constants/fruit-attribute-types.ts';

type State = {
  fruits: Fruit[];
  fruitView: FruitViewMode;
  selectedGroup: string;
};

type Actions = {
  setFruits: (fruits: Fruit[]) => void;
  setFruitView: (view: FruitViewMode) => void;
  setGroup: (selectedGroup: string) => void;
};

export const useFruitSlice = create<State & Actions>()((set) => ({
  fruits: [],
  fruitView: FruitViewMode.List,
  selectedGroup: FRUIT_ATTRIBUTE_TYPES.NONE,
  setFruits: (fruits) => set({ fruits }),
  setFruitView: (view) => set({ fruitView: view }),
  setGroup: (selectedGroup) => set({ selectedGroup }),
}));

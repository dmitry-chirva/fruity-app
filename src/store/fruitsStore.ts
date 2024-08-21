import create from 'zustand';

import { Fruit } from '../shared/types/fruit.type';
import { FRUIT_ATTRIBUTE_TYPES } from '../shared/constants/fruit-attribute-types';

type FruitsState = {
    fruits: Fruit[];
    jar: Fruit[];
    selectedGroup: string;
    setFruits: (fruits: Fruit[]) => void;
    setSelectedGroup: (group: string) => void;
    addToJar: (fruit: Fruit) => void;
    addAllToJar: (fruits: Fruit[]) => void;
    removeJarById: (id: number) => void;
    clearJar: () => void;
};

/* TODO add persist and add fruit without duplicates */
export const useFruitsStore = create<FruitsState>((set) => ({
    fruits: [],
    jar: [],
    selectedGroup: FRUIT_ATTRIBUTE_TYPES.NONE,
    setFruits: (fruits) => set({ fruits }),
    setSelectedGroup: (group) => set({ selectedGroup: group }),
    addToJar: (fruit) => set((state) => ({
            jar: [...state.jar, fruit]
    })),
    addAllToJar: (fruits) => set((state) => ({
            jar: [...state.jar, ...fruits]
    })),
    removeJarById: (id: number) => set((state) => ({
            jar: state.jar.filter((jar) => jar.id !== id)
    })),
    clearJar: () => set({ jar: [] }),
}));

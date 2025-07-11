import { create } from 'zustand';
import { JarViewMode } from '../shared/enums/jar.enum';
import { Fruit } from '../shared/types/fruit.type';

type State = { jar: Fruit[]; jarView: JarViewMode };

type Actions = {
  addFruit: (fruit: Fruit) => void;
  addAllFruits: (fruits: Fruit[]) => void;
  removeFruit: (uid: string) => void;
  clearAllFruits: () => void;
  setJarView: (view: JarViewMode) => void;
};

export const useJarSlice = create<State & Actions>()((set) => ({
  jar: [],
  jarView: JarViewMode.List,
  addFruit: (fruit) =>
    set((state) => ({
      jar: [...state.jar, { ...fruit, uid: crypto.randomUUID() }],
    })),
  addAllFruits: (fruits) =>
    set((state) => ({
      jar: [...state.jar, ...fruits.map((fruit) => ({ ...fruit, uid: crypto.randomUUID() }))],
    })),
  removeFruit: (uid: string) =>
    set((state) => ({
      jar: state.jar.filter((jar) => jar.uid !== uid),
    })),
  clearAllFruits: () => set({ jar: [] }),
  setJarView: (view) => set({ jarView: view }),
}));

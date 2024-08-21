type Nutrition = {
    calories: number;
    fat: number;
    sugar: number;
    carbohydrates: number;
    protein: number;
}

export type Fruit = {
    id: number;
    name: string;
    family: string;
    order: string;
    genus: string;
    nutritions: Nutrition;
};

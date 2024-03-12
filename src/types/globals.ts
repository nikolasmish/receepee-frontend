export type Recipe = {
  id: number;
  title: string;
  instructions: string;
  image: string;
  ingredients?: Ingredient[];
  prepareTimeInMinutes: number;
  isFavorite: boolean;
  dateAdded: string;
  category: {
    categoryId: number;
    name: string;
  };
};

export type Ingredient = {
  id: number;
  quantity: number;
  name: string;
};

export type Category = {
  categoryId: number;
  name: string;
};

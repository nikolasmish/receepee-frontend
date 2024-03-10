export type Recipe = {
  id: number;
  title: string;
  content: string;
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
  id: number;
  name: string;
};

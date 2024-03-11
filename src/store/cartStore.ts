import { Ingredient, Recipe } from "@/types/globals";
import { create } from "zustand";
import { produce } from "immer";
import { persist } from "zustand/middleware";

export type IngredientWithCheck = Ingredient & {
  checked: boolean;
};

export type RecipeWithIngredientsCheck = Omit<Recipe, "ingredients"> & {
  ingredients?: IngredientWithCheck[];
};

interface Cart {
  cart: RecipeWithIngredientsCheck[];
  addToCart: (newRecipe: RecipeWithIngredientsCheck) => void;
  removeFromCart: (recipe: RecipeWithIngredientsCheck) => void;
  markAsChecked: (recipeId: number, ingredientId: number) => void;
}

const useCartStore = create<Cart>()(
  persist(
    (set) => ({
      cart: [],
      addToCart: (newRecipe) =>
        set((state) => ({ cart: [...state.cart, newRecipe] })),
      removeFromCart: (recipe) =>
        set((state) => ({
          cart: [...state.cart.filter((x) => x.id !== recipe.id)],
        })),
      markAsChecked: (recipeId, ingredientId) =>
        set(
          produce((state: Cart) => {
            state.cart
              .find((r) => r.id === recipeId)
              .ingredients.find((i) => i.id === ingredientId).checked =
              !state.cart
                .find((r) => r.id === recipeId)
                .ingredients.find((i) => i.id === ingredientId).checked;
          }),
        ),
    }),
    { name: "cart" },
  ),
);

export { useCartStore };

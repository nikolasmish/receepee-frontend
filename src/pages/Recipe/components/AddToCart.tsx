import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { Recipe } from "@/types/globals";
import { BsCartDash, BsCartPlus } from "react-icons/bs";

interface Props {
  recipe: Recipe;
}

const AddToCart = ({ recipe }: Props) => {
  const cart = useCartStore((state) => state.cart);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const hasRecipeInCart = cart.some((i) => i.id === recipe.id);

  const recipeWithIngredientCheck = {
    ...recipe,
    ingredients: recipe.ingredients
      ? recipe.ingredients.map((i) => ({
          ...i,
          checked: false,
        }))
      : [],
  };

  const onClick = () => {
    hasRecipeInCart
      ? removeFromCart(recipeWithIngredientCheck)
      : addToCart(recipeWithIngredientCheck);
  };

  return (
    <Button variant="secondary" onClick={onClick}>
      {hasRecipeInCart ? (
        <BsCartDash className="mr-2" />
      ) : (
        <BsCartPlus className="mr-2" />
      )}
      {hasRecipeInCart ? "Remove from cart" : "Add to cart"}
    </Button>
  );
};

export default AddToCart;

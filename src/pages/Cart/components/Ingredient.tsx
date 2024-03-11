import { Checkbox } from "@/components/ui/checkbox";
import {
  IngredientWithCheck as TIngredient,
  useCartStore,
} from "@/store/cartStore";
import clsx from "clsx";

interface Props {
  ingredient: TIngredient;
  recipeId: number;
}

const Ingredient = ({ ingredient, recipeId }: Props) => {
  const { markAsChecked } = useCartStore();

  return (
    <li key={ingredient.id} className="flex mb-2 gap-2 items-center">
      <Checkbox
        checked={ingredient.checked}
        onClick={() => markAsChecked(recipeId, ingredient.id)}
      />
      <p
        className={`transition-colors ${clsx({ "line-through opacity-40": ingredient.checked })}`}
      >
        {ingredient.quantity} {ingredient.name}
      </p>
    </li>
  );
};

export default Ingredient;

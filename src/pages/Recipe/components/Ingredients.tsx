import { Recipe } from "@/types/globals";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  recipe: Recipe;
}

const Ingredients = ({ recipe, ...rest }: Props) => {
  return (
    <div {...rest}>
      <h2 className="text-2xl font-bold mb-2">Ingredients:</h2>

      <ul className="list-disc mb-2">
        {recipe.ingredients &&
          recipe.ingredients.map((i) => (
            <li className="ml-4">
              <span>{i.quantity} </span>
              {i.name}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Ingredients;

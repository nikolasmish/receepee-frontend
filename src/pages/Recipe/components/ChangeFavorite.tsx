import { Button } from "@/components/ui/button";
import { Recipe } from "@/types/globals";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { useMutation, useQueryClient } from "react-query";

interface Props {
  recipe: Recipe;
  id?: string;
}

const ChangeFavorite = ({ recipe, id }: Props) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => {
      return fetch(`/api/Recipes/favorite/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ favorite: recipe && recipe.isFavorite }),
      });
    },
    onSuccess: () => {
      queryClient.setQueryData<Recipe | null>(["recipe", id], (prev) =>
        prev
          ? {
              ...prev,
              isFavorite: !prev.isFavorite,
            }
          : null,
      );
    },
  });

  return (
    <Button
      variant="secondary"
      className={`transition-colors ${recipe.isFavorite ? "bg-red-50 hover:bg-red-100" : ""}`}
      onClick={() => mutate()}
    >
      {recipe.isFavorite ? (
        <BsHeartFill size="12" className="mr-2 text-red-500" />
      ) : (
        <BsHeart size="12" className="mr-2" />
      )}
      {recipe.isFavorite ? "Unfavorite" : "Favorite"}
    </Button>
  );
};

export default ChangeFavorite;

import { request } from "@/api/request";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import { Recipe } from "@/types/globals";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { useMutation, useQueryClient } from "react-query";

interface Props {
  recipe: Recipe;
  id?: string;
}

const ChangeFavorite = ({ recipe, id }: Props) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: () => {
      return request.post(`Recipes/favorite/${id}`, {
        json: { favorite: recipe && recipe.isFavorite },
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
      disabled={isLoading}
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

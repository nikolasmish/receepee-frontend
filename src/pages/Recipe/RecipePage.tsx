import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import { FullLayout } from "@/layouts";
import { Recipe } from "@/types/globals";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";

const RecipePage = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const {
    data: recipe,
    isLoading,
    isError,
  } = useQuery<Recipe>(["recipe", id], () =>
    fetch(`/api/Recipes/${id}`).then((res) => res.json()),
  );

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
    <FullLayout>
      {isError && <p>Doslo je do greske pri ucitavanju.</p>}
      {isLoading && <Spinner />}
      {recipe && (
        <>
          <div className="flex gap-4">
            <h1 className="text-4xl font-bold mb-8 flex ">{recipe.title} </h1>
            <Button variant="secondary" onClick={() => mutate()}>
              {recipe.isFavorite ? (
                <BsHeartFill size="12" className="mr-2 text-red-500" />
              ) : (
                <BsHeart size="12" className="mr-2" />
              )}
              {recipe.isFavorite ? "Remove from favorites" : "Add to favorites"}
            </Button>
          </div>
          <div className="w-[650px] mb-4">
            <AspectRatio ratio={16 / 9}>
              <img
                src={recipe.image}
                className="rounded-md object-cover w-full h-full"
              />
            </AspectRatio>
          </div>
          <h2 className="text-2xl font-bold mb-2">Sastojci:</h2>
          <ul className="mb-2">
            {recipe.ingredients &&
              recipe.ingredients.map((i) => (
                <li>
                  <span>{i.quantity}x</span>
                  {i.name}
                </li>
              ))}
          </ul>
          <h2 className="text-2xl font-bold mb-2">Nacin pripreme:</h2>
          <div
            className="prose prose-sm sm:prose lg:prose-md xl:prose-lg"
            dangerouslySetInnerHTML={{ __html: recipe.content }}
          />
        </>
      )}
    </FullLayout>
  );
};

export default RecipePage;

import Spinner from "@/components/ui/spinner";
import { FullLayout } from "@/layouts";
import { Recipe } from "@/types/globals";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Ingredients from "./components/Ingredients";
import ChangeFavorite from "./components/ChangeFavorite";
import DeleteRecipe from "./components/DeleteRecipe";
import { BsClock } from "react-icons/bs";

const RecipePage = () => {
  const { id } = useParams();
  const {
    data: recipe,
    isLoading,
    isError,
  } = useQuery<Recipe>(["recipe", id], () =>
    fetch(`/api/Recipes/${id}`).then((res) => res.json()),
  );

  return (
    <FullLayout>
      {isError && <p>There was an error loading that recipe.</p>}
      {isLoading && <Spinner />}
      {recipe && (
        <div className="flex gap-4">
          <div>
            <div className="flex gap-4 items-center mb-8">
              <h1 className="text-4xl font-bold flex ">{recipe.title}</h1>
              <span className="flex items-center">
                <BsClock size="16" className="mr-2" />{" "}
                {recipe.prepareTimeInMinutes} min
              </span>
              <ChangeFavorite recipe={recipe} id={id} />
              <DeleteRecipe id={id} />
            </div>
            <div className="w-[650px] mb-4">
              <AspectRatio ratio={16 / 9}>
                <img
                  src={recipe.image}
                  className="rounded-md object-cover w-full h-full"
                />
              </AspectRatio>
            </div>
            <div
              className="prose prose-sm sm:prose lg:prose-md xl:prose-lg"
              dangerouslySetInnerHTML={{ __html: recipe.content }}
            />
          </div>
          <Ingredients className="mt-16" recipe={recipe} />
        </div>
      )}
    </FullLayout>
  );
};

export default RecipePage;

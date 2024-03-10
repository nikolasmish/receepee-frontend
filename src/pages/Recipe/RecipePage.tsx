import Spinner from "@/components/ui/spinner";
import { FullLayout } from "@/layouts";
import { Recipe } from "@/types/globals";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

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
      {isError && <p>Doslo je do greske pri ucitavanju.</p>}
      {isLoading && <Spinner />}
      {recipe && (
        <>
          <h1 className="text-4xl font-bold mb-8">{recipe.title}</h1>
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

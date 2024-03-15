import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import RecipeCard from "@/components/recipes/RecipeCard";
import { Recipe } from "@/types/globals";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { request } from "@/api/request";
import { Skeleton } from "@/components/ui/skeleton";

const NewRecipes = () => {
  const { data, isLoading, isError } = useQuery<Recipe[]>("newRecipes", () =>
    request("Recipes/new").json<Recipe[]>(),
  );

  return (
    <div>
      <h2 className="text-4xl font-bold mb-4">New Recipes</h2>
      <div>
        {isError && !isLoading && (
          <p>There was an error loading new recipes.</p>
        )}

        <Carousel className="ml-8 mr-8 mb-2">
          <CarouselContent className="-ml-1">
            {data &&
              !isLoading &&
              !isError &&
              data.map((r, index) => (
                <CarouselItem
                  className="pl-1 md:basis-1/2 lg:basis-1/3 xl:basis-1/4 2xl:basis-1/5 p-4"
                  key={index}
                >
                  <Link
                    to={`recipe/${r.id}`}
                    className="flex items-center justify-center"
                  >
                    <RecipeCard recipe={r} />
                  </Link>
                </CarouselItem>
              ))}
            {isLoading &&
              !isError &&
              Array.from(Array(5).keys()).map((_, index) => (
                <CarouselItem
                  className="pl-1 md:basis-1/2 lg:basis-1/3 xl:basis-1/4 2xl:basis-1/5 p-4"
                  key={index}
                >
                  <Skeleton className="h-[300px] w-[250px] rounded-xl" />
                </CarouselItem>
              ))}
          </CarouselContent>
          {(data || isLoading) && (
            <>
              <CarouselPrevious />
              <CarouselNext />
            </>
          )}
        </Carousel>
      </div>
    </div>
  );
};

export default NewRecipes;

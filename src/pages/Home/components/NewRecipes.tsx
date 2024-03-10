import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import RecipeCard from "./RecipeCard";
import { Recipe } from "@/types/globals";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import Spinner from "@/components/ui/spinner";

const NewRecipes = () => {
  const { data, isLoading, isError } = useQuery<Recipe[]>("newRecipes", () =>
    fetch("/api/Recipes/new").then((res) => res.json()),
  );

  return (
    <div>
      <h2 className="text-4xl font-bold mb-4">New Recipes</h2>
      <div>
        {isLoading && <Spinner />}
        {isError && <p>There was an error loading new recipes.</p>}
        <Carousel className="ml-8 mr-8 mb-2">
          <CarouselContent className="-ml-1">
            {data && !isLoading ? (
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
              ))
            ) : (
              <p>There was an error getting new recipes</p>
            )}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

export default NewRecipes;

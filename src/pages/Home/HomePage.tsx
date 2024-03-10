import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Spinner from "@/components/ui/spinner";
import { FullLayout } from "@/layouts";
import { Recipe } from "@/types/globals";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import RecipeCard from "./components/RecipeCard";

const HomePage = () => {
  const { data, isLoading, isError } = useQuery<Recipe[]>("recipes", () =>
    fetch("/api/Recipes").then((res) => res.json()),
  );

  return (
    <FullLayout>
      <h2 className="text-4xl font-bold mb-4">New Recipes</h2>
      <div>
        <Carousel>
          <CarouselContent className="-ml-1">
            {data &&
              data.slice(0, 5).map((r, index) => (
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
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <h2 className="text-4xl font-bold mb-4">All Recipes</h2>
      {data && (
        <div className="flex flex-col gap-4">
          {data.map((i) => (
            <Link to={`/recipe/${i.id}`} key={i.id}>
              {i.title}
            </Link>
          ))}
        </div>
      )}
      {isError && <p>Doslo je do greske pri ucitavanju.</p>}
      {isLoading && <Spinner />}
    </FullLayout>
  );
};

export default HomePage;

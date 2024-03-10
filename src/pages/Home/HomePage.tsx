import Spinner from "@/components/ui/spinner";
import { FullLayout } from "@/layouts";
import { Recipe } from "@/types/globals";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import NewRecipes from "./components/NewRecipes";

const HomePage = () => {
  const { data, isLoading, isError } = useQuery<Recipe[]>("recipes", () =>
    fetch("/api/Recipes").then((res) => res.json()),
  );

  return (
    <FullLayout>
      <NewRecipes />
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
      {isError && <p>There was an error getting all recipes.</p>}
      {isLoading && <Spinner />}
    </FullLayout>
  );
};

export default HomePage;

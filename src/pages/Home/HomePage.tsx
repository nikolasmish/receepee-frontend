import Spinner from "@/components/ui/spinner";
import { Recipe } from "@/types/globals";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import NewRecipes from "./components/NewRecipes";
import { request } from "@/api/request";

const HomePage = () => {
  const { data, isLoading, isError } = useQuery<Recipe[]>("recipes", () =>
    request("Recipes").json<Recipe[]>(),
  );

  return (
    <div>
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
      {isError && <p>There was an error loading all recipes.</p>}
      {isLoading && <Spinner />}
    </div>
  );
};

export default HomePage;

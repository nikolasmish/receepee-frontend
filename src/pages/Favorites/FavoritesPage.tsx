import Spinner from "@/components/ui/spinner";
import { Recipe } from "@/types/globals";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { request } from "@/api/request";

const FavoritesPage = () => {
  const {
    data: favorites,
    isLoading,
    isError,
  } = useQuery<Recipe[]>("favorites", () =>
    request(`Recipes/favorites`).json<Recipe[]>(),
  );

  return (
    <div>
      {isError && <p>There was an error loading favorite recipes.</p>}
      {isLoading && <Spinner />}
      {favorites && (
        <div className="flex flex-col gap-4">
          <div>
            <Breadcrumb className="mb-4">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Favorites</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <h2 className="text-4xl font-bold mb-4">Favorites</h2>
          </div>
          <div>
            {favorites.map((f) => (
              <Button asChild variant="link">
                <Link to={`/recipe/${f.id}`}>{f.title}</Link>
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;

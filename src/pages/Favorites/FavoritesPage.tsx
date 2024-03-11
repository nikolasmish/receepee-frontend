import Spinner from "@/components/ui/spinner";
import { FullLayout } from "@/layouts";
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

const FavoritesPage = () => {
  const {
    data: favorites,
    isLoading,
    isError,
  } = useQuery<Recipe[]>("favorites", () =>
    fetch(`/api/Recipes/favorites`).then((res) => res.json()),
  );

  return (
    <FullLayout>
      {isError && <p>There was an error loading that recipe.</p>}
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
            <h2 className="text-4xl font-bold mb-4">All Recipes</h2>
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
    </FullLayout>
  );
};

export default FavoritesPage;
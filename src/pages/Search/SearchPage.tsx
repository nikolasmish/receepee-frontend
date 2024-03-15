import { request } from "@/api/request";
import { Recipe } from "@/types/globals";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "@uidotdev/usehooks";
import Spinner from "@/components/ui/spinner";
import RecipeCard from "@/components/recipes/RecipeCard";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const [debouncedParams] = useDebounce([searchParams], 500);

  const searchParam = debouncedParams.get("q") ?? "";

  const { data, isFetching, isPlaceholderData } = useQuery<
    Recipe[] | undefined
  >(
    ["searchRecipes", searchParam],
    () => {
      if (searchParam.length < 2) return;
      return request("Recipes/search", {
        searchParams: { q: searchParam },
      }).json<Recipe[]>();
    },
    {
      placeholderData: [],
      enabled: searchParam.length > 2,
      refetchOnWindowFocus: false,
    },
  );

  console.log(isFetching);

  return (
    <div>
      {isPlaceholderData && <p>Find recipes by using the search bar above.</p>}
      <div className="grid gap-4 xl:grid-cols-3 lg:grid-cols-2 ">
        {data &&
          data.length > 0 &&
          !isFetching &&
          data.map((i) => <RecipeCard recipe={i} />)}
      </div>
      {isFetching && <Spinner />}
    </div>
  );
};

export default SearchPage;

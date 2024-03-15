import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Recipe } from "@/types/globals";
import { TooltipPortal } from "@radix-ui/react-tooltip";
import dayjs from "dayjs";
import { BsHeartFill } from "react-icons/bs";

interface Props {
  recipe: Recipe;
}

const RecipeCard = ({ recipe }: Props) => {
  return (
    <div className="group relative overflow-hidden m-0 flex h-72 w-96 rounded-xl shadow-lg ring-gray-900/5 sm:mx-auto sm:max-w-lg">
      <div
        aria-hidden="true"
        className="z-20 inset-0 absolute aspect-video mt-auto top-[135%] duration-300 bg-gradient-to-b from-black white to-black dark:from-white dark:to-white blur-2xl opacity-45"
      ></div>
      <div className="z-10 h-full w-full overflow-hidden rounded-xl border border-gray-200 opacity-80 transition duration-300 ease-in-out group-hover:opacity-100 dark:border-gray-700 dark:opacity-70">
        <img
          src={recipe.image}
          className="animate-fade-in block h-full w-full scale-100 transform object-cover object-center opacity-100 transition duration-300 group-hover:scale-110 group-hover:brightness-75"
          alt="Recipe Image"
        />
      </div>
      {recipe.isFavorite && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className="absolute top-0 right-0 z-20 m-0 pt-4 pe-4">
                <div className="p-2 bg-gray-50 rounded-full">
                  <BsHeartFill size="20" className="text-red-500 h-3 w-3" />
                </div>
              </div>
            </TooltipTrigger>
            <TooltipPortal>
              <TooltipContent>
                <p>In favorites</p>
              </TooltipContent>
            </TooltipPortal>
          </Tooltip>
        </TooltipProvider>
      )}

      <div className="absolute bottom-0 z-20 m-0 pb-4 ps-4 transition duration-300 ease-in-out group-hover:-translate-y-1 group-hover:translate-x-3 group-hover:scale-110 ">
        <h4 className="text-2xl font-bold text-white">{recipe.title}</h4>
        <p className="text-sm font-light text-gray-200">
          {dayjs(recipe.dateAdded).format("DD. MMM YYYY")}
        </p>
      </div>
    </div>
  );
};

export default RecipeCard;

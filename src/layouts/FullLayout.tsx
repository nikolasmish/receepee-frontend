import { Link, Outlet, useNavigate, useSearchParams } from "react-router-dom";
import { BsFiles, BsFilePlus, BsCart, BsHeart, BsSearch } from "react-icons/bs";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const FullLayout = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("q") || "");

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    if (e.target.value.length < 3) return;
    navigate(`/search?q=${e.target.value}`);
  };

  return (
    <main>
      <div className="sm:ml-64 p-4 px-8">
        <div className="relative h-10 w-1/3">
          <BsSearch className="absolute left-3 top-1/2 transform -translate-y-[60%] text-gray-500 z-10" />
          <Input
            onChange={onSearch}
            value={search}
            type="search"
            placeholder="Find recipe"
            className="pl-10"
          />
        </div>
      </div>
      <div className="px-8 sm:ml-64">
        <Outlet />
      </div>

      <div className="bg-white dark:bg-slate-900">
        <aside
          id="sidebar"
          className="fixed left-0 top-0 z-40 h-screen w-64 transition-transform"
          aria-label="Sidebar"
        >
          <div className="flex h-full flex-col overflow-y-auto border-r border-slate-200 bg-white px-3 py-4 dark:border-slate-700 dark:bg-slate-900">
            <div className="mb-10 flex items-center rounded-lg px-3 py-2 text-slate-900 dark:text-white">
              <svg
                className="h-5 w-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
              </svg>
              <span className="ml-3 text-base font-semibold">Receepee</span>
            </div>
            <ul className="space-y-2 text-sm font-medium">
              <li>
                <Link
                  to="/"
                  className="flex items-center rounded-lg px-3 py-2 text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700"
                >
                  <BsFiles size="20" />
                  <span className="ml-3 flex-1 whitespace-nowrap">Recipes</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/favorites"
                  className="flex items-center rounded-lg px-3 py-2 text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700"
                >
                  <BsHeart size="20" />
                  <span className="ml-3 flex-1 whitespace-nowrap">
                    Favorites
                  </span>
                </Link>
              </li>

              <li>
                <Link
                  to="/cart"
                  className="flex items-center rounded-lg px-3 py-2 text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700"
                >
                  <BsCart size="20" />
                  <span className="ml-3 flex-1 whitespace-nowrap">Cart</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/new-recipe"
                  className="flex items-center rounded-lg px-3 py-2 text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700"
                >
                  <BsFilePlus size="20" />
                  <span className="ml-3 flex-1 whitespace-nowrap">
                    Add Recipe
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default FullLayout;

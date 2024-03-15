import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "@/components/ui/toaster";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  HomePage,
  NewRecipe,
  RecipePage,
  FavoritesPage,
  CartPage,
  SearchPage,
} from "./pages";

import "./index.css";
import { FullLayout as Root } from "./layouts";

const client = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "recipe/:id",
        element: <RecipePage />,
      },
      {
        path: "new-recipe",
        element: <NewRecipe />,
      },
      {
        path: "favorites",
        element: <FavoritesPage />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <RouterProvider router={router} />
      <Toaster />
    </QueryClientProvider>
  </React.StrictMode>,
);

import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "@/components/ui/toaster";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage, NewRecipe, RecipePage, FavoritesPage } from "./pages";

import "./index.css";
import { CartPage } from "./pages/Cart";

const client = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
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
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <RouterProvider router={router} />
      <Toaster />
    </QueryClientProvider>
  </React.StrictMode>,
);

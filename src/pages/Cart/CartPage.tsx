import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { FullLayout } from "@/layouts";
import { useCartStore } from "@/store/cartStore";
import { BsTrash } from "react-icons/bs";
import { Link } from "react-router-dom";
import Ingredient from "./components/Ingredient";

const CartPage = () => {
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  console.log(cart);

  return (
    <FullLayout>
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Cart</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-4xl font-bold mb-4">Cart</h1>

      {cart.length > 0 ? (
        cart.map((c) => (
          <div key={c.id}>
            <div className="flex">
              <h2 className="text-2xl font-bold mb-2 mr-2">{c.title}</h2>
              <Button
                variant="destructive"
                className="h-8 w-8 p-0 flex items-center justify-center"
              >
                <BsTrash onClick={() => removeFromCart(c)} />
              </Button>
            </div>
            {c.ingredients ? (
              <ul className="mb-4">
                {c.ingredients.map((i) => (
                  <Ingredient ingredient={i} recipeId={c.id} />
                ))}
              </ul>
            ) : (
              <p>
                No ingredients found for this recipe.{" "}
                <Button variant="link">Remove from list?</Button>
              </p>
            )}
          </div>
        ))
      ) : (
        <p>
          There are no recipes found in your cart.{" "}
          <Link
            to="/"
            className="underline underline-offset-4 hover:text-purple-600 transition-colors"
          >
            Add some recipes
          </Link>{" "}
          to show them here.
        </p>
      )}
    </FullLayout>
  );
};

export default CartPage;

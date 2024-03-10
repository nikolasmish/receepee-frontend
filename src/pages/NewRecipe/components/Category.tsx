import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { Category as TCategory } from "@/types/globals";

const Category = () => {
  const form = useFormContext();

  const { data } = useQuery<TCategory[]>("categories", () =>
    fetch("/api/Recipes/category").then((data) => data.json()),
  );

  return (
    <FormField
      control={form.control}
      name="category"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Category</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {data &&
                data.map((i) => (
                  <SelectItem key={i.id} value={i.name}>
                    {i.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
          <FormDescription>
            Category missing?{" "}
            <Link to="#" className="underline underline-offset-4">
              Add new
            </Link>
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default Category;

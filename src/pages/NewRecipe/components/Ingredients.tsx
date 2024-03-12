import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFieldArray, useFormContext } from "react-hook-form";
import { BsTrash } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";

const Ingredients = () => {
  const form = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control: form.control, // control props comes from useForm (optional: if you are using FormContext)
    name: "ingredients", // unique name for your Field Array
  });

  return (
    <div className="flex flex-col gap-4">
      {fields.map((field, index) => {
        return (
          <div key={field.id} className="flex gap-2">
            <FormField
              control={form.control}
              name={`ingredients.${index}.name`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ingredient {index + 1}</FormLabel>
                  <FormControl>
                    <div className="relative h-10">
                      {index !== 0 && (
                        <BsTrash
                          className="absolute right-3 top-1/2 transform -translate-y-[60%] text-gray-500 z-10 hover:bg-red-200 rounded-full"
                          onClick={() => remove(index)}
                        />
                      )}
                      <Input
                        placeholder="Find recipe"
                        className="pr-10"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );
      })}
      <Button
        variant="secondary"
        type="button"
        className="mr-auto"
        onClick={() => append({ name: "", quantity: 1 })}
      >
        <FaPlus className="mr-2" size="10" /> Add more ingredients
      </Button>
    </div>
  );
};

export default Ingredients;

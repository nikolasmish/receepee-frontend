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
import { FaMinus, FaPlus } from "react-icons/fa";

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
              name={`ingredients.${index}.quantity`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ingredient {index + 1}</FormLabel>
                  <FormControl>
                    <div className="flex gap-1 items-center">
                      <Button
                        type="button"
                        onClick={() => field.onChange(field.value - 1)}
                        variant="ghost"
                        size="icon"
                        disabled={field.value <= 1}
                      >
                        <FaMinus size="8" />
                      </Button>

                      {field.value}
                      <Button
                        type="button"
                        onClick={() => field.onChange(field.value + 1)}
                        variant="ghost"
                        size="icon"
                      >
                        <FaPlus size="8" />
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`ingredients.${index}.name`}
              render={({ field }) => (
                <FormItem className="mt-auto">
                  <FormLabel></FormLabel>
                  <FormControl>
                    <Input
                      className="!mt-0 h-10"
                      placeholder="Ingredient Name"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              className="mt-auto"
              type="button"
              size="icon"
              onClick={() => remove(index)}
              variant="destructive"
            >
              <BsTrash />
            </Button>
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

import { FullLayout } from "@/layouts";
import { useMutation } from "react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ContentEditor from "./components/ContentEditor";
import Ingredients from "./components/Ingredients";
import Category from "./components/Category";
import { compressImageAndConvertToBase64 } from "./utils";
import { toast } from "@/components/ui/use-toast";
import Spinner from "@/components/ui/spinner";
import { ToastAction } from "@/components/ui/toast";

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const ingredientsSchema = z.object({
  name: z.string(),
  quantity: z.number(),
});

const FormSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
  content: z.string().min(20, { message: "Content is too short!" }),
  image: z
    .instanceof(FileList)
    .refine(
      (file) =>
        ACCEPTED_IMAGE_TYPES.includes(
          file && file.item(0) && (file.item(0)?.type as any),
        ),
      "Only .jpg, .jpeg, .png and .webp formats are supported.",
    ),
  ingredients: z.array(ingredientsSchema),
  category: z.string(),
});

const NewRecipe = () => {
  const navigate = useNavigate();
  const { mutate, isLoading, isSuccess } = useMutation({
    retry: 3,
    mutationFn: (recipe) => {
      return fetch("/api/Recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipe),
      });
    },
    onSuccess: () => {
      toast({
        title: "Recipe created successfully ",
        description: "You will be redirected soon.",
      });
      setTimeout(() => navigate("/"), 1500);
    },
    onError: (data) => {
      toast({
        title: "Failed to create recipe",
        description: "There was an error creating a recipe, please try again.",
        action: (
          <ToastAction altText="Try again" onClick={() => mutate(data)}>
            Try again
          </ToastAction>
        ),
      });
    },
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      ingredients: [{ name: "jaja", quantity: 2 }],
    },
  });
  const imageRef = form.register("image");

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    const compressedBase64Image = await compressImageAndConvertToBase64(
      data.image.item(0),
    );
    const apiData = {
      ...data,
      image: compressedBase64Image,
      category: { name: data.category },
    };
    mutate(apiData as any);
    console.log(await compressImageAndConvertToBase64(data.image.item(0)));
  }

  return (
    <FullLayout>
      {isLoading ||
        (isSuccess && (
          <div className="absolute w-screen h-screen bg-gray-50 top-0 bottom-0 left-0 right-0 z-30  flex items-center justify-center opacity-75">
            <Spinner className="opacity-100 sm:ml-64" />
          </div>
        ))}
      <h1 className="text-4xl font-bold mb-4">Add new recipe</h1>

      <FormProvider {...form}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 space-y-6"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Recipe name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Category />
            <FormField
              control={form.control}
              name="image"
              render={() => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input placeholder="Image" type="file" {...imageRef} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <ContentEditor {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Ingredients />

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </FormProvider>
    </FullLayout>
  );
};

export default NewRecipe;

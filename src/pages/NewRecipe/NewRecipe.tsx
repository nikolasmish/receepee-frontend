import { FullLayout } from "@/layouts";
import { useMutation } from "react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
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
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { request } from "@/api/request";

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

type MutateData = {
  image: string;
  category: {
    name: string;
  };
  title: string;
  instructions: string;
  ingredients: {
    name: string;
  }[];
};

const ingredientsSchema = z.object({
  name: z
    .string()
    .min(4, { message: "Add more context (eg. a dozen of eggs, 150g butter)" }),
});

const FormSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
  instructions: z.string().min(20, { message: "Instructions are too short!" }),
  image: z
    .instanceof(FileList)
    .refine((file) => file.length !== 0, "Image is required.")
    .refine((file) => {
      const imageFile = file.item(0);

      if (!imageFile) return false;

      return ACCEPTED_IMAGE_TYPES.includes(imageFile.type);
    }, "Only .jpg, .jpeg, .png and .webp formats are supported."),
  ingredients: z
    .array(ingredientsSchema)
    .min(1, { message: "Minimum 1 ingredient is required." }),
  category: z.string(),
});

const NewRecipe = () => {
  const navigate = useNavigate();
  const { mutate, isLoading, isSuccess } = useMutation({
    retry: 2,
    mutationFn: async (recipe: MutateData) => {
      console.log("called");
      return await request.post("Recipes", {
        json: recipe,
      });
    },
    onSuccess: () => {
      toast({
        title: "Recipe created successfully ",
        description: "You will be redirected soon.",
      });
      setTimeout(() => navigate("/"), 1500);
    },
    onError: (data: MutateData) => {
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
      ingredients: [{ name: "3 whole eggs & 1 egg yolk" }],
    },
  });
  const imageRef = form.register("image");

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const compressedBase64Image = await compressImageAndConvertToBase64(
      data.image.item(0),
    );
    const apiData: MutateData = {
      ...data,
      image: compressedBase64Image,
      category: { name: data.category },
    };
    mutate(apiData);
  }

  return (
    <FullLayout withSearch={false}>
      {isLoading ||
        (isSuccess && (
          <div className="absolute w-screen h-screen bg-gray-50 top-0 bottom-0 left-0 right-0 z-30  flex items-center justify-center opacity-75">
            <Spinner className="opacity-100 sm:ml-64" />
          </div>
        ))}
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>New Recipe</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
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
              name="instructions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instructions</FormLabel>
                  <FormControl>
                    <ContentEditor {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Ingredients />

            <Button type="submit" disabled={isLoading}>
              Submit
            </Button>
          </form>
        </Form>
      </FormProvider>
    </FullLayout>
  );
};

export default NewRecipe;

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { BsTrash } from "react-icons/bs";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

interface Props {
  id?: string;
}

const DeleteRecipe = ({ id }: Props) => {
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation({
    mutationFn: () => {
      return fetch(`/api/Recipes/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    onSuccess: () => {
      toast({
        title: "Recipe deleted successfully ",
        description: "You will be redirected soon.",
      });
      setTimeout(() => navigate("/"), 1500);
    },
  });

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="destructive">
            <BsTrash size="12" className="mr-2" /> Remove recipe
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-2">
              Are you sure you want to remove this recipe?
            </DialogTitle>
            <DialogDescription>
              <p>
                This action cannot be undone. This will permanently remove this
                recipe.
              </p>
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-2 ml-auto">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
            <Button
              variant="destructive"
              disabled={isLoading}
              onClick={() => mutate()}
            >
              Remove
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteRecipe;

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { BsTrash } from "react-icons/bs";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

interface Props {
  id?: string;
}

const DeleteRecipe = ({ id }: Props) => {
  const navigate = useNavigate();

  const { mutate } = useMutation({
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
    <Button variant="destructive" onClick={() => mutate()}>
      <BsTrash size="12" className="mr-2" /> Remove recipe
    </Button>
  );
};

export default DeleteRecipe;

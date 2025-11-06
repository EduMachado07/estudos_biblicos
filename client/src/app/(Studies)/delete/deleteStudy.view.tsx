import { useDeleteStudyModel } from "./deleteStudy.model";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";
import { DeleteStudyService } from "@/service/implementations/DeleteStudyService";

type DeleteStudyViewProps = ReturnType<typeof useDeleteStudyModel>;

export const DeleteStudyView = (props: DeleteStudyViewProps) => {
  const { deleteStudy, isDeleting,} = props;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Excluir Estudo</Button>
      </DialogTrigger>
      <DialogContent>
        <p>
          Tem certeza que deseja excluir este estudo?
          <br /> Esta ação não pode ser
          desfeita.
        </p>
        <DialogFooter>
          <Button variant="secondary">Cancelar</Button>
          <Button
            variant="destructive"
            onClick={() => deleteStudy()}
            disabled={isDeleting}
          >
            {isDeleting ? "Excluindo..." : "Excluir"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
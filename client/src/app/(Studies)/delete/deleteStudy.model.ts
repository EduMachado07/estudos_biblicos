import { useMutation } from "@tanstack/react-query";
import { DeleteStudyService } from "@/service/implementations/DeleteStudyService";
import { useQueryClient } from "@tanstack/react-query";

type DeleteStudyModelProps = {
  deleteStudyService: DeleteStudyService;
};

export const useDeleteStudyModel = ({
  deleteStudyService,
}: DeleteStudyModelProps) => {
  const queryClient = useQueryClient();

  const { mutate, status } = useMutation(
    async (id: string) => {
      await deleteStudyService.exec(id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("studies");
      },
      onError: () => {
        alert("Erro ao excluir o estudo. Tente novamente.");
      },
    }
  );

  return { deleteStudy: mutate, status };
};
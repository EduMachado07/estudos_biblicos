import { DeleteStudyView } from "./deleteStudy.view";
import { useDeleteStudyModel } from "./deleteStudy.model";
import { DeleteStudyService } from "@/service/implementations/DeleteStudyService";

export const DeleteStudyPage = (id: string) => {
  const deleteStudyService = new DeleteStudyService();
  const methods = useDeleteStudyModel({
    deleteStudyService,
  });

  return <DeleteStudyView {...methods} />;
};
import { useCreateStudiesModel } from "./createStudies.model";
import { CreateStudiesView } from "./createStudies.view";

export const CreateStudyPage = () => {
  const methods = useCreateStudiesModel()
  return <CreateStudiesView {...methods}/>;
};

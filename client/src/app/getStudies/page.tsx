import { useGetStudiesModel } from "./getStudies.model";
import { GetStudiesView } from "./getStudies.view";

type GetStudiesPageProps = ReturnType<typeof useGetStudiesModel>;

export const GetStudiesPage = (props: GetStudiesPageProps) => {
  return <GetStudiesView {...props} />;
};


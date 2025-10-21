import type { IGetStudyBySlugService } from "@/service/IStudyService";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

type GetStudyModelProps = {
  getStudyBySlugService: IGetStudyBySlugService;
};

export const useGetStudyBySlugModel = ({
  getStudyBySlugService,
}: GetStudyModelProps) => {
  const params = useParams();
  const slug = params["*"];

  console.log(slug)

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["study", slug],
    queryFn: async () => {
      if (!slug) {
        throw new Error("Slug não encontrado na URL");
      }
      return await getStudyBySlugService.exec(slug);
    },
    enabled: !!slug,
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });

  return {
    study: data,
    isLoading,
    error,
    refetch,
  };
};

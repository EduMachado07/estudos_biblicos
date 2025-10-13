import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SchemaCreateStudies,
  type SchemaCreateStudiesType,
} from "./createStudies.schema";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { ICreateStudyService } from "@/service/IStudyService";

type CreateStudyModelProps = {
  createStudyService: ICreateStudyService
}

export const useCreateStudiesModel = ({createStudyService}: CreateStudyModelProps) => {
  const form = useForm<SchemaCreateStudiesType>({
    resolver: zodResolver(SchemaCreateStudies),
    defaultValues: {
      title: "",
      description: "",
      body: "",
      tag: "",
    }
  });

  const { mutate } = useMutation<
    void,
    AxiosError<{ message: string; details: string }>,
    FormData
  >({
    mutationFn: async (formData) => {
      await createStudyService.exec(formData);
    },
    onError: (error) => {
      // Captura erros da API
      if (error.response) {
        console.error("Erro da API:", error.response.data.message);
        console.error("Erro da API:", error.response.data);
      } else {
        console.error("Erro de rede ou outro:", error.message);
      }
    },
    onSuccess: (data) => console.log(data),
  });

  const onSubmit = (data: SchemaCreateStudiesType & {thumbnail: File}) => {
    const study = new FormData();
    study.append("thumbnail", data.thumbnail);
    study.append("title", data.title);
    study.append("description", data.description);
    study.append("body", data.body);
    study.append("tag", data.tag);
    console.log(study);
    mutate(study);
  };

  return {
    onSubmit,
    form,
  };
};

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  SchemaUpdateStudy,
  type SchemaUpdateStudyType,
} from "./updateStudy.schema";
import type {
  IGetStudyBySlugService,
  IUpdateStudyService,
} from "@/service/IStudyService";
import type { AxiosError } from "axios";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router";
import { useEffect, useRef, useState } from "react";

type UpdateStudyModelProps = {
  getStudyBySlugService: IGetStudyBySlugService;
  updateStudyService: IUpdateStudyService;
};

export const useUpdateStudyModel = ({
  getStudyBySlugService,
  updateStudyService,
}: UpdateStudyModelProps) => {
  const params = useParams<string>();
  const slug = params["*"];
  const queryClient = useQueryClient();
  const form = useForm<SchemaUpdateStudyType>({
    resolver: zodResolver(SchemaUpdateStudy),
    defaultValues: {
      title: "",
      description: "",
      body: "",
      tag: "",
    },
  });
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const {
    data,
    status: getStatus,
    refetch,
  } = useQuery({
    queryKey: ["study", slug],
    queryFn: async () => {
      if (!slug) {
        throw new Error("Slug não encontrado na URL");
      }
      try {
        return await getStudyBySlugService.exec(slug);
      } catch (error) {
        toast.error("Erro ao obter estudo. " + error, {
          id: "get-study",
        });
      }
    },
    enabled: !!slug,
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (data) {
      form.reset({
        title: data.title || "",
        description: data.description || "",
        body: data.body || "",
        tag: data.tag ?? "",
      });

      if (data?.thumbnailUrl) {
        setPreview(data.thumbnailUrl);
      }
    }
  }, [data]);

  const { mutate } = useMutation<
    void,
    AxiosError<{ message: string; details: string }>,
    FormData
  >({
    mutationFn: async (formData) => {
      await updateStudyService.exec(data?.id || "", formData);
    },

    onMutate: () => {
      toast.loading("Atualizando estudo...", { id: "update-study" });
    },

    onError: (error) => {
      if (error.response) {
        toast.error(
          "Erro ao atualizar estudo: " + error.response.data.message,
          {
            id: "update-study",
          }
        );
      } else {
        toast.error("Erro ao atualizar estudo. Tente novamente.", {
          id: "update-study",
        });
      }
    },

    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["studiesAuthor"] }),
        queryClient.invalidateQueries({ queryKey: ["study", slug] }),
      ]);
      
      toast.success("Estudo atualizado com sucesso!", {
        id: "update-study",
        duration: 1500,
        onAutoClose: () => navigate("/profile"),
      });
    },
  });

  const onSubmit = (data: SchemaUpdateStudyType & { thumbnail?: File }) => {
    const study = new FormData();

    if (data.thumbnail) {
      study.append("thumbnail", data.thumbnail);
    }

    study.append("title", data.title || "");
    study.append("description", data.description || "");
    study.append("body", data.body || "");
    study.append("tag", data.tag || "");

    mutate(study);
  };

  return {
    form,
    data,
    refetch,
    getStatus,
    onSubmit,
    inputRef,
    preview,
    setPreview,
  };
};

import type { IGetStudyBySlugService } from "@/service/IStudyService";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import type { ITagFilters } from "../get/getStudies.type";
import { useState } from "react";

type GetStudyModelProps = {
  getStudyBySlugService: IGetStudyBySlugService;
};

export const useGetStudyBySlugModel = ({
  getStudyBySlugService,
}: GetStudyModelProps) => {
  const params = useParams();
  const slug = params["*"];

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

  const tagFilters: ITagFilters[] = [
    {
      tag: "Todas as tags",
      color: "bg-gray-500/20",
      borderColor: "border border-zinc-800",
      textColor: "text-zinc-900",
    },
    {
      tag: "salvacao",
      color: "bg-red-600/20",
      borderColor: "border border-red-700",
      textColor: "text-red-700",
    },
    {
      tag: "espírito santo",
      color: "bg-yellow-600/20",
      borderColor: "border border-yellow-700",
      textColor: "text-yellow-700",
    },
    {
      tag: "cura",
      color: "bg-blue-600/20",
      borderColor: "border border-blue-700",
      textColor: "text-blue-700",
    },
    {
      tag: "apocalipse",
      color: "bg-purple-600/20",
      borderColor: "border border-purple-700",
      textColor: "text-purple-700",
    },
    {
      tag: "família",
      color: "bg-green-600/20",
      borderColor: "border border-green-700",
      textColor: "text-green-700",
    },
  ];

  const getTagStyle = (tag: string) => {
    const tagFilter = tagFilters.find((filter) => filter.tag === tag);
    if (!tagFilter) {
      return {
        bg: "bg-gray-400/20",
        border: "border border-zinc-800",
        text: "text-zinc-800",
      };
    }

    // extrai as classes
    // const bg = tagFilter.color;
    const border = tagFilter.borderColor;
    const text = tagFilter.textColor;

    return { border, text };
  };

  const tagStyle = data?.tag ? getTagStyle(data?.tag) : null;

  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Erro ao copiar link:", err);
    }
  };

  const formatDate = (dateString?: string): string => {
    if (!dateString) return "";

    const date = new Date(dateString);
    const today = new Date();

    const day = date.getDate();
    const month = date.toLocaleString("pt-BR", { month: "long" });
    const year = date.getFullYear();

    const currentYear = today.getFullYear();

    // se for do ano atual, não mostra o ano
    return `${day} de ${month}${year !== currentYear ? ` de ${year}` : ""}`;
  };

  return {
    study: data,
    isLoading,
    error,
    refetch,
    tagStyle,
    copied,
    handleCopyLink,
    formatDate
  };
};

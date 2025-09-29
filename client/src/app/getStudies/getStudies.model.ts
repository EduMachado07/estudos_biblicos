import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import type { IStudies, ITagFilters } from "./getStudies.type";
import { useMemo, useState } from "react";

interface IStudiesResponse {
  data: IStudies[];
  next?: string;
  previous?: string;
}

export const useGetStudiesModel = () => {
  const [selectedTag, setSelectedTag] = useState<string>("Todas as tags");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const fetchStudies = async ({
    pageParam,
  }: {
    pageParam: string;
  }): Promise<IStudiesResponse> => {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // simula delay
    // throw new Error("Erro ao buscar estudos"); // simula erro

    const res = await axios.get("http://localhost:3333" + pageParam);
    // console.log(res.data.studies.data);
    return {
      data: res.data.studies.data,
      next: res.data.studies.next,
      previous: res.data.studies.previous,
    };
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["studies"],
      queryFn: ({ pageParam }) => fetchStudies({ pageParam }),
      initialPageParam: "/study?limit=9",
      getNextPageParam: (lastPage) => lastPage.next || undefined,
    });

  const allStudies: IStudies[] = data?.pages.flatMap((page) => page.data) ?? [];

  const normalize = (s: string) =>
    s
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, ""); // remove diacríticos

  // aplica o filtro
  const filteredStudies = useMemo(() => {
    const nq = normalize(searchTerm).trim();
    return allStudies.filter((study) => {
      const matchTag =
        selectedTag === "Todas as tags" || study.tag === selectedTag;

      const nt = normalize(study.title ?? "");
      const matchSearch = nq === "" || nt.includes(nq);

      return matchTag && matchSearch;
    });
  }, [allStudies, selectedTag, searchTerm]);

  const tagFilters: ITagFilters[] = [
    {
      tag: "Todas as tags",
      color: "hover:bg-gray-500/20",
      borderColor: "border border-zinc-800",
      textColor: "text-zinc-900",
    },
    {
      tag: "Salvação",
      color: "hover:bg-red-600/20",
      borderColor: "border border-red-700",
      textColor: "text-red-700",
    },
    {
      tag: "Espírito Santo",
      color: "hover:bg-yellow-600/20",
      borderColor: "border border-yellow-700",
      textColor: "text-yellow-700",
    },
    {
      tag: "Cura",
      color: "hover:bg-blue-600/20",
      borderColor: "border border-blue-700",
      textColor: "text-blue-700",
    },
    {
      tag: "Apocalipse",
      color: "hover:bg-purple-600/20",
      borderColor: "border border-purple-700",
      textColor: "text-purple-700",
    },
    {
      tag: "Família",
      color: "hover:bg-green-600/20",
      borderColor: "border border-green-700",
      textColor: "text-green-700",
    },
  ];

  return {
    status, // loading/error/success
    selectedTag,
    setSelectedTag,
    searchTerm,
    setSearchTerm,
    tagFilters,
    filteredStudies,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};

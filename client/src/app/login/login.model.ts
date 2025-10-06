import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SchemaLoginUser, type SchemaLoginUserType } from "./login.schema";
import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export const useLoginModel = () => {
  const form = useForm<SchemaLoginUserType>({
    resolver: zodResolver(SchemaLoginUser),
  });

  const [apiError, setApiError] = useState<string | null>(null);

  const { mutate } = useMutation<
    string,
    AxiosError<{ message: string; details: string }>,
    SchemaLoginUserType
  >({
    mutationFn: async (user) => {
      const { data } = await axios.post("http://localhost:3333/login", user);
      return data;
    },
    onError: (error) => {
      console.log(error);
      if (error.response?.data?.message) {
        setApiError(error.response.data.message);
      } else {
        setApiError("Erro inesperado. Tente novamente.");
      }
    },
    onSuccess: (data) => {
      console.log(data);
      setApiError(null);
    },
  });
  
  const onSubmit = (data: SchemaLoginUserType) => {
    console.log(data);
    setApiError(null);
    mutate(data);
  };

  return {
    form,
    onSubmit,
    apiError
  };
};

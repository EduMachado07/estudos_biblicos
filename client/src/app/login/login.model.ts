import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SchemaLoginUser, type SchemaLoginUserType } from "./login.schema";
import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router";
import type { ILoginUserService } from "@/service/IAuthService";

type LoginModelProps = {
  loginUserService: ILoginUserService;
};

export const useLoginModel = ({ loginUserService }: LoginModelProps) => {
  const form = useForm<SchemaLoginUserType>({
    resolver: zodResolver(SchemaLoginUser),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [apiError, setApiError] = useState<string | null>(null);
  const navigate = useNavigate();

  const { mutate } = useMutation<
    string,
    AxiosError<{ message: string; status: string }>,
    SchemaLoginUserType
  >({
    mutationFn: async (user) => {
      const data = await loginUserService.exec(user.email, user.password);
      return data;
    },
    onError: (error) => {
      // console.log(error);
      if (error.response?.data?.message || error.response?.status) {
        setApiError(
          "Erro:" + error.response?.status + " " + error.response.data.message
        );
        setApiError(
          `Erro ${error.response?.status} - ${error.response.data.message}`
        );
      } else {
        setApiError("Erro inesperado. Tente novamente.");
      }
    },
    onSuccess: (data) => {
      // console.log(data);
      setApiError(null);
      navigate("/create");
    },
  });

  const onSubmit = (data: SchemaLoginUserType) => {
    // console.log(data)
    setApiError(null);
    mutate(data);
  };

  return {
    form,
    onSubmit,
    apiError,
  };
};

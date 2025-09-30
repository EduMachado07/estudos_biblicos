import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SchemaCreateStudies } from "./createStudies.schema";
import type { SchemaCreateStudiesType } from "./createStudies.type";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import axios from "axios";

export const CreateStudiesModel = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SchemaCreateStudies),
  });

  const {mutate} = useMutation<string, AxiosError, SchemaCreateStudiesType>({
    mutationFn: async ()=> {
        const {data} = await axios.post('/')
        return data
    },
    onError: () => console.log('erro'),
    onSuccess: (data) => console.log(data)
  })

  const onSubmit = (data: SchemaCreateStudiesType) => {
    console.log(data)
    mutate(data)
};

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
};

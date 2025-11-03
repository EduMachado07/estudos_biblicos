import { useGetStudiesByAuthorModel } from "@/app/(Studies)/getByAuthor/getByAuthor.model";
import { GetStudiesByAuthor } from "@/app/(Studies)/getByAuthor/getByAuthor.view";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useStudiesStore } from "@/context/UserContext";
import { getAllStudiesByAuthorService } from "@/service/implementations/GetStudiesByAuthorService";
import { Link } from "react-router";

export const ProfilePage = () => {
  const getStudiesByAuthor = new getAllStudiesByAuthorService();

  const methods = useGetStudiesByAuthorModel({
    getAllStudiesByAuthorService: getStudiesByAuthor,
  });

  const { author } = useStudiesStore();

  return (
    <>
      <main className="px-[4vw] flex flex-col items-left gap-6">
        <section className="flex justify-between">
          <div className="flex flex-col gap-4">
            <h1 className="font-title text-2xl text-blue-600">
              Perfil de Usuário
            </h1>
            <p className="font-body text-base">
              <span className="font-body-medium">Nome:</span> {author?.name}
            </p>
            <p className="font-body text-base">
              <span className="font-body-medium">Papel:</span> {author?.role}
            </p>
          </div>
          <Link to="/create" className="w-fit self-end">
            <Button size={"lg"}>
              Criar novo estudo
            </Button>
          </Link>
        </section>
        <Separator />

        <GetStudiesByAuthor {...methods} />
      </main>
    </>
  );
};

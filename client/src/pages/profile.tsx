import { useGetStudiesByAuthorModel } from "@/app/(Studies)/getByAuthor/getByAuthor.model";
import { GetStudiesByAuthor } from "@/app/(Studies)/getByAuthor/getByAuthor.view";
import { LogoutPage } from "@/app/logout/page";
import { Button } from "@/components/ui/button";
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
      <main className="flex max-lg:flex-col gap-4">
        <section className="h-fit flex flex-col gap-6 bg-[#fafafa] rounded-sm shadow-md p-4 lg:p-6">
          <div className="space-y-4">
            <h1 className="font-body-medium text-xl">Meus Dados</h1>
            <p className="text-nowrap font-body text-base">
              <span className="font-body-medium">Autor:</span> {author?.name}
            </p>
            <p className="font-body text-base">
              <span className="font-body-medium">Papel:</span> {author?.role}
            </p>
            <p className="font-body text-base">
              <span className="font-body-medium">Total de estudos:</span>{" "}
              {methods.allStudies.length}
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            <LogoutPage />
            <Link to={author ? "/create" : "/login"}>
              <Button size={"lg"} className="w-full">
                Criar novo estudo
              </Button>
            </Link>
          </div>
        </section>

        <GetStudiesByAuthor {...methods} />
      </main>
    </>
  );
};

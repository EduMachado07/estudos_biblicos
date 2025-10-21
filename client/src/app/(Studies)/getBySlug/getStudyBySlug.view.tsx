import thumb from "@/assets/no-image-available-.png";
import { TipTapEditor } from "@/components/TipTap/TipTapEditor";
import type { useGetStudyBySlugModel } from "./getStudyBySlug.model";

type GetStudyBySlugViewProps = ReturnType<typeof useGetStudyBySlugModel>;

export const GetStudyBySlugView = (props: GetStudyBySlugViewProps) => {
  const { error, isLoading, refetch, study } = props;
  return (
    <>
      <main className="flex flex-col items-center gap-8 py-14 px-[4vw] lg:px-[18vw]">
        <section className="w-full flex gap-8 items-start">
          <div className="w-2/6 h-64 overflow-hidden rounded-xs shadow-md">
            <img
              src={thumb}
              alt="Imagem do estudo bíblico"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 flex flex-col gap-3">
            <h1 className="font-title text-4xl text-pretty">
              Firmes na Rocha: Como permanecer inabalável em tempos difíceis
            </h1>

            {/* <p className="text-base font-body-medium border border-red-500 text-red-500/100 w-fit p-0.5 px-4 rounded-sm">
              Salvação
            </p> */}

            <p className="text-gray-600 font-body text-xl leading-relaxed">
              Este estudo bíblico nos conduz a refletir sobre a importância de
              edificar nossa vida sobre a Rocha que é Cristo. Em um mundo de
              incertezas, crises e mudanças constantes, a verdadeira segurança
              está em uma fé sólida e fundamentada na Palavra de Deus.
            </p>

            <p className="font-body text-zinc-950">
              20 de Outubro de 2025 • Tempo de leitura: 1min
            </p>
          </div>
        </section>
        <h1 className="border-l-4 border-blue-500 text-zinc-700 pl-4 py-1 w-full text-left font-body text-xl">
          Escrito por{" "}
          <span className="font-body-medium text-blue-700">
            Eduardo Machado
          </span>
        </h1>
        <section className="w-full">
          <TipTapEditor content="ou" readonly={true} />
        </section>
      </main>
    </>
  );
};

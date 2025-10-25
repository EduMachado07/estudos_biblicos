import { Button } from "@/components/ui/button";
import type { useGetStudiesModel } from "./getStudies.model";
import { StudyCard } from "@/components/StudyCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

type GetStudiesViewProps = ReturnType<typeof useGetStudiesModel>;

export const GetStudiesView = (props: GetStudiesViewProps) => {
  const { filteredStudies, tagFilters, selectedTag, setSelectedTag, status } =
    props;

  return (
    <>
      <section className="flex flex-col gap-6 md:gap-8 my-4">
        <main className="flex gap-4 max-lg:flex-col">
          {/* Filtros */}
          <ScrollArea>
            <section className="w-fit flex lg:flex-col gap-2 whitespace-nowrap mb-3">
              {tagFilters.map((filter, index) => {
                const isActive = selectedTag === filter.tag;
                return (
                  <section
                    key={index}
                    onClick={() => setSelectedTag(filter.tag)}
                    className={`lg:w-45 gap-2 flex justify-between items-center font-body-medium p-2 rounded-sm transition-all duration-200 cursor-pointer 
                    ${filter.color} 
                    ${
                      isActive
                        ? filter.borderColor + " " + filter.textColor
                        : "border border-transparent"
                    }
                  `}
                  >
                    {filter.tag}
                    {isActive && <span>{filteredStudies.length}</span>}
                  </section>
                );
              })}
            </section>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>

          {/* Cards */}
          <section className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
            {status === "pending" &&
              Array.from({ length: 9 }).map((_, index) => (
                <StudyCard.Skeleton key={index} />
              ))}

            {status === "error" && (
              <p className="col-span-full text-center text-xl font-body-medium text-red-600">
                Erro ao carregar os estudos. Tente novamente.
              </p>
            )}

            {status === "success" && (
              <>
                {filteredStudies.map((study) => (
                  <StudyCard.Root key={study.id} slug={study.slug}>
                    <StudyCard.Image image={study.thumbnailUrl} />
                    <StudyCard.Details
                      id={study.id!}
                      title={study.title}
                      tag={study.tag}
                      description={study.description}
                      author={study.author?.name}
                      createdAt={study.createdAt}
                    />
                  </StudyCard.Root>
                ))}
              </>
            )}

            {props.isFetchingNextPage &&
              Array.from({ length: 3 }).map((_, index) => (
                <StudyCard.Skeleton key={index} />
              ))}
          </section>
        </main>

        <Button
          size={"lg"}
          variant={"outline"}
          className="w-fit self-center px-12"
          onClick={() => props.fetchNextPage()}
          disabled={!props.hasNextPage || props.isFetchingNextPage}
        >
          {props.isFetchingNextPage
            ? "Carregando..."
            : props.hasNextPage
            ? "Carregar mais"
            : "Não há mais estudos"}
        </Button>
      </section>
    </>
  );
};

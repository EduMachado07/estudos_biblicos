import { StudyCard } from "@/components/StudyCard";
import type { useGetStudiesByAuthorModel } from "./getByAuthor.model";

type GetStudiesViewProps = ReturnType<typeof useGetStudiesByAuthorModel>;

export const GetStudiesByAuthor = (props: GetStudiesViewProps) => {
  const { allStudies, status } = props;
  return (
    <>
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
            {allStudies.map((study, index) => (
              <StudyCard.Root key={index} slug={`/edit/${study.slug}`}>
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
    </>
  );
};

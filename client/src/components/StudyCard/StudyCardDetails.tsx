interface IStudyCardDetailsProps {
  id: string;
  title: string;
  description: string;
  author: string;
  tag: string;
  //   slug: string;
  createdAt?: string;
}

function formatDate(dateString?: string): string {
  if (!dateString) return "";

  const date = new Date(dateString);
  const today = new Date();

  const day = date.getDate();
  const month = date.toLocaleString("pt-BR", { month: "long" });
  const year = date.getFullYear();

  const currentYear = today.getFullYear();

  // se for do ano atual, não mostra o ano
  return `${day} de ${month}${year !== currentYear ? ` de ${year}` : ""}`;
}

export const StudyCardDetails = ({
  title,
  description,
  author,
  createdAt,
  tag,
}: IStudyCardDetailsProps) => {
  return (
    <section className="h-52 p-4 flex flex-col justify-between bg-[#fafafa]">
      <div className="flex flex-col gap-2">
        <h1 className="capitalize font-title text-xl">{title}</h1>
        <p className="font-body line-clamp-4">{description}</p>
      </div>
      <div className="">
        <hr />
        <div className="flex justify-between mt-1.5">
          <p className="font-body text-sm py-1 px-2 bg-amber-300/70 h-fit rounded-sm">{tag}</p>
          <div className="flex flex-col gap-2">
            <h3 className="font-title text-base self-end">{author}</h3>
            <p className="self-end font-body -mt-1">{formatDate(createdAt)}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

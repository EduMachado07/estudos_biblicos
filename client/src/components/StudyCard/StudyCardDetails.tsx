interface IStudyCardDetailsProps {
  id: string;
  title: string;
  description: string;
  author: string;
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
}: IStudyCardDetailsProps) => {
  return (
    <section className="p-3 flex flex-col gap-1">
      <h1 className="capitalize font-bold">{title}</h1>
      <p>{description}</p>
      <hr />
      <h3 className="font-semibold self-end">{author}</h3>
      <p className="self-end">{formatDate(createdAt)}</p>
    </section>
  );
};

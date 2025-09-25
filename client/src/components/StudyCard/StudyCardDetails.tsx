interface IStudyCardDetailsProps {
  id: string;
  title: string;
  description: string;
  author: string;
  //   slug: string;
  createdAt?: Date;
}

export const StudyCardDetails = ({
  title,
  description,
  author,
}: IStudyCardDetailsProps) => {
  return (
    <section className="p-2 flex flex-col gap-1">
      <h1 className="capitalize font-bold">{title}</h1>
      <p>{description}</p>
      <h3 className="font-semibold">{author}</h3>
      <p>{}</p>
    </section>
  );
};

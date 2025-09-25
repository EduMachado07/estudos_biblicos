interface IStudyCardImageProps {
  image: string;
}

export const StudyCardImage = ({ image }: IStudyCardImageProps) => {
  return (
    <section className="h-40 w-full">
      {image === "thumbnailUrl" ? (
        <div className="bg-zinc-300 h-full flex items-center justify-center">
          <span className="text-zinc-500">Thumbnail</span>
        </div>
      ) : (
        <img
          src={image}
          alt="sorry, internal problems"
          className="w-full h-full object-cover"
        />
      )}
    </section>
  );
};

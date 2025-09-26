import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { StudyCard } from "./components/StudyCard";
import { Button } from "./components/ui/button";

export interface IStudies {
  id?: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  body: string;
  authorName: string;
  slug: string;
  tag: string;
  createdAt?: string;
  updatedAt?: string;
}

const filterByTag: string[] = ["Programação", "Frontend", ""]

function App() {
  const [studies, setStudies] = useState<IStudies[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudies = async () => {
      try {
        const res = await axios.get("http://localhost:3333/study?limit=9");
        const studies = res.data.studies.data;
        setStudies(studies);
      } catch (error) {
        console.error("Erro ao buscar estudos:", error);
      } finally {
        setLoading(false);
        console.log("Requisição finalizada");
      }
    };

    fetchStudies();
  }, []);

  if (loading) return <p>Carregando estudos...</p>;

  return (
    <>
      <main className="bg-[#f2f2f2] min-h-screen pb-6 px-[4vw] md:px-[8vw] w-full flex flex-col gap-4 md:gap-8">
        <Navbar />
        <hr />

        <section className="flex gap-4">
          <section className="w-30 flex flex-col gap-2">
            <section className="w-full py-2 border rounded-sm">Todas as tags</section>
            {
              filterByTag.map((filter, index) => (
                <Button className="w-full" key={index}>{filter}</Button>
              ))
            }
          </section>
          <section className="grid gap-4 md:grid-cols-3 md:gap-8">
            {studies.map((study, index) => (
              <StudyCard.Root key={index} slug={study.slug}>
                <StudyCard.Image image={study.thumbnailUrl} />
                <StudyCard.Details
                  id={study.id!}
                  title={study.title}
                  tag={study.tag}
                  description={study.description}
                  author={study.authorName}
                  createdAt={study.createdAt}
                />
              </StudyCard.Root>
            ))}
          </section>
        </section>

        <Button
          size={"lg"}
          variant={"default"}
          className="w-fit self-center px-12"
        >
          Mais estudos
        </Button>

        <hr />
        <Footer />
      </main>
    </>
  );
}

export default App;

import { NavLink } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { StudyCard } from "./components/StudyCard";

export interface IStudies {
  id?: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  body: string;
  authorName: string;
  slug: string;
  createdAt?: string;
  updatedAt?: string;
}

function App() {
  const [studies, setStudies] = useState<IStudies[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudies = async () => {
      try {
        const res = await axios.get("http://localhost:3333/study");
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
      <main className="bg-[#f4f4f4] min-h-screen px-[4vw] md:px-[8vw] w-full flex flex-col gap-4 md:gap-6">
        <Navbar />
        <hr className="bg-zinc-950" />

        <section className="grid gap-4 md:grid-cols-3 md:gap-10">
          {studies.map((study, index) => (
            <StudyCard.Root key={index} slug={study.slug}>
              <StudyCard.Image image={study.thumbnailUrl} />
              <StudyCard.Details
                id={study.id!}
                title={study.title}
                description={study.description}
                author={study.authorName}
                createdAt={study.createdAt}
              />
            </StudyCard.Root>
          ))}
        </section>

        <Footer />
      </main>
    </>
  );
}

export default App;

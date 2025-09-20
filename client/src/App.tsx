import { NavLink } from "react-router";
import { Input } from "@/components/ui/input";
import { Button } from "./components/ui/button";
import { Moon, Search, Sun } from "lucide-react";
import { useState } from "react";

export interface IStudies {
  id?: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  body: string;
  author: string;
  slug: string;
}

const studies: IStudies[] = [
  {
    title: "title 1",
    description: "description",
    thumbnailUrl: "thumbnailUrl",
    body: "",
    author: "thumbnailUrl",
    slug: "slug",
  },
  {
    title: "title 2",
    description: "description",
    thumbnailUrl: "thumbnailUrl",
    body: "",
    author: "thumbnailUrl",
    slug: "slug",
  },
  {
    title: "title 3",
    description: "description",
    thumbnailUrl: "thumbnailUrl",
    body: "",
    author: "thumbnailUrl",
    slug: "slug",
  },
];

function App() {
  const [widthSearch, setWidthSearch] = useState<boolean>(false);
  const [themeSystem, setThemeSystem] = useState<boolean>(false);

  return (
    <>
      <main className="bg-[#f4f4f4] min-h-screen px-[8vw] w-full flex flex-col gap-6">
        <header className="flex items-end justify-between pt-6">
          <section className="flex gap-10 items-end">
            <h1 className="font-bold text-2xl">Estudos DPI</h1>
            <nav>
              <ul className="flex gap-4">
                <NavLink to="">Estudos</NavLink>
                <NavLink to="">Sobre</NavLink>
              </ul>
            </nav>
          </section>
          <section className="flex gap-7 items-center">
            {themeSystem ? (
              <Moon
                onClick={() => setThemeSystem(!themeSystem)}
                className="text-zinc-200"
              />
            ) : (
              <Sun
                onClick={() => setThemeSystem(!themeSystem)}
                className="text-zinc-700"
              />
            )}

            <div className="relative">
              <label
                htmlFor="search"
                className="absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer"
              >
                <Search className="text-zinc-400" size={20} />
              </label>
              <Input
                id="search"
                type="text"
                placeholder="Buscar estudo"
                className={`pl-9 transition-all duration-300 ${
                  widthSearch ? "w-100" : "w-40"
                }`}
                onFocus={() => setWidthSearch(true)}
                onBlur={() => setWidthSearch(false)}
              />
            </div>

            <Button>Criar Estudo</Button>
          </section>
        </header>
        <hr />

        <div className="grid grid-cols-3 gap-10">
          {studies.map((study, index) => (
            <section key={index} className="border rounded-md">
              <section>
                <img
                  src={study.thumbnailUrl}
                  alt="sorry, internal problems"
                  className="overflow-hidden"
                />
              </section>
              <div className="p-2 flex flex-col gap-1">
                <h1 className="capitalize font-bold">{study.title}</h1>
                <h3 className="font-semibold">{study.author}</h3>
                <p>{study.description}</p>
                <NavLink to={`${study.slug}`}>
                  <button>read</button>
                </NavLink>
              </div>
            </section>
          ))}
        </div>

        {/* <footer>
          <h1>Estudos DPI</h1>
          <nav>
            <ul>
              <li>item</li>
              <li>item</li>
              <li>item</li>
            </ul>
          </nav>
          <a target="_blank" href="https://eduardo-machado.vercel.app/home">Desenvolvido por Eduardo Machado</a>
        </footer> */}
      </main>
    </>
  );
}

export default App;

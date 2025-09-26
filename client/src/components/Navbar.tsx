import { Plus, Search } from "lucide-react";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

function Navbar() {
  const [widthSearch, setWidthSearch] = useState<boolean>(false);

  return (
    <header className="flex items-center justify-between pt-6">
      <section className="flex gap-10 items-center">
        <h1 className="font-title text-2xl">Estudos DPI</h1>
        {/* <nav>
              <ul className="flex gap-4">
                <NavLink to="">Estudos</NavLink>
                <NavLink to="">Sobre</NavLink>
              </ul>
            </nav> */}
      </section>
      <section className="max-md:hidden flex gap-7 items-center">
        {/* {themeSystem ? (
              <Moon
                onClick={() => setThemeSystem(!themeSystem)}
                className="text-zinc-200"
              />
            ) : (
              <Sun
                onClick={() => setThemeSystem(!themeSystem)}
                className="text-zinc-700"
              />
            )} */}

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
      <section className="md:hidden flex gap-4 items-center">
        <Search className="text-zinc-400" size={20} />
        <Button>
          <Plus />
        </Button>
      </section>
    </header>
  );
}
export default Navbar;

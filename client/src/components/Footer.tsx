import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

function Footer() {
  return (
    <footer className="w-full flex flex-col">
      <section className="flex justify-between">
        <h1 className="font-title text-2xl">Estudos DPI</h1>
        <section className="flex flex-col gap-4 items-end">
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
              className="pl-9 w-100"
            />
          </div>

          <Button className="px-8">Criar Estudo</Button>
        </section>
      </section>
        <a target="_blank" href="https://eduardo-machado.vercel.app/home" className="self-center">
          Desenvolvido por Eduardo Machado
        </a>
    </footer>
  );
}
export default Footer;

import { Plus, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Link, NavLink } from "react-router";
import { useStudiesStore } from "@/context/UserContext";

export const Navbar = () => {
  const { author } = useStudiesStore();

  return (
    <header className="flex items-center justify-between pt-6">
      <section className="flex gap-10 items-center">
        <NavLink to="/" className="font-title text-2xl">
          Estudos DPI
        </NavLink>
      </section>
      <section className="flex gap-7 items-center">
        {author ? (
          <>
            <Link to="/profile">
              <Button>Meus estudos</Button>
            </Link>
          </>
        ) : (
          <NavLink to="/login">
            <Button>Criar Estudo</Button>
          </NavLink>
        )}
      </section>
      {/* <section className="md:hidden flex gap-4 items-center">
        <Search className="text-zinc-400" size={20} />
        <Button>
          <Plus />
        </Button>
      </section> */}
    </header>
  );
};

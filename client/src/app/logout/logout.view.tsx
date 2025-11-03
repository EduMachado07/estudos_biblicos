import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { useLogoutModel } from "./logout.model";

type LogoutViewProps = ReturnType<typeof useLogoutModel>;

export const LogoutView = (props: LogoutViewProps) => {
  const { systemLogout } = props;
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Sair do sistema</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Encerrar sessão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja sair do sistema? <br /> Você precisará fazer login
              novamente.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button onClick={systemLogout}>Sair</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

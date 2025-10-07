import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { useLoginModel } from "./login.model";

type LoginViewProps = ReturnType<typeof useLoginModel>;

export const LoginView = (props: LoginViewProps) => {
  const { form, onSubmit, apiError } = props;

  return (
    <>
      <main className="md:w-full h-screen flex justify-center items-center">
        <section className="">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full flex flex-col gap-6"
            >
              <h1 className="font-title text-2xl">Login</h1>
              {apiError && (
                <p className="text-red-500 text-sm font-medium">{apiError}</p>
              )}
              {/* email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Seu email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Sua senha" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Entrar</Button>
              <hr />
              <p className="self-center font-body-medium">
                Disponível apenas para pessoas autorizadas
              </p>
            </form>
          </Form>
        </section>
      </main>
    </>
  );
};

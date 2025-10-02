import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CloudUpload } from "lucide-react";
import { useRef, useState } from "react";
import { TipTapEditor } from "@/components/TipTapEditor";

export const CreateStudiesView = () => {
  const form = useForm();
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const onSubmit = () => {
    console.log();
  };

  return (
    <>
      <main className="py-10 w-full min-h-screen px-[18vw] flex justify-center items-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-6"
          >
            {/* thumbnail */}
            <FormField
              control={form.control}
              name="thumbnail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thumbnail</FormLabel>
                  <FormControl>
                    <>
                      {/* Preview da imagem */}
                      {preview ? (
                        <div className="relative">
                          <img
                            src={preview}
                            alt="Preview"
                            className="shadow-lg h-100 w-full object-cover rounded-md"
                          />
                        </div>
                      ) : (
                        <div className="shadow-2xs flex flex-col justify-center gap-1.5 items-center h-100 w-full border-2 border-dashed object-cover rounded-md">
                          <CloudUpload className="size-18 stroke-blue-600" />
                          <h1 className="font-title capitalize text-lg">
                            imagem do estudo
                          </h1>
                          <p className="font-body text-sm text-muted-foreground">
                            Tamanho máximo: <strong>5MB</strong>
                          </p>
                          <p className="font-body text-sm text-muted-foreground">
                            Formatos aceitos:{" "}
                            <strong>JPEG, PNG, WEBP, AVIF, SVG</strong>
                          </p>
                          <Button
                            type="button"
                            onClick={() => inputRef.current?.click()}
                            size="default"
                            variant={"default"}
                            className="mt-2"
                          >
                            Selecionar imagem
                          </Button>
                        </div>
                      )}

                      <Input
                        type="file"
                        accept="image/png, image/jpeg, image/webp, image/avif, image/svg+xml"
                        ref={inputRef}
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            field.onChange(file); // salva no react-hook-form
                            setPreview(URL.createObjectURL(file)); // gera preview
                          }
                        }}
                      />
                    </>
                  </FormControl>
                  {/* <FormDescription>
                    Faça upload de uma imagem para ser a thumbnail do estudo.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* titulo */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input placeholder="Título do estudo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Input placeholder="Descrição breve do estudo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* body */}
            {/* componente TipTap */}
            <TipTapEditor />

            {/* tag */}
            <FormField
              control={form.control}
              name="tag"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tag</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Identificador" />
                      </SelectTrigger>
                    </FormControl>
                    <FormDescription>
                      <SelectContent>
                        <SelectItem value="salvacao">Salvação</SelectItem>
                        <SelectItem value="espirito-santo">
                          Espírito Santo
                        </SelectItem>
                        <SelectItem value="cura">Cura</SelectItem>
                        <SelectItem value="apocalipse">Apocalipse</SelectItem>
                        <SelectItem value="familia">Família</SelectItem>
                      </SelectContent>
                    </FormDescription>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button size={"lg"} type="submit" className="w-fit">
              Criar estudo
            </Button>
          </form>
        </Form>
      </main>
    </>
  );
};

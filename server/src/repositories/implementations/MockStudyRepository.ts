import { Study } from "../../entities/Study";
import { IStudyRepository } from "../IStudyRepository";
import { BadRequest } from "../IErrorRepository";

export let MockStudies: Study[] = [
  new Study({
    title: "Estudo sobre React",
    description: "Introdução aos fundamentos do React e criação de componentes reutilizáveis.",
    body: "Conteúdo detalhado sobre componentes, props e estado no React.",
    author: "Eduardo Machado",
    thumbnailUrl: "thumbnailUrl",
    thumbnailId: "thumbnailId",
  }),
  new Study({
    title: "Node.js com Express",
    description: "Construção de APIs RESTful usando Node.js e Express.",
    body: "Passo a passo de como estruturar rotas, middlewares e controladores.",
    author: "Mariana Silva",
    thumbnailUrl: "thumbnailUrl",
    thumbnailId: "thumbnailId",
  }),
  new Study({
    title: "Banco de Dados Relacional",
    description: "Fundamentos de SQL e boas práticas no uso de bancos relacionais.",
    body: "Exemplos de criação de tabelas, joins e normalização.",
    author: "Carlos Pereira",
    thumbnailUrl: "thumbnailUrl",
    thumbnailId: "thumbnailId",
  }),
  new Study({
    title: "TypeScript Avançado",
    description: "Exploração de tipos genéricos, interfaces e utility types.",
    body: "Dicas práticas para tipar melhor seu código e evitar bugs.",
    author: "Fernanda Costa",
    thumbnailUrl: "thumbnailUrl",
    thumbnailId: "thumbnailId",
  }),
  new Study({
    title: "Testes com Jest",
    description: "Criação de testes unitários e mocks para aplicações JavaScript.",
    body: "Explicação sobre TDD e como estruturar testes de forma clara.",
    author: "Lucas Almeida",
    thumbnailUrl: "thumbnailUrl",
    thumbnailId: "thumbnailId",
  }),
  new Study({
    title: "Next.js na Prática",
    description: "Aplicações modernas usando SSR e rotas dinâmicas no Next.js.",
    body: "Como aproveitar as features de API Routes e Static Generation.",
    author: "Julia Santos",
    thumbnailUrl: "thumbnailUrl",
    thumbnailId: "thumbnailId",
  }),
  new Study({
    title: "Segurança em APIs",
    description: "Boas práticas para proteger APIs com autenticação e JWT.",
    body: "Explicação sobre tokens de acesso, refresh tokens e middlewares.",
    author: "Rafael Oliveira",
    thumbnailUrl: "thumbnailUrl",
    thumbnailId: "thumbnailId",
  }),
  new Study({
    title: "Git e Versionamento",
    description: "Controle de versão eficiente usando Git e GitHub.",
    body: "Conceitos de branch, merge, pull requests e fluxo de trabalho.",
    author: "Beatriz Rocha",
    thumbnailUrl: "thumbnailUrl",
    thumbnailId: "thumbnailId",
  }),
  new Study({
    title: "Design Patterns em JS",
    description: "Aplicação de padrões de projeto no desenvolvimento front-end.",
    body: "Exemplos de Singleton, Factory e Observer em JavaScript.",
    author: "André Carvalho",
    thumbnailUrl: "thumbnailUrl",
    thumbnailId: "thumbnailId",
  }),
  new Study({
    title: "Docker para Desenvolvedores",
    description: "Introdução ao uso de containers para aplicações modernas.",
    body: "Como criar imagens, rodar containers e integrar com o Node.js.",
    author: "Camila Ferreira",
    thumbnailUrl: "thumbnailUrl",
    thumbnailId: "thumbnailId",
  }),
];

export class MockStudyRepository implements IStudyRepository {
  async create(data: Study): Promise<Study> {
    MockStudies.push(data);

    return data;
  }

  async findStudies(
    offset?: number,
    limit?: number
  ): Promise<{ studies: Study[]; length: number }> {
    const studies = MockStudies.slice(offset, offset + limit);
    return { studies, length: MockStudies.length };
  }

  async findById(id: string): Promise<Study | null> {
    const study = MockStudies.find((study) => study.id === id);

    return study || null;
  }

  async deleteById(id: string): Promise<void> {
    MockStudies = MockStudies.filter((study) => study.id !== id);
  }

  async updateById(id: string, data: Partial<Study>): Promise<Study> {
    const studyIndex = MockStudies.findIndex((study) => study.id === id);
    if (studyIndex === -1) {
      throw new BadRequest("Estudo nao encontrado.");
    }

    const { id: _, slug: __, ...rest } = data;
    const updatedStudy = {
      ...MockStudies[studyIndex],
      ...rest,
    };

    MockStudies[studyIndex] = updatedStudy;

    return updatedStudy;
  }
}

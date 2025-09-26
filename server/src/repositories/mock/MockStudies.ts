import { Study } from "../../entities/Study";

export let MockStudies: Study[] = [
  new Study({
    title: "Introdução ao TypeScript",
    description:
      "Um estudo introdutório explicando os principais conceitos do TypeScript, suas vantagens em relação ao JavaScript e como ele auxilia na produtividade.",
    thumbnailId: "thumb1",
    thumbnailUrl: "http://example.com/thumb1.jpg",
    body: JSON.stringify({
      type: "doc",
      content: [
        { type: "heading", attrs: { level: 1 }, content: [{ type: "text", text: "O que é TypeScript?" }] },
        { type: "paragraph", content: [{ type: "text", text: "TypeScript é um superset do JavaScript que adiciona tipagem estática e recursos avançados de desenvolvimento." }] },
        { type: "paragraph", content: [{ type: "text", text: "Com ele, é possível escrever código mais seguro, escalável e fácil de manter." }] }
      ]
    }),
    authorId: "user1",
    authorName: "Alice",
    tag: "Programação",
  }),

  new Study({
    title: "Fundamentos de React",
    description:
      "Exploração dos principais conceitos do React, como componentes, props e estado, com exemplos práticos para iniciantes.",
    thumbnailId: "thumb2",
    thumbnailUrl: "http://example.com/thumb2.jpg",
    body: JSON.stringify({
      type: "doc",
      content: [
        { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "Componentes e Props" }] },
        { type: "paragraph", content: [{ type: "text", text: "Os componentes são os blocos fundamentais de um aplicativo React." }] },
        { type: "bulletList", content: [
          { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", text: "Props permitem passagem de dados." }] }] },
          { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", text: "Estado define comportamento interno." }] }] }
        ]}
      ]
    }),
    authorId: "user2",
    authorName: "Bruno",
    tag: "Frontend",
  }),

  new Study({
    title: "Noções de Banco de Dados Relacional",
    description:
      "Estudo sobre os conceitos de tabelas, chaves primárias e relacionamentos, aplicado a sistemas reais.",
    thumbnailId: "thumb3",
    thumbnailUrl: "http://example.com/thumb3.jpg",
    body: JSON.stringify({
      type: "doc",
      content: [
        { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "Tabelas e Relacionamentos" }] },
        { type: "paragraph", content: [{ type: "text", text: "Um banco relacional organiza dados em tabelas interconectadas." }] },
        { type: "paragraph", content: [{ type: "text", marks: [{ type: "bold" }], text: "Exemplo: " }, { type: "text", text: "Usuários e Pedidos." }] }
      ]
    }),
    authorId: "user3",
    authorName: "Carla",
    tag: "Banco de Dados",
  }),

  new Study({
    title: "Conceitos de API REST",
    description:
      "Explicação dos métodos HTTP mais utilizados e boas práticas para construção de APIs escaláveis.",
    thumbnailId: "thumb4",
    thumbnailUrl: "http://example.com/thumb4.jpg",
    body: JSON.stringify({
      type: "doc",
      content: [
        { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "Principais Métodos HTTP" }] },
        { type: "bulletList", content: [
          { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", text: "GET - Leitura" }] }] },
          { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", text: "POST - Criação" }] }] },
          { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", text: "PUT/PATCH - Atualização" }] }] },
          { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", text: "DELETE - Exclusão" }] }] }
        ]}
      ]
    }),
    authorId: "user4",
    authorName: "Diego",
    tag: "Backend",
  }),

  new Study({
    title: "Introdução ao GraphQL",
    description:
      "Estudo comparando GraphQL e REST, destacando os benefícios de consultas flexíveis e tipagem forte.",
    thumbnailId: "thumb5",
    thumbnailUrl: "http://example.com/thumb5.jpg",
    body: JSON.stringify({
      type: "doc",
      content: [
        { type: "heading", attrs: { level: 1 }, content: [{ type: "text", text: "Por que usar GraphQL?" }] },
        { type: "paragraph", content: [{ type: "text", text: "GraphQL permite ao cliente requisitar apenas os dados necessários, reduzindo sobrecarga." }] }
      ]
    }),
    authorId: "user5",
    authorName: "Elisa",
    tag: "API",
  }),

  new Study({
    title: "Arquitetura MVC",
    description:
      "Entendimento do padrão Model-View-Controller e como ele organiza aplicações web.",
    thumbnailId: "thumb6",
    thumbnailUrl: "http://example.com/thumb6.jpg",
    body: JSON.stringify({
      type: "doc",
      content: [
        { type: "paragraph", content: [{ type: "text", text: "O padrão MVC separa responsabilidades em três camadas principais." }] },
        { type: "bulletList", content: [
          { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", text: "Model - Lida com os dados." }] }] },
          { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", text: "View - Exibe a interface." }] }] },
          { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", text: "Controller - Gerencia a lógica." }] }] }
        ]}
      ]
    }),
    authorId: "user1",
    authorName: "Alice",
    tag: "Arquitetura",
  }),

  new Study({
    title: "Versionamento com Git",
    description:
      "Um estudo prático sobre Git, explicando conceitos como commits, branches e merges.",
    thumbnailId: "thumb7",
    thumbnailUrl: "http://example.com/thumb7.jpg",
    body: JSON.stringify({
      type: "doc",
      content: [
        { type: "paragraph", content: [{ type: "text", text: "O Git é uma ferramenta de versionamento distribuído." }] },
        { type: "paragraph", content: [{ type: "text", marks: [{ type: "italic" }], text: "Ele permite colaboração eficiente em projetos." }] }
      ]
    }),
    authorId: "user2",
    authorName: "Bruno",
    tag: "DevOps",
  }),

  new Study({
    title: "Fundamentos de Node.js",
    description:
      "Estudo sobre a arquitetura orientada a eventos do Node.js e como criar servidores simples.",
    thumbnailId: "thumb8",
    thumbnailUrl: "http://example.com/thumb8.jpg",
    body: JSON.stringify({
      type: "doc",
      content: [
        { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "Node.js e Event Loop" }] },
        { type: "paragraph", content: [{ type: "text", text: "Node.js é baseado em um modelo single-thread não bloqueante." }] }
      ]
    }),
    authorId: "user3",
    authorName: "Carla",
    tag: "Backend",
  }),

  new Study({
    title: "Introdução ao Next.js",
    description:
      "Estudo sobre o framework Next.js, suas rotas baseadas em arquivos e o suporte a renderização híbrida.",
    thumbnailId: "thumb9",
    thumbnailUrl: "http://example.com/thumb9.jpg",
    body: JSON.stringify({
      type: "doc",
      content: [
        { type: "paragraph", content: [{ type: "text", text: "Next.js é construído sobre o React e oferece funcionalidades adicionais." }] },
        { type: "paragraph", content: [{ type: "text", text: "Ele possibilita renderização estática e server-side rendering." }] }
      ]
    }),
    authorId: "user4",
    authorName: "Diego",
    tag: "Frontend",
  }),

  new Study({
    title: "Princípios do SOLID",
    description:
      "Explicação dos cinco princípios do SOLID e como aplicá-los no design de software.",
    thumbnailId: "thumb10",
    thumbnailUrl: "http://example.com/thumb10.jpg",
    body: JSON.stringify({
      type: "doc",
      content: [
        { type: "heading", attrs: { level: 3 }, content: [{ type: "text", text: "Os 5 Princípios" }] },
        { type: "orderedList", content: [
          { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", text: "Single Responsibility" }] }] },
          { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", text: "Open/Closed" }] }] },
          { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", text: "Liskov Substitution" }] }] },
          { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", text: "Interface Segregation" }] }] },
          { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", text: "Dependency Inversion" }] }] }
        ]}
      ]
    }),
    authorId: "user5",
    authorName: "Elisa",
    tag: "Arquitetura",
  }),
];

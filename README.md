# Desafio Clicksign - Gerenciador de Projetos

Uma aplicação de gerenciamento de projetos desenvolvida como parte do desafio Clicksign.

## Funcionalidades

- Listar projetos
- Criar novos projetos
- Editar projetos existentes
- Filtrar projetos
- Ordenar projetos
- Pesquisar projetos com histórico de busca

## Tecnologias Utilizadas

### Frontend

- **Framework:** Vue.js (versão 3)
- **Linguagem:** TypeScript
- **Gerenciamento de Estado:** Pinia
- **Roteamento:** Vue Router
- **Estilização:** SCSS
- **Validação de Schema:** Zod
- **Ferramenta de Build:** Vite

## Pré-requisitos

- Node.js (ex: v18.x ou superior recomendado)
- npm (v8.x ou superior) ou yarn

## 🚀 Como Iniciar (Frontend)

### 1. Clone o Repositório

```bash
git clone https://github.com/carloshenriquesa/clicksign-challenge.git
cd clicksign-challenge
```

### 2. Instale as Dependências

Usando npm:

```bash
npm install
```

Ou usando yarn:

```bash
yarn install
```

### 4. Executando a Aplicação Frontend (Modo de Desenvolvimento)

Este comando iniciará o servidor de desenvolvimento local para a aplicação Vue.js.

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`.

**Opção 2: Configurando um Servidor Mock**

1.  Instale o `json-server` (globalmente ou como uma dependência de desenvolvimento do projeto):

    ```bash
    npm install -g json-server
    # ou
    # npm install --save-dev json-server
    ```

2.  Execute o `json-server`:
    `bash
npm run mock-api   
`
    O servidor mock estará rodando em `http://localhost:3001`.

## Estrutura do Projeto (Simplificada)

```
.
├── public/
│   └── # Arquivos estáticos
├── src/
│   ├── assets/
│   │   └── # CSS global, imagens, fontes
│   ├── components/
│   │   ├── icons/         # Componentes de ícones SVG
│   │   ├── project/       # Componentes específicos da funcionalidade de Projeto (Form, Header, List, etc.)
│   │   └── ui/            # Componentes de UI reutilizáveis (Button, Input, Select, Toggle, Upload, Form)
│   ├── composables/     # Funções composable do Vue 3 (ex: useSearchHistory)
│   ├── router/
│   │   └── index.ts     # Configuração do Vue Router
│   ├── schema/
│   │   └── project-schema.ts # Schema Zod para validação de dados de projeto
│   ├── stores/
│   │   └── project.ts   # Store Pinia para gerenciamento de estado dos projetos
│   ├── views/           # Componentes de página/rota (HomeView, ProjectView, etc.)
│   ├── App.vue          # Componente Vue raiz
│   └── main.ts          # Ponto de entrada principal da aplicação (inicialização do Vue, Pinia, Router)
├── .env.local           # (Opcional, não versionado) Variáveis de ambiente locais
├── index.html           # Arquivo HTML principal
├── package.json         # Dependências e scripts do projeto
├── tsconfig.json        # Configuração do TypeScript
└── vite.config.ts       # (Se usar Vite) Configuração do Vite
```

# Documentação do Projeto

## Sobre o Projeto
Este é um projeto desenvolvido utilizando as tecnologias **React** e **Vite**, com suporte ao **TypeScript**. O frontend segue a arquitetura **SPA (Single Page Application)**, garantindo uma experiência rápida e interativa para os usuários.

## Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para criação de interfaces de usuário.
- **Vite**: Ferramenta de build que proporciona um ambiente de desenvolvimento rápido.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática ao código.
- **ESLint**: Ferramenta para garantir a qualidade e consistência do código.

## Instalação e Execução

1. Clone o repositório:
   ```bash
   git clone <URL_DO_REPOSITORIO>
   ```

2. Acesse a pasta do projeto:
   ```bash
   cd <NOME_DA_PASTA>
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

4. Execute o projeto em modo de desenvolvimento:
   ```bash
   npm run dev
   ```

5. Abra no navegador: [http://localhost:3000](http://localhost:3000)

## Configuração de ESLint
Para manter o código limpo e padronizado, o ESLint foi configurado com as seguintes boas práticas:

- Uso do **@vitejs/plugin-react** ou **@vitejs/plugin-react-swc** para suporte ao Fast Refresh.
- Configurações de regras personalizadas para suporte ao TypeScript e React.

### Configuração Recomendada
Adicione as seguintes opções no arquivo `eslint.config.js`:

```javascript
export default tseslint.config({
  languageOptions: {
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
  settings: { react: { version: '18.3' } },
  plugins: { react },
  rules: {
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
});
```

## Estrutura do Projeto

A estrutura do projeto está organizada da seguinte forma:

```
src/
├── components/   # Componentes reutilizáveis
├── pages/        # Páginas principais da aplicação
├── assets/       # Arquivos estáticos (imagens, ícones, etc.)
├── routes/       # Configuração de rotas da aplicação
├── services/     # Camada de serviços e APIs
├── styles/       # Estilos globais e variáveis
├── utils/        # Funções utilitárias e helpers
├── public/       # Arquivos públicos acessíveis diretamente
└── App.tsx       # Componente raiz

```

## Funcionalidades

- **SPA (Single Page Application)**: Navegação rápida sem recarregar a página.
- **Hot Module Replacement (HMR)**: Atualizações em tempo real durante o desenvolvimento.
- **Tipagem Estática**: Garantida pelo TypeScript.

## Contribuição

Sinta-se à vontade para contribuir com melhorias no projeto. Para isso:

1. Faça um fork do repositório.
2. Crie uma branch com a sua feature:
   ```bash
   git checkout -b minha-feature
   ```
3. Realize os commits.
4. Abra um Pull Request.

## Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE).

---



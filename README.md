# Projeto Next.js - Blog sobre veiculos antigos

Este é um projeto desenvolvido com [Next.js](https://nextjs.org/) que lista e detalha artigos sobre veiculos antigos,
O projeto utiliza Tailwind CSS para estilização,
testes com Jest e Testing Library, Docker, e segue boas práticas de performance, SEO e acessibilidade.

---

## 🚀 Tecnologias e Ferramentas

- [Next.js] (App Router)
- [React]
- [TailwindCSS]
- [TypeScript]
- [Jest] + [Testing_Library]
- [Docker]
- [Docker_Compose]
- [Acessibilidade] e [SEO_técnico]

## 🚀 Como rodar o projeto
ℹ️ Obs.: Projeto foi feito no Windows 11

```bash
1. **Clone o repositório:**
git clone https://github.com/Rafael-Antunes-Brasil/OldCars
cd OldCars

Instale as dependências:
npm install

🐳 Usando com Docker
Build e execução do container:
docker-compose up -d --build

Acesse a aplicação:
http://localhost:3000

🧪 Testes
Os testes estão localizados dentro da pasta __tests__ e usam:

Jest

@testing-library/react

Execute os testes com:

npm test

🌐 SEO & Acessibilidade
Metatags dinâmicas em cada página (generateMetadata)

Layout responsivo e mobile-first

Uso de HTML semântico e navegação acessível via teclado
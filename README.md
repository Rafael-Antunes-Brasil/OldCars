# Projeto Next.js - Blog sobre veiculos antigos

Este é um projeto desenvolvido com [Next.js](https://nextjs.org/) que lista e detalha artigos sobre veiculos antigos,
O projeto utiliza Tailwind CSS para estilização,
testes com Jest e Testing Library, Docker, e segue boas práticas de performance, SEO e acessibilidade.

---

## 📦 Tecnologias utilizadas

- [Next.js] (App Router)
- [React]
- [TailwindCSS]
- [TypeScript]
- [Jest] + [Testing_Library]
- [Docker]
- [Docker_Compose]
- [Acessibilidade] e [SEO_técnico]

### Pré-requisitos

Antes de iniciar, você precisa ter instalado:

- [Node.js v18+](https://nodejs.org/)
- [Docker](https://www.docker.com/products/docker-desktop)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Git](https://git-scm.com/)

ℹ️ Obs.: Projeto foi feito no Windows 11

## 🚀 Como rodar o projeto

```bash
1. **Clone o repositório:**
git clone https://github.com/Rafael-Antunes-Brasil/old_cars
cd old_cars

Altere o Arquivo .env.example para .env

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
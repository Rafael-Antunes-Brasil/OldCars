import { formatDate } from "@/utils/dateFormatter";
import { Article } from "@/utils/types";
import Link from "next/link";

export const metadata = {
  title: "Carros antigos - Artigos e História",
  description:
    "Explore artigos sobre veículos clássicos, suas histórias e restauração de carros antigos.",
  keywords: [
    "carros antigos",
    "veículos clássicos",
    "automóveis vintage",
    "restauração de carros",
  ],
};

export default async function Home() {
  let articles: Article[] = [];

  try {
    const response = await fetch(`${process.env.API_URL}/articles/`, {
      next: { revalidate: 60 }
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar artigos: ${response.status}`);
    }

    const json = await response.json();
    articles = Array.isArray(json) ? json : [];
  } catch (error) {
    console.error(error);
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl mt-5 mb-8 font-bold text-left text-white px-4">
        Venha conhecer um pouco mais do meu mundo!!
      </h1>
      <div className="px-4 md:px-6 lg:px-8 mb-8">
        {articles.length > 0 ? (
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 list-none p-0">
            {articles.map(art => (
              <li key={art.id} className="m-0 p-0">
                <article className="bg-black p-6 rounded-lg shadow-md justify-center flex flex-col text-left border border-gray-500 h-full">
                  <h2 className="text-2xl font-semibold text-white mb-3">{art.title}</h2>
                  <div className="flex justify-between items-center text-gray-100 mb-3">
                    <p className="italic font-normal">{formatDate(art.publishDate)}</p>
                    <p className="not-italic font-medium">Por: {art.author}</p>
                  </div>
                  <p className="text-white mb-4">{art.resume}</p>
                  <div className="w-full flex justify-end mt-auto">
                    <Link className="text-blue-500 hover:underline" href={`/article/${art.id}`}>
                      Conferir
                    </Link>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-white">Nenhum artigo disponível no momento.</p>
        )}
      </div>
    </div>
  );
}

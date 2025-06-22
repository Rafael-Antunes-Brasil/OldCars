import { formatDate } from "@/utils/dateFormatter";
import { Article } from "@/utils/types";
import Link from "next/link";

export default async function Home() {
  // const response = await fetch('https://dummyjson.com/posts') // Api para teste
  const response = await fetch('http://localhost:3003/')
  const articles: Article[] = await response.json();
  // console.log(articles);

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl mt-5 mb-8 font-bold text-left text-white">
        Venha conhecer um pouco mais do meu mundo!!
      </h1>
      <div className="px-4 md:px-6 lg:px-8 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map(art => (
            <div key={art.id} className="bg-black p-6 rounded-lg shadow-md justify-center flex flex-col text-left border border-gray-500">
              <h2 className="text-2xl font-semibold text-white mb-3">{art.title}</h2>
              <p className="flex justify-between items-center text-gray-600">
                <span className="italic font-normal">{formatDate(art.publishDate)}</span>
                <span className="not-italic font-medium">{art.author}</span>
              </p>
              <p className="text-white">{art.resume}</p>
              <div className="w-full flex justify-end mt-auto">
                <Link className="text-blue-500 hover:underline" href={`/article/${art.id}`}>
                  Conferir
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

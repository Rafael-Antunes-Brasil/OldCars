import Link from "next/link";
import { Article } from "../../../../utils/types";
import { formatDate } from "@/utils/dateFormatter";
import TextToSpeechWrapper from './TextToSpeechWrapper';
import notFound from '../../../not-found';

export async function ArticleInfo({ id }: { id: string }) {
    // await new Promise(resolve => setTimeout(resolve, 9000));
    let response;

    try {
        response = await fetch(`${process.env.API_URL}/articles/${id}`, {
            cache: 'force-cache',
            next: {
                revalidate: 60
            }
        });

        if (!response || !response.ok) {
            console.log('Artigo não encontrado ou erro na requisição');
            return notFound();
        }

        const data: Article = await response.json();

        return (
            <article className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 bg-black shadow-lg rounded-lg mt-8 mb-8 max-w-3xl">
                <div className="flex justify-end mb-4">
                    <Link href="/" className="text-blue-600 hover:underline inline-block">
                        &larr; Voltar para a página inicial
                    </Link>
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
                    {data.title}
                </h1>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-sm text-gray-100 mb-8 border-b pb-4">
                    {data.publishDate && (
                        <p className="italic mb-2 sm:mb-0">Publicado em: {formatDate(data.publishDate)}</p>
                    )}
                    {data.author && (
                        <p className="font-medium">Por: {data.author}</p>
                    )}
                </div>
                <div className="text-lg text-white leading-relaxed space-y-4">
                    <TextToSpeechWrapper text={data.content} />
                    <p>{data.content}</p>
                </div>
            </article>
        )
    } catch (error) {
        console.log(error);
        return notFound();
    }
}
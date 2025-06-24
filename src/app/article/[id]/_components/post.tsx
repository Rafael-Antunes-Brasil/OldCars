import Link from "next/link";
import { Article } from "../../../../utils/types";
import { formatDate } from "@/utils/dateFormatter";
import { extractKeywords } from "@/utils/keywordExtractor";
import { Metadata } from "next";
import { getArticleData } from "@/utils/articleService";
import TextToSpeechWrapper from './TextToSpeechWrapper';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const article = await getArticleData(params.id);

    if (!article) {
        return {
            title: 'Artigo Não Encontrado',
            description: 'O artigo solicitado não pôde ser encontrado.',
        }
    }

    const keywords = extractKeywords(`${article.title} ${article.content}`, 10).join(', ');
    const description = article.content.substring(0, 160) + (article.content.length > 160 ? '...' : '');

    return {
        title: article.title,
        description: description,
        keywords: keywords,
        openGraph: {
            title: article.title,
            description: description,
            type: 'article',
            publishedTime: article.publishDate,
            authors: article.author ? [article.author] : []
        },
        robots: {
            index: true,
            follow: true,
            nocache: false,
            googleBot: {
                index: true,
                follow: true
            }
        }
    }
}

export async function ArticleInfo({ id }: { id: string }) {
    //Teste para demorar o retorno
    // await new Promise(resolve => setTimeout(resolve, 4000));

    let response;

    try {
        // response = await fetch(`https://dummyjson.com/posts/${id}`, { // api teste
        response = await fetch(`http://api:3003/articles/${id}`, {
            cache: 'force-cache',
            next: {
                revalidate: 60
            }
        });
    } catch (error) {
        console.error(error);
    }

    if (!response) {
        return (
            <div className="container mx-auto py-8 px-4 text-center text-red-500 max-w-3xl">
                <p className="text-xl font-semibold mb-4">Erro ao carregar o artigo.</p>
                <p className="text-lg mb-6">Artigo com ID
                    <span className="font-bold">{id}</span>
                    não encontrado ou houve um problema na requisição.
                </p>
                <Link href="/" className="text-blue-600 hover:underline mt-4 inline-block text-base">
                    &larr; Voltar para a página inicial
                </Link>
            </div>
        )
    }

    const data: Article = await response.json();

    return (
        <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 bg-black shadow-lg rounded-lg mt-8 mb-8 max-w-3xl">
            <div className="flex justify-end mb-4">
                <Link href="/" className="text-blue-600 hover:underline inline-block">
                    &larr; Voltar para a página inicial
                </Link>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
                {data.title}
            </h1>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-sm text-gray-600 mb-8 border-b pb-4">
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
        </div>
    )
}
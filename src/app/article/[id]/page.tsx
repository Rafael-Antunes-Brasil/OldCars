import { ArticleInfo } from "../[id]/_components/post";
import { extractKeywords } from "@/utils/keywordExtractor";
import { Metadata } from "next";
import { getArticleData } from "@/utils/articleService";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    const article = await getArticleData(id);

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

export default async function DetailArticle({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    return (
        <div>
            <ArticleInfo id={id} />
        </div>
    )
}
import { Article } from "./types";

export async function getArticleData(id: string): Promise<Article | null> {
    try {
        // const response = await fetch(`https://dummyjson.com/posts/${id}`, { // api teste
        const response = await fetch(`http://api:3003/articles/${id}`, {
            cache: 'force-cache',
            next: {
                revalidate: 60 // cache 60 segundos
            }
        } );

        if (!response.ok) {
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error("Erro ao buscar dados do artigo:", error);
        return null;
    }
}
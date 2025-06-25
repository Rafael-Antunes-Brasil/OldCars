import { Article } from "./types";

export async function getArticleData(id: string): Promise<Article | null> {
    try {
        const response = await fetch(`${process.env.API_URL}/articles/${id}`, {
            cache: 'force-cache',
            next: {
                revalidate: 60
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
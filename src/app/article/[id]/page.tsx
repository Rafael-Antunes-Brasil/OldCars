import { Suspense } from "react";
import { ArticleInfo } from "../[id]/_components/post";

export default async function DetailArticle({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    return (
        <div>
            <Suspense fallback={<h1>Carregando...</h1>}>
                <ArticleInfo id={id} />
            </Suspense>
        </div>
    )
}
import { Article } from "@/utils/types";
import ArticleInfo from "./ArticleInfoServer";
import notFound from "../../../not-found";

export async function ArticleInfoWrapper({ id }: { id: string }) {
  try {
    const response = await fetch(`${process.env.API_URL}/articles/${id}`, {
      cache: 'force-cache',
      next: {
        revalidate: 60
      }
    });

    if (!response.ok) {
      return notFound();
    }

    const data: Article = await response.json();

    return <ArticleInfo data={data} />;
  } catch (error) {
    console.error(error);
    return notFound();
  }
}
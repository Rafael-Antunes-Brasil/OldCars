import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center p-4">
            <div className="max-w-md text-center">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3 mt-5">
                    Artigo Não Encontrado
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-5">
                    O artigo que você está procurando não existe em nossa base de dados.
                </p>
                <Link
                    href="/"
                    className="text-blue-600 hover:underline inline-block"
                >
                    ← Voltar para a página inicial
                </Link>
            </div>
        </div>
    )
}
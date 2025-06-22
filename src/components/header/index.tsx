import Link from "next/link";

export default function Header() {
    return (
        <header className="flex px-2 py-4 bg-zinc-900 text-white">
            <div className="container mx-auto max-w-7xl flex items-center justify-between w-full font-semibold">
                <div>
                    Carros Antigos Blog
                </div>
                <nav>
                    <ul className="flex items-center justify-center gap-2">
                        <li>
                            <Link href='/'>
                                Blog
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}
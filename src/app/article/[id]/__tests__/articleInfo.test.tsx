import { render, screen, waitFor, act } from '@testing-library/react'
import { ArticleInfo } from '@/app/article/[id]/_components/post'
import '@testing-library/jest-dom'

// Mock das dependências
jest.mock('next/link', () => {
    return ({ children, href }: { children: React.ReactNode; href: string }) => {
        return <a href={href}>{children}</a>
    }
})

// Mock do TextToSpeechWrapper com caminho absoluto
jest.mock('@/app/article/[id]/_components/TextToSpeechWrapper', () => {
    return ({ text }: { text: string }) => <div>{text}</div>
})

const mockArticleData = {
    title: 'Test Article',
    content: 'This is a test article content.',
    publishDate: '2023-01-01T00:00:00Z',
    author: 'Test Author'
}

describe('ArticleInfo Component', () => {
    beforeEach(() => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve(mockArticleData),
                ok: true
            })
        ) as jest.Mock
    })

    afterEach(() => {
        jest.restoreAllMocks()
    })

    it('should render article data after successful fetch', async () => {
        await act(async () => {
            render(<ArticleInfo id="1" />)
        })

        await waitFor(() => {
            expect(screen.getByText(mockArticleData.title)).toBeInTheDocument()
            expect(screen.getByText(mockArticleData.content)).toBeInTheDocument()
            expect(screen.getByText(`Por: ${mockArticleData.author}`)).toBeInTheDocument()
            expect(screen.getByText(/Publicado em:/)).toBeInTheDocument()
            expect(screen.getByText('Voltar para a página inicial')).toBeInTheDocument()
        })
    })

    it('should render error message when fetch fails', async () => {
        global.fetch = jest.fn(() => Promise.reject(new Error('API error'))) as jest.Mock

        await act(async () => {
            render(<ArticleInfo id="1" />)
        })

        await waitFor(() => {
            expect(screen.getByText('Erro ao carregar o artigo.')).toBeInTheDocument()
            expect(screen.getByText(/Artigo com ID/)).toBeInTheDocument()
            expect(screen.getByText('Voltar para a página inicial')).toBeInTheDocument()
        })
    })

    it('should render error message when response is undefined', async () => {
        global.fetch = jest.fn(() => Promise.resolve(undefined)) as jest.Mock

        await act(async () => {
            render(<ArticleInfo id="1" />)
        })

        await waitFor(() => {
            expect(screen.getByText('Erro ao carregar o artigo.')).toBeInTheDocument()
        })
    })
})
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ArticleInfo } from '../_components/post';
import { getArticleData } from '@/utils/articleService';
import { extractKeywords } from '@/utils/keywordExtractor';

jest.mock('@/utils/articleService', () => ({
    getArticleData: jest.fn(),
}));

jest.mock('@/utils/keywordExtractor', () => ({
    extractKeywords: jest.fn(),
}));

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve(mockArticle),
    })
) as jest.Mock;

const mockArticle = {
    id: '1',
    title: 'Título do Artigo de Teste',
    content: 'Conteúdo completo do artigo de teste para verificar a descrição e as palavras-chave. Este é um texto longo para testar o truncamento da descrição.',
    publishDate: '2023-10-26T10:00:00Z',
    author: 'Autor Teste',
};

describe('Página do Artigo (Integração)', () => {
    beforeEach(() => {
        (getArticleData as jest.Mock).mockClear();
        (extractKeywords as jest.Mock).mockClear();
    });

    describe('Componente ArticleInfo', () => {
        it('deve renderizar os detalhes do artigo quando os dados são buscados com sucesso', async () => {
            (getArticleData as jest.Mock).mockResolvedValue(mockArticle);

            render(await ArticleInfo({ id: '1' }));

            expect(screen.getByRole('heading', { level: 1, name: mockArticle.title })).toBeInTheDocument();
            expect(screen.getByText(mockArticle.content)).toBeInTheDocument();
            expect(screen.getByText(`Publicado em: 26 de outubro de 2023`)).toBeInTheDocument();
            expect(screen.getByText(`Por: ${mockArticle.author}`)).toBeInTheDocument();
        });

        it('deve exibir mensagem de erro quando o artigo não é encontrado', async () => {
            (getArticleData as jest.Mock).mockResolvedValue(null);

            render(await ArticleInfo({ id: '999' }));

            expect(screen.getByText(/Erro ao carregar o artigo./i)).toBeInTheDocument();
            expect(screen.getByText((content, node) => {
                const hasText = (text: string) => node?.textContent?.includes(text) || false;
                return hasText('Artigo com ID 999 não encontrado ou houve um problema na requisição.');
            })).toBeInTheDocument();
            expect(screen.getByRole('link', { name: /Voltar para a página inicial/i })).toBeInTheDocument();
        });

        it('deve exibir mensagem de erro quando a busca de dados falha (ex: erro de rede)', async () => {
            (getArticleData as jest.Mock).mockRejectedValue(new Error('Erro de rede simulado'));

            render(await ArticleInfo({ id: '1' }));

            expect(screen.getByText(/Erro ao carregar o artigo./i)).toBeInTheDocument();
            expect(screen.getByText((content, node) => {
                const hasText = (text: string) => node?.textContent?.includes(text) || false;
                return hasText('Artigo com ID 1 não encontrado ou houve um problema na requisição.');
            })).toBeInTheDocument();
        });
    });
});

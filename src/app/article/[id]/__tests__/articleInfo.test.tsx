import { render, screen } from '@testing-library/react';
import ArticleInfo from '../_components/ArticleInfoServer';

describe('ArticleInfo (Client)', () => {
    it('renderiza corretamente com dados simulados', () => {
        const mockData = {
            id: 1,
            title: 'Artigo de Teste',
            content: 'Este é o conteúdo.',
            author: 'Rafael',
            publishDate: '2024-01-01',
            resume: 'Resumo do artigo',
            createdAt: '2024-01-01T00:00:00Z',
        };

        render(<ArticleInfo data={mockData} />);

        expect(screen.getByText('Artigo de Teste')).toBeInTheDocument();
        expect(screen.getByText('Este é o conteúdo.')).toBeInTheDocument();
        expect(screen.getByText('Por: Rafael')).toBeInTheDocument();
        expect(screen.getByText(/Publicado em:/)).toBeInTheDocument();
    });
});
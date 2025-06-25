// import React from 'react';
// import { render, screen, waitFor } from '@testing-library/react';
// import ArticleInfo from '../page';
// import '@testing-library/jest-dom';
// import { enableFetchMocks } from 'jest-fetch-mock';

// enableFetchMocks();

// const mockArticle = {
//     id: '1',
//     title: 'Test Article',
//     content: 'This is a test article content',
//     publishDate: '2023-01-01T00:00:00Z',
//     author: 'John Doe',
//     resume: 'Test resume'
// };

// describe('ArticleInfo Component', () => {
//     beforeEach(() => {
//         fetchMock.resetMocks();
//     });

//     it('renders article data when fetch is successful', async () => {
//         fetchMock.mockResponseOnce(JSON.stringify(mockArticle));

//         render(<ArticleInfo params={{ id: '1' }} />);

//         await waitFor(() => {
//             expect(screen.getByText(mockArticle.title)).toBeInTheDocument();
//             expect(screen.getByText('Publicado em: 01/01/2023')).toBeInTheDocument();
//             expect(screen.getByText(`Por: ${mockArticle.author}`)).toBeInTheDocument();
//             expect(screen.getByText(mockArticle.content)).toBeInTheDocument();
//             expect(screen.getByText('← Voltar para a página inicial')).toBeInTheDocument();
//         });
//     });

//     it('displays not found when article does not exist', async () => {
//         fetchMock.mockResponseOnce('', { status: 404 });

//         const { container } = render(<ArticleInfo params={{ id: '999' }} />);

//         await waitFor(() => {
//             expect(container.querySelector('h1')).toHaveTextContent('Artigo Não Encontrado');
//         });
//     });

//     it('handles fetch errors', async () => {
//         fetchMock.mockRejectOnce(new Error('API Error'));

//         const { container } = render(<ArticleInfo params={{ id: '1' }} />);

//         await waitFor(() => {
//             expect(container.querySelector('h1')).toHaveTextContent('Artigo Não Encontrado');
//         });
//     });

//     it('displays loading state while fetching', async () => {
//         fetchMock.mockResponseOnce(() => new Promise(resolve =>
//             setTimeout(() => resolve(JSON.stringify(mockArticle)), 1000)
//         ));

//         render(<ArticleInfo params={{ id: '1' }} />);

//         expect(screen.queryByText(mockArticle.title)).not.toBeInTheDocument();
//         await waitFor(() => {
//             expect(screen.getByText(mockArticle.title)).toBeInTheDocument();
//         });
//     });

//     it('formats date correctly', async () => {
//         fetchMock.mockResponseOnce(JSON.stringify(mockArticle));

//         render(<ArticleInfo params={{ id: '1' }} />);

//         await waitFor(() => {
//             expect(screen.getByText('Publicado em: 01/01/2023')).toBeInTheDocument();
//         });
//     });
// });
export function formatDate(dateString: string) {
    const date = new Date(dateString);

    return date.toLocaleDateString('pt-BR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}
import { Author } from '@/models';

export async function getAuthorByID(id: string): Promise<Author> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/authors/${id}`,
  );
  return response.json();
}

export async function getAuthors(): Promise<Author[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/authors`);
  return response.json();
}

export async function deleteAuthorByID(id: string): Promise<void> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/authors/${id}`,
    {
      method: 'DELETE',
    },
  );
  return response.json();
}

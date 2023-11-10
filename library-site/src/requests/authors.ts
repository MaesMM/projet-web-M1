import { Author, CreateAuthor } from '@/models';

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

export async function createAuthor(author: CreateAuthor): Promise<void> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/authors`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(author),
  });
  return response.json();
}

export async function updateAuthor(
  author: CreateAuthor,
  id: string,
): Promise<void> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/authors/${id}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(author),
    },
  );
  return response.json();
}

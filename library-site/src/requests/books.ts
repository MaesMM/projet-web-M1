import { Book, CreateBook } from '@/models';

export async function getBookByID(id: string): Promise<Book> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/books/${id}`,
  );
  return response.json();
}

export async function getBooks(): Promise<Book[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books`);
  return response.json();
}

export async function deleteBookByID(id: string): Promise<void> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/books/${id}`,
    {
      method: 'DELETE',
    },
  );
  return response.json();
}

export async function createBook(book: CreateBook): Promise<void> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(book),
  });
  return response.json();
}

export async function updateBook(book: CreateBook, id: string): Promise<void> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/books/${id}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(book),
    },
  );
  return response.json();
}

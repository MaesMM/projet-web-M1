import { Genre } from '@/models';

export async function getGenres(): Promise<Genre[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/genres`);
  return response.json();
}

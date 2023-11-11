import { CreateUser, UpdateUser, User } from '@/models';

export async function getUserByID(id: string): Promise<User> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/${id}`,
  );
  return response.json();
}

export async function getUsers(): Promise<User[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`);
  return response.json();
}

export async function createUser(user: CreateUser): Promise<void> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  return response.json();
}

export async function updateUser(user: UpdateUser, id: string): Promise<void> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/${id}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    },
  );
  return response.json();
}

export async function deleteUserById(id : string): Promise<void>{
   const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/${id}`,
    {
      method: 'DELETE',
    },
  );
  return response.json();
}

/* eslint-disable operator-linebreak */

'use client';

import { usePathname } from 'next/navigation';
import React from 'react';
import { nanoid } from 'nanoid';
import { useQuery } from 'react-query';
import Container from '../container';
import { Author, Book, User } from '@/models';
import { getBookByID } from '@/requests/books';
import { getAuthorByID } from '@/requests/authors';
import { getUserByID } from '@/requests/users';

export default function Header(): React.ReactElement {
  const path = usePathname().split('/').slice(1);
  const breadcrumbs = path.slice(1);

  const { data: book } = useQuery<Book>({
    queryKey: ['book', breadcrumbs[0]],
    queryFn: () => getBookByID(breadcrumbs[0]),
    enabled: !!breadcrumbs[0] && path[0] === 'books',
  });
  const { data: author } = useQuery<Author>({
    queryKey: ['author', breadcrumbs[0]],
    queryFn: () => getAuthorByID(breadcrumbs[0]),
    enabled: !!breadcrumbs[0] && path[0] === 'authors',
  });
  const { data: user } = useQuery<User>({
    queryKey: ['user', breadcrumbs[0]],
    queryFn: () => getUserByID(breadcrumbs[0]),
    enabled: !!breadcrumbs[0] && path[0] === 'users',
  });

  let title: string;
  switch (path[0]) {
    case 'users':
      title = 'Utilisateurs';
      break;
    case 'authors':
      title = 'Auteurs';
      break;
    case 'books':
      title = 'Livres';
      break;
    default:
      title = 'Accueil';
      break;
  }

  return (
    <Container className="flex items-center z-[100] justify-between py-8">
      <span className="text-2xl font-bold">{title}</span>
      <div className="flex gap-2">
        <span className="text-lg">
          {(path[0] === 'books' && book && `${book?.name}`) ||
            (path[0] === 'users' &&
              user &&
              `${user?.firstName} ${user?.lastName}`) ||
            (path[0] === 'authors' &&
              author &&
              `${author?.firstName} ${author?.lastName}`)}
        </span>
        {breadcrumbs.slice(1).map((pathname) => (
          <span key={nanoid()} className="font-normal text-lg">
            {` - ${pathname}`}
          </span>
        ))}
      </div>
    </Container>
  );
}

'use client';

import { usePathname } from 'next/navigation';
import React from 'react';
import { nanoid } from 'nanoid';
import Container from '../container';

export default function Header(): React.ReactElement {
  const path = usePathname().split('/').slice(1);
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

  const breadcrumbs = path.slice(1);
  return (
    <Container className="flex items-center z-[100] justify-between py-8">
      <span className="text-2xl font-bold">{title}</span>
      {breadcrumbs.map((pathname) => (
        <span key={nanoid()} className="font-normal text-lg">
          {pathname}
        </span>
      ))}
    </Container>
  );
}

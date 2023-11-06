'use client';

import { usePathname } from 'next/navigation';
import React from 'react';
import { nanoid } from 'nanoid';
import Container from '../container';

export default function Header(): React.ReactElement {
  const path = usePathname().split('/').slice(1);
  const title = path[0].charAt(0).toUpperCase() + path[0].slice(1);
  const breadcrumbs = path.slice(1);
  return (
    <Container className="flex items-center z-[100] justify-between py-8">
      <span className="text-2xl font-bold">{title || 'Accueil'}</span>
      {breadcrumbs.map((pathname) => (
        <span key={nanoid()} className="font-normal text-lg">
          {pathname}
        </span>
      ))}
    </Container>
  );
}

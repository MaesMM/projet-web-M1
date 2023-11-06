'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Pen from '../../../public/Pen.svg';
import Home from '../../../public/Home.svg';
import Book from '../../../public/Book.svg';
import User from '../../../public/User.svg';
import Button from '../interaction/button';

export default function Menu(): React.ReactElement {
  const router = useRouter();
  const url = usePathname();

  return (
    <div className="flex-1 bg-white-500 rounded-xl shadow-container flex flex-col p-8 py-8 gap-8">
      <div className="font-bold px-4 text-2xl">BookViewer</div>
      <div className="flex h-px bg-background" />
      <div className="flex flex-1 flex-col gap-4">
        <Button
          text="Home"
          icon={Home}
          className={url === '/' ? 'bg-gray-200' : undefined}
          onClick={(): void => router.push('/')}
        />
        <Button
          text="Livres"
          icon={Book}
          className={url === '/books' ? 'bg-gray-200' : undefined}
          onClick={(): void => router.push('books')}
        />
        <Button
          text="Auteurs"
          icon={Pen}
          className={url === '/authors' ? 'bg-gray-200' : undefined}
          onClick={(): void => router.push('authors')}
        />
        <Button
          text="Utilisateurs"
          icon={User}
          className={url === '/users' ? 'bg-gray-200' : undefined}
          onClick={(): void => router.push('users')}
        />
      </div>
    </div>
  );
}

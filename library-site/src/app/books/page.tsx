'use client';
import React, { FC, ReactElement, useEffect } from 'react';
import { useBooksProviders } from '@/hooks';
import { Link } from 'react-router-dom';


const BooksPage: FC = (): ReactElement => {
  const { useListBooks } = useBooksProviders();
  const { books, load } = useListBooks();

  useEffect(() => load(), []); // Ajoutez des parenthèses ici pour appeler la fonction load

  return (
    <>
      <h1>Books</h1>
      {books.map((book) => (
        // Utilisez Link pour créer un lien vers la page de détails du livre
        <Link to={`/books/${book.id}`} key={book.id}>
          <div>{book.name}</div>
        </Link>
      ))}
    </>
  );
};

export default BooksPage;

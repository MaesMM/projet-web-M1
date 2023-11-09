'use client';

import { useParams } from 'next/navigation';
import { FC } from 'react';
import { nanoid } from 'nanoid';
import Container from '@/component/container';
import ListItem from '@/component/listItem';
import Row from '@/component/row';
import Button from '@/component/interaction/button';
import Delete from '../../../../public/Delete.svg';
import Edit from '../../../../public/Edit.svg';

const user = {
  id: '1',
  username: 'Antoine Maes',
  books: [
    {
      id: '1',
      name: 'Hello',
      writtenOn: 2025,
      author: {
        firstName: 'Antoine',
        lastName: 'Monteil',
      },
      genres: ['Science fiction'],
    },
    {
      id: '1',
      name: 'Hello',
      writtenOn: 2025,
      author: {
        firstName: 'Antoine',
        lastName: 'Monteil',
      },
      genres: ['Science fiction, action, amour'],
    },
  ],
};

const BooksDetailsPage: FC = () => {
  const { id } = useParams();
  console.log(id);

  return (
    <div className="flex flex-col gap-8">
      <Container className="flex flex-col gap-4">
        <div className="flex justify-between items-center w-full">
          <span className="text-xl font-medium">Information Generales</span>
          <div className="flex">
            <Button
              icon={Edit}
              className="text-white-500 hover:text-white-600"
            />
            <Button
              icon={Delete}
              className="hover:bg-red-500 text-white-500 hover:text-white-600"
            />
          </div>
        </div>
        <ListItem title="Pseudonyme">{user.username}</ListItem>
        <div className="flex gap-4 justify-end">
          <Button className="text-sm" text="Annuler" />
          <Button
            className="bg-emerald-500 hover:bg-emerald-600 text-sm"
            text="Confirmer"
          />
        </div>
      </Container>
      <Container className="flex flex-col gap-4">
        <div className="flex justify-between items-center w-full">
          <span className="text-xl font-medium">Livres</span>
          <div className="flex">
            <Button
              icon={Edit}
              className="text-white-500 hover:text-white-600"
            />
            <Button
              icon={Delete}
              className="hover:bg-red-500 text-white-500 hover:text-white-600"
            />
          </div>
        </div>
        {user.books.map((book) => (
          <Row
            key={nanoid()}
            data={[
              { label: 'Titre', value: book.name },
              {
                label: 'Auteur',
                value: `${book.author.firstName} ${book.author.lastName}`,
              },
              { label: 'Date', value: book.writtenOn as unknown as string },
            ]}
          />
        ))}
      </Container>
    </div>
  );
};

export default BooksDetailsPage;

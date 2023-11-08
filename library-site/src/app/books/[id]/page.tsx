'use client';

import { FC, FormEvent, useState } from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from 'react-query';
import Container from '@/component/container';
import ListItem from '@/component/listItem';
import Edit from '../../../../public/Edit.svg';
import Delete from '../../../../public/Delete.svg';
import Button from '@/component/interaction/button';

// import InputList from '@/component/interaction/input/List';
import FormUpdate from '@/component/formUpdate';

type Book = {
  id: string;
  name: string;
  writtenOn: number;
  genres: {
    id: string;
    name: string;
  }[];
  author: {
    id: string;
    firstName: string;
    lastName: string;
  };
};

const handleSubmitForm = (e: FormEvent<HTMLFormElement>): void => {
  e.preventDefault();
  // console.log(e);
};

async function fetchBook(id: string): Promise<Book> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/books/${id}`,
  );
  return response.json();
}

const BooksDetailsPage: FC = () => {
  const [isModifying, setIsModifying] = useState(false);

  const { id } = useParams();
  const {
    data: book,
    isLoading,
    isError,
  } = useQuery<Book>({
    queryKey: ['book', id as string],
    queryFn: () => fetchBook(id as string),
    enabled: !!id,
  });

  if (isLoading || isError || !book) return <span>Loading...</span>;

  console.log(book.genres.map((obj) => obj.name));

  return (
    <Container className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center w-full">
          <span className="text-xl font-medium">Information Generales</span>
          <div className="flex">
            <Button
              onClick={(): void => setIsModifying(!isModifying)}
              Icon={<Edit />}
              className="text-white-500 hover:text-white-600"
            />
            <Button
              Icon={<Delete />}
              className="hover:bg-red-500 text-white-500 hover:text-white-600"
            />
          </div>
        </div>

        {isModifying ? (
          <FormUpdate
            onSubmit={handleSubmitForm}
            onCancel={(): void => setIsModifying(false)}
            data={[
              {
                label: 'Titre',
                name: 'name',
                type: 'text',
                defaultValue: book.name,
              },
              {
                label: 'Auteur',
                name: 'author',
                type: 'select',
                defaultValue: book.author.id,
                options: [{ value: '1', label: 'Antoine Monteil' }],
              },
              {
                label: 'Date',
                name: 'date',
                type: 'number',
                defaultValue: book.writtenOn,
              },
              {
                label: 'Genres',
                name: 'genres',
                type: 'listInput',
                defaultValues: book.genres.map((obj) => obj.name),
              },
            ]}
          />
        ) : (
          <div className="flex flex-col gap-4">
            <ListItem title="Titre">{book.name}</ListItem>
            <ListItem title="Auteur">
              {`${book.author.firstName} ${book.author.lastName}`}
            </ListItem>
            <ListItem title="Date">
              {book.writtenOn as unknown as string}
            </ListItem>
            <ListItem title="Genres">
              {book.genres.map((obj) => obj.name).join(', ')}
            </ListItem>
          </div>
        )}
      </div>
    </Container>
  );
};

export default BooksDetailsPage;

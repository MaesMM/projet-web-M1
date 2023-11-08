'use client';

import { FC, FormEvent, useState } from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from 'react-query';
import Container from '@/component/container';
import ListItem from '@/component/listItem';
import Edit from '../../../../public/Edit.svg';
import Delete from '../../../../public/Delete.svg';
import Button from '@/component/interaction/button';

import InputList from '@/component/interaction/input/List';

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
          <form
            onSubmit={(e): void => handleSubmitForm(e)}
            className="flex flex-col gap-4"
          >
            <ListItem title="Titre">
              <input
                name="name"
                className="px-4 py-2 rounded-full w-64"
                defaultValue={book.name}
                type="text"
              />
            </ListItem>
            <ListItem title="Auteur">
              <div className="px-4 py-2 bg-[#FFFFFF] rounded-full w-64">
                <select
                  defaultValue={book.author.id}
                  className="rounded-full w-full"
                  name="author"
                >
                  <option value="1">Antoine Monteil</option>
                </select>
              </div>
            </ListItem>
            <ListItem title="Date">
              <input
                name="date"
                className="px-4 py-2 w-xl rounded-full w-64"
                defaultValue={book.writtenOn}
                type="number"
              />
            </ListItem>
            <InputList data={book.genres.map((obj) => obj.name)} />

            <div className="flex gap-4 justify-end">
              <Button
                onClick={(): void => setIsModifying(false)}
                className="text-sm"
                text="Annuler"
              />
              <Button
                type="submit"
                className="bg-emerald-500 hover:bg-emerald-600 text-sm"
                text="Confirmer"
              />
            </div>
          </form>
        ) : (
          <div className="flex flex-col gap-4">
            <ListItem title="Titre">
              <span>{book.name}</span>
            </ListItem>
            <ListItem title="Auteur">
              <span>{`${book.author.firstName} ${book.author.lastName}`}</span>
            </ListItem>
            <ListItem title="Date">
              <span>{book.writtenOn as unknown as string}</span>
            </ListItem>
            <ListItem title="Genres">
              <span>{book.genres.map((obj) => obj.name).join(', ')}</span>
            </ListItem>
          </div>
        )}
      </div>
    </Container>
  );
};

export default BooksDetailsPage;

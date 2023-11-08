/* eslint-disable operator-linebreak */

'use client';

import { FC, FormEvent, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import Container from '@/component/container';
import ListItem from '@/component/listItem';
import Edit from '../../../../public/Edit.svg';
import Delete from '../../../../public/Delete.svg';
import Button from '@/component/interaction/button';
import FormUpdate from '@/component/form/formUpdate';
import { Author, Book } from '@/models';
import { deleteBookByID, getBookByID } from '@/requests/books';
import { getAuthors } from '@/requests/authors';
import Modal from '@/component/modal';

const handleSubmitForm = (e: FormEvent<HTMLFormElement>): void => {
  e.preventDefault();
  const formData = new FormData(e.target as HTMLFormElement);
  const formValues = Object.fromEntries(formData.entries()) as {
    [k: string]: string | string[];
  };
  const genres = formValues.genres as string;
  formValues.genres = genres.split(',').map((genre: string) => genre.trim());
  console.log(formValues);
};

const BooksDetailsPage: FC = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isModifying, setIsModifying] = useState(false);
  const [isModalDisplayed, setIsModalDisplayed] = useState(false);
  const { id } = useParams();
  const {
    data: book,
    isLoading: isBookLoading,
    isError: isBookError,
  } = useQuery<Book>({
    queryKey: ['book', id as string],
    queryFn: () => getBookByID(id as string),
    enabled: !!id,
  });

  const {
    data: authors,
    isLoading: isAuthorsLoading,
    isError: isAuthorsError,
  } = useQuery<Author[]>({
    queryKey: ['authors'],
    queryFn: () => getAuthors(),
  });

  const booksMutation = useMutation({
    mutationFn: () => deleteBookByID(id as string),
    onSuccess: () => {
      router.push('/books');
      return queryClient.invalidateQueries(['books']);
    },
  });

  if (
    isBookLoading ||
    isBookError ||
    !book ||
    isAuthorsError ||
    isAuthorsLoading ||
    !authors
  ) {
    return <span>Loading...</span>;
  }

  return (
    <>
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
                onClick={(): void => setIsModalDisplayed(true)}
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
                  options: authors.map((author) => ({
                    value: author.id,
                    label: `${author.firstName} ${author.lastName}`,
                  })),
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
      {isModalDisplayed && (
        <Modal
          setModalVisible={setIsModalDisplayed}
          title="Voulez vous supprimer ce livre ?"
        >
          <div className="flex gap-4">
            <Button
              className="w-fit bg-red-500 hover:bg-red-600"
              text="Oui"
              onClick={(): void => {
                setIsModalDisplayed(false);
                booksMutation.mutate();
              }}
            />
            <Button
              className="w-fit"
              text="Non"
              onClick={(): void => {
                setIsModalDisplayed(false);
              }}
            />
          </div>
        </Modal>
      )}
    </>
  );
};

export default BooksDetailsPage;

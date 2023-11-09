/* eslint-disable operator-linebreak */

'use client';

import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useParams, useRouter } from 'next/navigation';
import { FC, useState } from 'react';
import Container from '@/component/container';
import ListItem from '@/component/listItem';
import { Author, Book } from '@/models';
import { deleteAuthorByID, getAuthorByID } from '@/requests/authors';
import { getBooks } from '@/requests/books';
import Modal from '@/component/modal';
import BooksTable from '@/component/table/booksTable';
import FormUpdateAuthors from '@/component/form/formUpdate/formUpdateAuthors';
import Confirmation from '@/component/interaction/confirmation';

type Data = {
  href: string;
  data: { label: string; value: string; size: 'lg' | 'md' | 'xl' }[];
};

const AuthorDetailsPage: FC = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isModifying, setIsModifying] = useState(false);
  const [isModalDisplayed, setIsModalDisplayed] = useState(false);
  const { id } = useParams();

  const { data: books } = useQuery<Book[]>({
    queryKey: ['books'],
    queryFn: () => getBooks(),
  });

  const { data: author } = useQuery<Author>({
    queryKey: ['author', id as string],
    queryFn: () => getAuthorByID(id as string),
    enabled: !!id,
  });

  const authorsMutation = useMutation({
    mutationFn: () => deleteAuthorByID(id as string),
    onSuccess: () => {
      router.push('/authors');
      return queryClient.invalidateQueries(['authors']);
    },
  });

  if (!author || !books) {
    return <span>Loading...</span>;
  }

  const data = books.map((book: Book) => ({
    href: book.id,
    data: [
      { label: 'Titre', value: book.name, size: 'lg' },
      { label: 'Date', value: String(book.writtenOn), size: 'md' },
      { label: 'Genres', value: book.genres.join(', '), size: 'lg' },
      {
        label: 'Auteur',
        value: `${book.author.firstName} ${book.author.lastName}`,
        size: 'md',
      },
    ],
  }));

  return (
    <div className="flex flex-col gap-8">
      <Container
        className="flex flex-col gap-4"
        title="Informations générales"
        onClickDelete={(): void => setIsModalDisplayed(true)}
        onClickEdit={(): void => setIsModifying(!isModifying)}
      >
        {isModifying ? (
          <FormUpdateAuthors author={author} setIsModifying={setIsModifying} />
        ) : (
          <div className="flex flex-col gap-4">
            <ListItem title="Prénom">{author.firstName}</ListItem>
            <ListItem title="Nom">{author.lastName}</ListItem>
          </div>
        )}
      </Container>
      <BooksTable data={data as Data[]} />
      {isModalDisplayed && (
        <Modal
          setModalVisible={setIsModalDisplayed}
          title="Voulez vous supprimer cet auteur ?"
        >
          <Confirmation
            onCancel={(): void => {
              setIsModalDisplayed(false);
            }}
            onConfirm={(): void => {
              setIsModalDisplayed(false);
              authorsMutation.mutate();
            }}
          />
        </Modal>
      )}
    </div>
  );
};

export default AuthorDetailsPage;

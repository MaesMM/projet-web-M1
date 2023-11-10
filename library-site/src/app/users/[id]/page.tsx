/* eslint-disable operator-linebreak */

'use client';

import { useParams, useRouter } from 'next/navigation';
import { FC, useState } from 'react';
import { useQuery } from 'react-query';
import Container from '@/component/container';
import ListItem from '@/component/listItem';
import { Book, User } from '@/models';
import { getUserByID } from '@/requests/users';
import Modal from '@/component/modal';
import Confirmation from '@/component/interaction/confirmation';
import FormUpdateUsers from '@/component/form/formUpdate/formUpdateUsers';
import BooksTable from '@/component/table/booksTable';
import Row from '@/component/row';

type Data = {
  href: string;
  data: { label: string; value: string; size: 'lg' | 'md' | 'xl' }[];
};

const BooksDetailsPage: FC = () => {
  const [isModifying, setIsModifying] = useState(false);
  const [isModalDisplayed, setIsModalDisplayed] = useState(false);
  const router = useRouter();

  const { id } = useParams();
  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useQuery<User>({
    queryKey: ['user', id as string],
    queryFn: () => getUserByID(id as string),
    enabled: !!id,
  });

  if (isUserLoading || isUserError || !user) {
    return <span>Loading...</span>;
  }

  const userBooks = user.userBook.map((book: Book) => ({
    href: book.id,
    data: [
      { label: 'Titre', value: book.name, size: 'lg' },
      { label: 'Date', value: String(book.writtenOn), size: 'md' },
      {
        label: 'Genres',
        value: book.genres && book.genres.map((genre) => genre.name).join(', '),
        size: 'lg',
      },
      {
        label: 'Auteur',
        value:
          book.author && `${book.author.firstName} ${book.author.lastName}`,
        size: 'md',
      },
    ],
  }));

  const favoriteBook = {
    href: user.favoriteBook.id,
    data: [
      { label: 'Titre', value: user.favoriteBook.name, size: 'lg' },
      { label: 'Date', value: String(user.favoriteBook.writtenOn), size: 'md' },
      {
        label: 'Genres',
        value:
          user.favoriteBook.genres &&
          user.favoriteBook.genres.map((genre) => genre.name).join(', '),
        size: 'lg',
      },
      {
        label: 'Auteur',
        value:
          user.favoriteBook.author &&
          `${user.favoriteBook.author.firstName} ${user.favoriteBook.author.lastName}`,
        size: 'md',
      },
    ],
  };

  return (
    <div className="flex flex-col gap-8">
      <Container
        className="flex flex-col gap-4"
        title="Informations générales"
        onClickDelete={(): void => setIsModalDisplayed(true)}
        onClickEdit={(): void => setIsModifying(!isModifying)}
      >
        {isModifying ? (
          <FormUpdateUsers setIsModifying={setIsModifying} user={user} />
        ) : (
          <div className="flex flex-col gap-4">
            <ListItem title="Prénom">{user.firstName}</ListItem>
            <ListItem title="Nom">{user.lastName}</ListItem>
          </div>
        )}
      </Container>
      {!isModifying && user.favoriteBook && (
        <Container className="flex flex-col gap-4" title="Livre favoris">
          <Row
            onClick={(): void => router.push(`books/${favoriteBook.href}`)}
            data={favoriteBook.data as Data['data']}
          />
        </Container>
      )}

      {!isModifying && (
        <BooksTable
          isAdding={false}
          title="Livre ajoutés"
          data={userBooks as Data[]}
        />
      )}
      {isModalDisplayed && (
        <Modal
          setModalVisible={setIsModalDisplayed}
          title="Voulez vous supprimer ce livre ?"
        >
          <Confirmation
            onCancel={(): void => {
              setIsModalDisplayed(false);
            }}
            onConfirm={(): void => {
              setIsModalDisplayed(false);
              //   booksMutation.mutate();
            }}
          />
        </Modal>
      )}
    </div>
  );
};

export default BooksDetailsPage;

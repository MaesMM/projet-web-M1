/* eslint-disable operator-linebreak */

'use client';

import { FC, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import Container from '@/component/container';
import ListItem from '@/component/listItem';
import { Book } from '@/models';
import { deleteBookByID, getBookByID } from '@/requests/books';
import Modal from '@/component/modal';
import FormUpdateBooks from '@/component/form/formUpdate/formUpdateBooks';
import Confirmation from '@/component/interaction/confirmation';

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

  const booksMutation = useMutation({
    mutationFn: () => deleteBookByID(id as string),
    onSuccess: () => {
      router.push('/books');
      return queryClient.invalidateQueries(['books']);
    },
  });

  if (isBookLoading || isBookError || !book) {
    return <span>Loading...</span>;
  }

  return (
    <>
      <Container
        className="flex flex-col gap-4"
        title="Informations générales"
        onClickDelete={(): void => setIsModalDisplayed(true)}
        onClickEdit={(): void => setIsModifying(!isModifying)}
      >
        {isModifying ? (
          <FormUpdateBooks setIsModifying={setIsModifying} book={book} />
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
              {book.genres.map((genre) => genre.name).join(', ')}
            </ListItem>
          </div>
        )}
      </Container>
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
              booksMutation.mutate();
            }}
          />
        </Modal>
      )}
    </>
  );
};

export default BooksDetailsPage;

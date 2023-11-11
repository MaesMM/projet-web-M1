/* eslint-disable implicit-arrow-linebreak */
import React, { FormEvent } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { User, UpdateUser, Book } from '@/models';
import { updateUser } from '@/requests/users';
import FormUpdate from '..';
import { getBooks } from '@/requests/books';

type Props = {
  setIsModifying: (value: boolean) => void;
  user: User;
};

export default function FormUpdateUsers({
  setIsModifying,
  user,
}: Props): React.ReactElement {
  const queryClient = useQueryClient();

  const {
    data: books,
    isLoading,
    isError,
  } = useQuery<Book[]>({
    queryKey: ['books'],
    queryFn: () => getBooks(),
  });

  const updateAuthorMutation = useMutation({
    mutationFn: (updatedUser: UpdateUser) => updateUser(updatedUser, user.id),
    onSuccess: () => {
      queryClient.invalidateQueries(['user', user.id]);
      setIsModifying(false);
    },
  });

  const handleSubmitForm = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formValues = Object.fromEntries(formData.entries()) as {
      [key: string]: string;
    };
    const { firstName, lastName, favoriteBook} = formValues;
    // const userBookList : string[] = userBook.split(',');

    const updatedUser: UpdateUser = {
      firstName: firstName as string,
      lastName: lastName as string,
      favoriteBook: favoriteBook as string,
      // userBook: userBookList as string[],
    };

    console.log('send updated user to backend :', updatedUser)
    updateAuthorMutation.mutate(updatedUser as UpdateUser);
  };

  if (isLoading || isError || !books) {
    return <span>Loading...</span>;
  }
  const favoriteBookOptions = books.map((book) => ({
            value: book.id,
            label: book.name,
          }))

  return (
    <FormUpdate
      onSubmit={handleSubmitForm}
      onCancel={(): void => setIsModifying(false)}
      data={[
        {
          label: 'Prénom',
          name: 'firstName',
          type: 'text',
          defaultValue: user.firstName,
        },
        {
          label: 'Nom',
          name: 'lastName',
          type: 'text',
          defaultValue: user.lastName,
        },
        {
          label: 'Livre favori',
          name: 'favoriteBook',
          type: 'select',
          required : false,
          defaultValue: user.favoriteBook && user.favoriteBook.id,
          options: [{label : "Aucun", value : ""}, ...favoriteBookOptions]
        },
        // {
        //   label: 'Livres Ajoutés',
        //   name: 'userBook',
        //   type: 'select',
        //   multiple: true,
        //   required : false,
        //   defaultValues: user.userBook && user.userBook.map((book) => book.id),
        //   options: books.map((book) => ({
        //     value: book.id,
        //     label: book.name,
        //   })),
        // },
      ]}
    />
  );
}

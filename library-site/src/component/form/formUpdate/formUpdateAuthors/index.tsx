/* eslint-disable implicit-arrow-linebreak */
import React, { FormEvent } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import FormUpdate from '..';
import { Author, CreateAuthor } from '@/models';
import { updateAuthor } from '@/requests/authors';

type Props = {
  setIsModifying: (value: boolean) => void;
  author: Author;
};

export default function FormUpdateAuthors({
  setIsModifying,
  author,
}: Props): React.ReactElement {
  const queryClient = useQueryClient();

  const updateAuthorMutation = useMutation({
    mutationFn: (updatedAuthor: CreateAuthor) =>
      updateAuthor(updatedAuthor, author.id),
    onSuccess: () => queryClient.invalidateQueries(['author', author.id]),
  });

  const handleSubmitForm = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formValues = Object.fromEntries(formData.entries()) as {
      [key: string]: string;
    };
    const { firstName, lastName } = formValues;

    const updatedAuthor: CreateAuthor = {
      firstName,
      lastName,
    };
    updateAuthorMutation.mutate(updatedAuthor as CreateAuthor);
  };

  return (
    <FormUpdate
      onSubmit={handleSubmitForm}
      onCancel={(): void => setIsModifying(false)}
      data={[
        {
          label: 'Prénom',
          name: 'firstName',
          type: 'text',
          defaultValue: author.firstName,
        },
        {
          label: 'Nom',
          name: 'lastName',
          type: 'text',
          defaultValue: author.lastName,
        },
      ]}
    />
  );
}

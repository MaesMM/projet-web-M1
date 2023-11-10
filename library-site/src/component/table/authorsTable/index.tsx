import { useMutation, useQueryClient } from 'react-query';
import React, { ReactElement } from 'react';
import Table from '..';
import { CreateAuthor } from '@/models';
import { createAuthor } from '@/requests/authors';

type Data = {
  href: string;
  data: { label: string; value: string; size: 'lg' | 'md' | 'xl' }[];
};

type Props = {
  data: Data[];
};

export default function AuthorsTable({ data }: Props): ReactElement {
  const queryClient = useQueryClient();

  const createAuthorMutation = useMutation({
    mutationFn: (author: CreateAuthor) => createAuthor(author),
    onSuccess: () => queryClient.invalidateQueries(['authors']),
  });

  function HandleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formValues = Object.fromEntries(formData.entries()) as {
      [key: string]: string;
    };
    const { firstName, lastName } = formValues;

    const author: CreateAuthor = {
      firstName,
      lastName,
    };
    createAuthorMutation.mutate(author as CreateAuthor);
  }
  return (
    <Table
      data={data as Data[]}
      modalTitle="Ajouter un auteur"
      onSubmitModal={(e): void => HandleSubmit(e)}
      dataCreateForm={[
        {
          label: 'Prénom',
          name: 'firstName',
          type: 'text',
        },
        {
          label: 'Nom',
          name: 'lastName',
          type: 'text',
        },
      ]}
    />
  );
}

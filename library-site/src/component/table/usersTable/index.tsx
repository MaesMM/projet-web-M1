import { useMutation, useQueryClient } from 'react-query';
import React, { ReactElement } from 'react';
import Table from '..';
import { CreateUser } from '@/models';
import { createUser } from '@/requests/users';

type Data = {
  href: string;
  data: { label: string; value: string; size: 'lg' | 'md' | 'xl' }[];
};

type Props = {
  data: Data[];
};

export default function UsersTable({ data }: Props): ReactElement {
  const queryClient = useQueryClient();

  const createUsersMutation = useMutation({
    mutationFn: (user: CreateUser) => createUser(user),
    onSuccess: () => queryClient.invalidateQueries(['Users']),
  });

  function HandleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formValues = Object.fromEntries(formData.entries()) as {
      [key: string]: string;
    };
    const { firstName, lastName } = formValues;

    const user: CreateUser = {
      firstName,
      lastName,
    };
    createUsersMutation.mutate(user as CreateUser);
  }
  return (
    <Table
      data={data as Data[]}
      modalTitle="Ajouter un utilisateur"
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

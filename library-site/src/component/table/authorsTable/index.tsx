import React, { ReactElement } from 'react';
import Table from '..';

type Data = {
  href: string;
  data: { label: string; value: string; size: 'lg' | 'md' | 'xl' }[];
};

type Props = {
  data: Data[];
};

export default function AuthorsTable({ data }: Props): ReactElement {
  return (
    <Table
      data={data as Data[]}
      modalTitle="Ajouter un auteur"
      onSubmitModal={(): void => console.log('hello')}
      dataModalForm={[
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

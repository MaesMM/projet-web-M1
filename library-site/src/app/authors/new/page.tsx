'use client';

import { FormEvent, ReactElement } from 'react';
import Container from '@/component/container';
import FormCreate from '@/component/form/formCreate';

const handleSubmitForm = (e: FormEvent<HTMLFormElement>): void => {
  e.preventDefault();
  // console.log(e);
};
export default function NewAuthor(): ReactElement {
  console.log('NewAuthor');
  return (
    <Container>
      <FormCreate
        onSubmit={handleSubmitForm}
        data={[
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
    </Container>
  );
}

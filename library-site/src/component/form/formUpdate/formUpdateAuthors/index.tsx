import React, { FormEvent } from 'react';
import FormUpdate from '..';
import { Author } from '@/models';

type Props = {
  setIsModifying: (value: boolean) => void;
  author: Author;
};

const handleSubmitForm = (e: FormEvent<HTMLFormElement>): void => {
  e.preventDefault();
  const formData = new FormData(e.target as HTMLFormElement);
  const formValues = Object.fromEntries(formData.entries());
  console.log(formValues);
};

export default function FormUpdateAuthors({
  setIsModifying,
  author,
}: Props): React.ReactElement {
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

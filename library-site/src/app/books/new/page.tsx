'use client';

import { FC, FormEvent, ReactElement } from 'react';
import Container from '@/component/container';
import Button from '@/component/interaction/button';
import ListItem from '@/component/listItem';

const newBook: FC = (): ReactElement => {
  const handleSubmitForm = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // console.log(e);
  };
  return (
    <Container>
      <form
        onSubmit={(e): void => handleSubmitForm(e)}
        className="flex flex-col gap-4 w-full"
      >
        <ListItem title="Titre">
          <input
            name="name"
            className="px-4 py-2 rounded-full w-64"
            type="text"
          />
        </ListItem>
        <ListItem title="Auteur">
          <div className="px-4 py-2 bg-[#FFFFFF] rounded-full w-64">
            <select className="rounded-full w-full" name="author">
              <option value="1">Antoine Monteil</option>
            </select>
          </div>
        </ListItem>
        <ListItem title="Date">
          <input
            name="date"
            className="px-4 py-2 w-xl rounded-full w-64"
            type="number"
          />
        </ListItem>
        {/* <InputList data={} /> */}

        <div className="flex gap-4 justify-end">
          <Button
            type="submit"
            className="bg-emerald-500 hover:bg-emerald-600 text-sm"
            text="Confirmer"
          />
        </div>
      </form>
    </Container>
  );
};

export default newBook;

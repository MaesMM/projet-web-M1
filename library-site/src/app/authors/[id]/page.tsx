'use client';

import { useParams } from 'next/navigation';
import { FC } from 'react';
import Container from '@/component/container';
import ListItem from '@/component/listItem';
import Button from '@/component/interaction/button';
import Edit from '../../../../public/Edit.svg';
import Delete from '../../../../public/Delete.svg';

const author = {
  id: '1',
  firstName: 'Antone',
  lastName: 'Monteil',
};

const AuthorDetailsPage: FC = () => {
  const { id } = useParams();
  console.log(id);

  return (
    <Container className="flex flex-col gap-4">
      <div className="flex justify-between items-center w-full">
        <span className="text-xl font-medium">Information Generales</span>
        <div className="flex">
          <Button icon={Edit} className="text-white-500 hover:text-white-600" />
          <Button
            icon={Delete}
            className="hover:bg-red-500 text-white-500 hover:text-white-600"
          />
        </div>
      </div>
      <ListItem title="Prénom">
        <span>{author.firstName}</span>
      </ListItem>
      <ListItem title="Nom">
        <span>{author.lastName}</span>
      </ListItem>
      <div className="flex gap-4 justify-end">
        <Button className="text-sm" text="Annuler" />
        <Button
          className="bg-emerald-500 hover:bg-emerald-600 text-sm"
          text="Confirmer"
        />
      </div>
    </Container>
  );
};

export default AuthorDetailsPage;

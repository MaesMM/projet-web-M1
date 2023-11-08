'use client';

import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useParams, useRouter } from 'next/navigation';
import { FC, FormEvent, useState } from 'react';
import Container from '@/component/container';
import ListItem from '@/component/listItem';
import Button from '@/component/interaction/button';
import Edit from '../../../../public/Edit.svg';
import Delete from '../../../../public/Delete.svg';
import { Author } from '@/models';
import { deleteAuthorByID, getAuthorByID } from '@/requests/authors';
import FormUpdate from '@/component/form/formUpdate';

const handleSubmitForm = (e: FormEvent<HTMLFormElement>): void => {
  e.preventDefault();
  // console.log(e);
};

const AuthorDetailsPage: FC = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isModifying, setIsModifying] = useState(false);
  const { id } = useParams();
  const {
    data: author,
    isLoading,
    isError,
  } = useQuery<Author>({
    queryKey: ['author', id as string],
    queryFn: () => getAuthorByID(id as string),
    enabled: !!id,
  });

  const authorsMutation = useMutation({
    mutationFn: () => deleteAuthorByID(id as string),
    onSuccess: () => {
      router.push('/authors');
      return queryClient.invalidateQueries(['authors']);
    },
  });

  if (isLoading || isError || !author) return <span>Loading...</span>;

  return (
    <Container className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center w-full">
          <span className="text-xl font-medium">Information Generales</span>
          <div className="flex">
            <Button
              onClick={(): void => setIsModifying(!isModifying)}
              Icon={<Edit />}
              className="text-white-500 hover:text-white-600"
            />
            <Button
              Icon={<Delete />}
              onClick={(): void => authorsMutation.mutate()}
              className="hover:bg-red-500 text-white-500 hover:text-white-600"
            />
          </div>
        </div>

        {isModifying ? (
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
        ) : (
          <div className="flex flex-col gap-4">
            <ListItem title="Prénom">{author.firstName}</ListItem>
            <ListItem title="Nom">{author.lastName}</ListItem>
          </div>
        )}
      </div>
    </Container>
  );
};

export default AuthorDetailsPage;

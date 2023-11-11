/* eslint-disable operator-linebreak */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */

'use client';

import { FC, ReactElement, useState } from 'react';
import { useQuery } from 'react-query';
import { User } from '@/models';
import { getUsers } from '@/requests/users';
import UsersSorter from '@/component/interaction/sorter/usersSorteer';
import UsersTable from '@/component/table/usersTable';

type Data = {
  href: string;
  data: { label: string; value: string; size: 'lg' | 'md' | 'xl' }[];
};

const UsersPage: FC = (): ReactElement => {
  const [inputValue, setInputValue] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  const {
    data: users,
    isLoading: isLoadingUsers,
    isError: isErrorUsers,
  } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => getUsers(),
  });

  if (isErrorUsers || isLoadingUsers || !users) {
    return <span>Loading...</span>;
  }

  //   const filteredUsers = users.filter(
  //     (user) =>
  //       user.firstName.toLowerCase().includes(inputValue.toLowerCase()) ||
  //       user.lastName.toLowerCase().includes(inputValue.toLowerCase()),
  //   );

  console.log(users)

  const filteredUsers = users.filter((user: User) => {
    const lowerCaseInput = inputValue.toLowerCase();
    const isMatchingFirstName = user.firstName
      .toLowerCase()
      .includes(lowerCaseInput);

    const isMatchingLastName = user.lastName
      .toLowerCase()
      .includes(lowerCaseInput);

    if (typeFilter !== 'all') {
      return (
        (isMatchingFirstName || isMatchingLastName) &&
        user.userBook.some(
          (book) =>
            book.id && book.id.toLowerCase() === typeFilter.toLowerCase(),
        )
      );
    }

    return isMatchingFirstName || isMatchingLastName;
  });

  const data = filteredUsers.map((user) => ({
    href: user.id,
    data: [
      { label: 'Prénom', value: user.firstName, size: 'md' },
      { label: 'Nom', value: user.lastName, size: 'md' },
    ],
  }));
  return (
    <div className="flex flex-col gap-8">
      <UsersSorter
        setInputValue={setInputValue}
        setTypeFilter={setTypeFilter}
      />
      <UsersTable data={data as Data[]} />
    </div>
  );
};

export default UsersPage;

//   const sortedUsers = [...filteredUsers].sort((a, b) => {
//     if (typeSort === 'username') {
//       return a.username.localeCompare(b.username);
//     }
//     if (typeSort === 'quantity') {
//       return a.books.length - b.books.length;
//     }

//     return 0;
//   });

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { nanoid } from 'nanoid';
import Container from '../container';
import Row from '../row';
import Add from '../../../public/Plus.svg';

// type RowProps = {
//   href: string;
//   data: { label: string; value: string; size: 'lg' | 'md' | 'xl' }[];
// };

type Props = {
  data: {
    href: string;
    data: { label: string; value: string; size: 'lg' | 'md' | 'xl' }[];
  }[];
  addButton?: boolean;
};

const Table = ({ data, addButton }: Props): React.ReactElement => {
  const router = useRouter();
  const path = usePathname();
  return (
    <Container className="flex flex-col gap-4 pb-8">
      <span className="text-sm">{`${data.length} élément(s) trouvé(s)`}</span>
      <div className="flex flex-col gap-4">
        {data.map((row) => (
          <Row
            onClick={(): void => router.push(`${path}/${row.href}`)}
            data={row.data}
            key={nanoid()}
          />
        ))}
        {addButton && (
          <button
            type="button"
            onClick={(): void => router.push(`${path}/new`)}
            className="w-full h-24 rounded-xl flex justify-center items-center px-4 py-2 border hover:bg-gray-200 border-solid border-gray-200"
            aria-label="create new book"
          >
            <Add />
          </button>
        )}
      </div>
    </Container>
  );
};

Table.defaultProps = {
  addButton: false,
};

export default Table;

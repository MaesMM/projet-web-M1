import React from 'react';
import { useRouter } from 'next/navigation';
import { nanoid } from 'nanoid';
import Container from '../container';
import Row from '../row';

type RowProps = {
  href: string;
  data: { label: string; value: string }[];
};

type Props = {
  data: RowProps[];
};

const Table = ({ data }: Props): React.ReactElement => {
  const router = useRouter();
  return (
    <Container className="flex flex-col gap-4 pb-8">
      <span className="text-sm">{`${data.length} livre(s) trouvé(s)`}</span>
      <div className="flex flex-col gap-4">
        {data.map((row) => (
          <Row
            onClick={(): void => router.push(`/books/${row.href}`)}
            data={row.data}
            key={nanoid()}
          />
        ))}
      </div>
    </Container>
  );
};

export default Table;

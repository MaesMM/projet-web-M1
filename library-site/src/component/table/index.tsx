/* eslint-disable operator-linebreak */
import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { nanoid } from 'nanoid';
import Container from '../container';
import Row from '../row';
import Add from '../../../public/Plus.svg';
import Modal from '../modal';
import FormCreate from '../form/formCreate';

type Props = {
  pathname?: string;
  title?: string;
  data: {
    href: string;
    data: { label: string; value: string; size: 'lg' | 'md' | 'xl' }[];
  }[];
  modalTitle?: string;
  onSubmitModal?: (e: React.FormEvent<HTMLFormElement>) => void;
  dataModalForm?: {
    label: string;
    name: string;
    type: 'select' | 'text' | 'number' | 'listInput';
    defaultValue?: string | number;
    defaultValues?: string[];
    options?: { value: string; label: string }[];
  }[];
};

const Table = ({
  data,
  modalTitle,
  onSubmitModal,
  dataModalForm,
  pathname,
  title,
}: Props): React.ReactElement => {
  const [isModalVisible, setModalVisible] = useState(false);
  const router = useRouter();
  const path = usePathname();
  return (
    <Container className="flex flex-col gap-4 pb-8" title={title}>
      <span className="text-sm">{`${data.length} élément(s) trouvé(s)`}</span>
      {data.map((row) => (
        <Row
          onClick={(): void => router.push(`${pathname || path}/${row.href}`)}
          data={row.data}
          key={nanoid()}
        />
      ))}
      <button
        type="button"
        onClick={(): void => setModalVisible(true)}
        className="w-full h-24 rounded-xl flex justify-center items-center px-4 py-2 border hover:bg-gray-200 border-solid border-gray-200"
        aria-label="create new book"
      >
        <Add />
      </button>
      {isModalVisible && modalTitle && onSubmitModal && dataModalForm && (
        <Modal title={modalTitle} setModalVisible={setModalVisible}>
          <FormCreate onSubmit={onSubmitModal} data={dataModalForm} />
        </Modal>
      )}
    </Container>
  );
};
Table.defaultProps = {
  pathname: undefined,
  title: undefined,
  modalTitle: undefined,
  onSubmitModal: (): void => undefined,
  dataModalForm: undefined,
};

export default Table;

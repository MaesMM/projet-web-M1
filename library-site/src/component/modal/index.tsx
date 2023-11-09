import React, { ReactElement } from 'react';
import Container from '../container';
import Close from '../../../public/Close remove.svg';

type Props = {
  setModalVisible: (value: boolean) => void;
  title: string;
  children: ReactElement;
};

export default function Modal({
  setModalVisible,
  title,
  children,
}: Props): ReactElement {
  return (
    <div className="h-screen w-screen fixed z-[100000] top-0 left-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <Container className="max-w-[600px] w-[50%] flex flex-col gap-8">
        <div className="flex justify-between gap-2">
          <span className="text-xl font-medium">{title}</span>
          <Close
            className="hover:cursor-pointer"
            onClick={(): void => setModalVisible(false)}
          />
        </div>
        {children}
      </Container>
    </div>
  );
}

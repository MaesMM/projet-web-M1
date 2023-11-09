import React from 'react';
import Button from '../button';

type Props = {
  onConfirm: () => void;
  onCancel: () => void;
};
export default function Confirmation({
  onCancel,
  onConfirm,
}: Props): React.ReactElement {
  return (
    <div className="flex gap-4">
      <Button
        className="w-fit bg-red-500 hover:bg-red-600"
        text="Oui"
        onClick={onConfirm}
      />
      <Button className="w-fit" text="Non" onClick={onCancel} />
    </div>
  );
}

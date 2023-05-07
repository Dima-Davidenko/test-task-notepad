import React from 'react';

interface IActionBtn {
  title: string;
  disabled: boolean;
  onClickFoo?: Function;
  selectedNoteID?: string;
}

const ActionBtn: React.FC<IActionBtn> = ({ title, disabled, onClickFoo, selectedNoteID }) => {
  return (
    <button
      onClick={() => (onClickFoo ? onClickFoo(selectedNoteID) : () => {})}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

export default ActionBtn;

import React from 'react';
import css from './ActionBtn.module.css';

interface IActionBtn {
  title: string;
  disabled: boolean;
  onClickFoo?: Function;
  selectedNoteID?: string;
}

const ActionBtn: React.FC<IActionBtn> = ({ title, disabled, onClickFoo, selectedNoteID }) => {
  return (
    <button
      className={css.actionBtn}
      onClick={() => (onClickFoo ? onClickFoo(selectedNoteID) : () => {})}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

export default ActionBtn;

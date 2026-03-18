import type { ReactNode } from 'react';
import IconButton from '../icon-button/IconButton';

interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

function Modal({ title, isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  function handleBackdropKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClose();
    }
  }

  function handleBackdropClick(event: React.MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleBackdropClick}
      onKeyDown={handleBackdropKeyDown}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black-500/35"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="flex h-auto w-125 flex-col items-center rounded-[28px] bg-black-0 p-8"
      >
        <div className="flex items-center justify-between w-full h-13">
          <h1 id="modal-title" className="h2-semibold">
            {title}
          </h1>
          <IconButton iconName="close" shape="circle" onClick={onClose} />
        </div>
        <div className="flex flex-col w-full gap-6">{children}</div>
      </div>
    </div>
  );
}
export default Modal;

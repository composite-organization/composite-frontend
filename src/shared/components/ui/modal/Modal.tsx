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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 bg-black-500/35"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="relative flex h-auto w-125 flex-col items-center rounded-[28px] bg-black-0 p-8"
      >
        <div className="flex items-center justify-between w-full h-13">
          <h2 id="modal-title" className="h2-semibold">
            {title}
          </h2>
          <IconButton iconName="close" shape="circle" onClick={onClose} />
        </div>
        <div className="flex flex-col w-full gap-6">{children}</div>
      </div>
    </div>
  );
}
export default Modal;

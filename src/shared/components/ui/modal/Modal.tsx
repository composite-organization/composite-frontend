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
    <div className="absolute inset-0 z-50 flex items-center justify-center px-4 py-4">
      <div
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 bg-black-500/35"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="relative z-10 flex max-h-full w-125 flex-col items-center gap-10 rounded-[28px] bg-black-0 p-8"
      >
        <div className="flex items-center justify-between w-full h-13 shrink-0">
          <h2 id="modal-title" className="h2-semibold">
            {title}
          </h2>
          <IconButton iconName="close" shape="circle" onClick={onClose} />
        </div>
        <div className="flex flex-col w-full gap-11 flex-1 min-h-0 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
export default Modal;

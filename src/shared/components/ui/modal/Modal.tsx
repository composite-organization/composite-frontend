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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black-100 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="flex flex-col items-center w-[500px] h-auto p-8 rounded-[28px] bg-black-0 "
      >
        <div className="flex items-center justify-between w-full h-[52px]">
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

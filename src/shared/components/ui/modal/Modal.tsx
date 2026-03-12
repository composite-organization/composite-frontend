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
    <div className="flex flex-col items-center justify-between w-[500px] h-auto p-8 rounded-4xl bg-black-0 gap-4">
      <div className="flex items-center justify-between w-full h-[52px]">
        <h1 className="h2-semibold">{title}</h1>
        <IconButton iconName="close" shape="circle" onClick={onClose} />
      </div>
      <div className="flex flex-col w-full gap-6">{children}</div>
    </div>
  );
}
export default Modal;

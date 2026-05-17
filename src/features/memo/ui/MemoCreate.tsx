import { useState } from 'react';
import Modal from '@/shared/components/ui/modal/Modal';
import Input from '@/shared/components/ui/input/Input';
import Button from '@/shared/components/ui/button/Button';

export interface MemoCreateData {
  title: string;
  content: string;
}

interface MemoCreateProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: MemoCreateData) => void;
}

function MemoCreate({ isOpen, onClose, onSubmit }: MemoCreateProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    onSubmit({
      title,
      content,
    });
    setTitle('');
    setContent('');
  };

  return (
    <Modal title="메모장" isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-5.5 w-full mt-4">
        <Input
          title="제목"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <div className="flex flex-col gap-1.5 w-full">
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="memo-content" className="h3-semibold text-black-500">
            내용
          </label>
          <textarea
            id="memo-content"
            placeholder="내용을 입력하세요"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            className="w-full h-32 p-3 border border-black-200 rounded-xl body-regular text-black-500 placeholder:text-black-200 focus:outline-none focus:border-blue-500 resize-none"
          />
        </div>
      </div>

      <div className="flex flex-row items-center gap-4 w-full">
        <Button variant="cancel" size="lg" className="flex-1" onClick={onClose}>
          취소
        </Button>
        <Button
          variant="blue"
          size="lg"
          className="flex-1"
          onClick={handleSubmit}
        >
          생성
        </Button>
      </div>
    </Modal>
  );
}

export default MemoCreate;

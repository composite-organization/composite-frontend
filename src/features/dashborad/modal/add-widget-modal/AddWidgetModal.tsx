import Modal from '@/shared/components/ui/modal/Modal';
import AddWidgetCard from '../../ui/add-widget-card/AddWidgetCard';

type WidgetName = 'file' | 'note' | 'quiz' | 'vote' | 'question';

const WIDGET_CARD_INFO = [
  {
    id: 'question',
    title: '질문',
    label: '학생들에게 질문을 받아보세요.',
  },
  {
    id: 'quiz',
    title: '퀴즈',
    label: '간단한 퀴즈로 학생들의 이해도를 확인해보세요.',
  },
  {
    id: 'file',
    title: '강의자료',
    label: '학생들이 수업자료를 확인하고 다운로드할 수 있습니다.',
  },
  {
    id: 'note',
    title: '메모장',
    label: '중요한 내용을 메모하고 학생들과 공유해보세요.',
  },
  {
    id: 'vote',
    title: '투표',
    label: '학생들의 의견을 수집하고 결과를 확인해보세요.',
  },
] as const;

interface AddWidgetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function AddWidgetModal({ isOpen, onClose }: AddWidgetModalProps) {
  const handleClickWidget = (widgetName: WidgetName) => {
    console.log(`${widgetName} 위젯이 클릭되었습니다.`);
    // 여기서 위젯 추가 로직을 실행하거나 onClose()를 호출할 수 있습니다.
  };

  return (
    <Modal title="위젯 추가" isOpen={isOpen} onClose={onClose}>
      <ul className="flex flex-col gap-[10px]">
        {WIDGET_CARD_INFO.map((widget) => (
          <li key={widget.id}>
            <AddWidgetCard
              widgetName={widget.id}
              title={widget.title}
              label={widget.label}
              onClick={() => handleClickWidget(widget.id)}
            />
          </li>
        ))}
      </ul>
    </Modal>
  );
}

export default AddWidgetModal;

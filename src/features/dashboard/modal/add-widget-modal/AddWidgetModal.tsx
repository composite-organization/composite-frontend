import Modal from '@/shared/components/ui/modal/Modal';
import AddWidgetCard from '../../ui/add-widget-card/AddWidgetCard';
import { WIDGET_CARD_INFO } from '../../constants/widgetCardInfo';
import { type WidgetName } from '@/shared/types/widget.type';

interface AddWidgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectWidget: (id: WidgetName) => void;
}

function AddWidgetModal({
  isOpen,
  onClose,
  onSelectWidget,
}: AddWidgetModalProps) {
  return (
    <Modal title="위젯 추가" isOpen={isOpen} onClose={onClose}>
      <ul className="flex flex-col gap-[10px]">
        {WIDGET_CARD_INFO.map((widget) => (
          <li key={widget.id}>
            <AddWidgetCard
              widgetName={widget.id}
              title={widget.title}
              label={widget.label}
              onClick={() => onSelectWidget(widget.id)}
            />
          </li>
        ))}
      </ul>
    </Modal>
  );
}

export default AddWidgetModal;

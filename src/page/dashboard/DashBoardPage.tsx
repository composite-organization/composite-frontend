import { useState } from 'react';
import { useParams } from 'react-router-dom';
import DashboardHeader from '@/features/dashboard/ui/dashboard-header/DashboardHeader';
import AddWidgetModal from '@/features/dashboard/modal/add-widget-modal/AddWidgetModal';

function DashBoardPage() {
  const { lessonName = '', teacherName = '' } = useParams<{
    lessonName: string;
    teacherName: string;
  }>();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };
  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
  };
  return (
    <div className="w-full">
      <DashboardHeader
        lessonName={lessonName}
        teacherName={teacherName}
        onOpenModal={handleOpenAddModal}
      />
      <AddWidgetModal isOpen={isAddModalOpen} onClose={handleCloseAddModal} />
    </div>
  );
}

export default DashBoardPage;

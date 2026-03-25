import { useState } from 'react';
import DashboardHeader from '@/features/dashboard/ui/dashboard-header/DashboardHeader';
import AddWidgetModal from '@/features/dashboard/modal/add-widget-modal/AddWidgetModal';

interface DashBoardPageProps {
  lessonName: string;
  teacherName: string;
}

function DashBoardPage({ lessonName, teacherName }: DashBoardPageProps) {
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

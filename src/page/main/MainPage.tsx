import { useState } from 'react';
import EntranceSection from '@/features/main/components/ui/entrance-section/EntranceSection';
import HeroSection from '@/features/main/components/ui/hero-section/HeroSection';
import SectionDivider from '@/features/main/components/ui/section-divider/SectionDivider';
import WidgetDescriptionCard from '@/features/main/components/ui/widget-description-card/WidgetDescriptionCard';
import VideoSection from '@/features/main/components/ui/video-section/VideoSection';
import { WIDGET_DATA } from '@/features/main/data/widgetData';

type SelectedId = 'note' | 'file' | 'quiz' | 'vote' | 'question';

export default function MainPage() {
  const [selectedWidgetId, setSelectedWidgetId] =
    useState<SelectedId>('question');

  return (
    <main className="flex px-30 py-10">
      <div className="flex flex-col items-center  w-[1508px] gap-20">
        <section className="flex w-full h-155 gap-30 justify-between">
          <div className="flex flex-1">
            <VideoSection
              className="h-full w-full"
              selectedId={selectedWidgetId}
            />
          </div>
          <div className="flex flex-col justify-between w-[500px]">
            <HeroSection />
            <EntranceSection />
          </div>
        </section>
        <section className="flex flex-col gap-8 w-full">
          <SectionDivider
            className="flex items-center"
            text="카드를 클릭해 위젯 기능을 미리 확인해보세요"
          />
          <div className="flex justify-between w-full">
            {WIDGET_DATA.map((widget) => (
              <WidgetDescriptionCard
                key={widget.id}
                iconName={widget.id}
                title={widget.title}
                description={widget.description}
                isSelected={selectedWidgetId === widget.id}
                onClick={() => setSelectedWidgetId(widget.id)}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

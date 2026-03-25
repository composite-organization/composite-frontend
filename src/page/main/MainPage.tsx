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
      <div className="flex flex-col items-center w-[1508px] gap-11">
        <section className="flex w-full gap-30">
          <div>
            <VideoSection selectedId={selectedWidgetId} />
          </div>
          <div className="flex flex-col flex-1 gap-10">
            <HeroSection />
            <EntranceSection />
          </div>
        </section>

        <SectionDivider
          className="flex items-center"
          text="카드를 클릭해 위젯 기능을 미리 확인해보세요"
        />

        <section className="flex gap-3 h-[170px] w-[1508px] justify-between">
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
        </section>
      </div>
    </main>
  );
}

import { cn } from '@/lib/utils';
import HeroBadge from '../hero-badge/HeroBadge';

interface HeroSectionProps {
  className?: string;
}

function HeroSection({ className }: HeroSectionProps) {
  return (
    <div className={cn('flex flex-col gap-5', className)}>
      {/* Hero 영역 */}
      <div className="flex flex-col gap-5">
        <h1 className="h1-bold text-black-500">
          수업 도구를 한 화면에,
          <span className="text-blue-300 "> Composite</span>
        </h1>
        <p className="h3-semibold text-black-500">
          흩어진 수업 도구, 이제 하나로 연결하세요.
        </p>
        <div className="flex flex-col body-regular text-black-500 gap-[14px]">
          <div>
            여기저기 흩어져 있어 번거로웠던 수업 도구들을{' '}
            <span className="text-blue-300 body-semibold">하나의 화면</span>에
            담았습니다.
          </div>
          <div>
            질문,투표부터 수업에 필요한 모든 도구를{' '}
            <span className="body-semibold text-blue-300">
              간단하게 추가하고 사용
            </span>
            해보세요.
          </div>
        </div>
      </div>
      {/* Badge 영역 */}
      <div className="flex flex-row gap-3 items-center">
        <HeroBadge badgeName="module" label="위젯형 대시보드" />
        <HeroBadge badgeName="PC" label="웹 PC 수업 환경" />
        <HeroBadge badgeName="chat" label="실시간 피드백" />
      </div>
    </div>
  );
}
export default HeroSection;

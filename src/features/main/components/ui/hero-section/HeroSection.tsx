import { cn } from '@/lib/utils';
import HeroBadge from '../hero-badge/HeroBadge';

const HERO_BADGES = [
  { id: 'module', name: 'module', label: '위젯형 대시보드' },
  { id: 'pc', name: 'PC', label: '웹 PC 수업 환경' },
  { id: 'chat', name: 'chat', label: '실시간 피드백' },
] as const;

interface HeroSectionProps {
  className?: string;
}

function HeroSection({ className }: HeroSectionProps) {
  return (
    <section className={cn('flex flex-col gap-5', className)}>
      <header className="flex flex-col gap-5">
        <h1 className="h1-bold text-black-500 whitespace-nowrap">
          수업 도구를 한 화면에,
          <span className="text-blue-300 "> Composite</span>
        </h1>
        <p className="h3-semibold text-black-500 whitespace-nowrap">
          흩어진 수업 도구, 이제 하나로 연결하세요.
        </p>
        <div className="flex flex-col body-regular text-black-500 gap-3.5">
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
      </header>
      <ul className="flex flex-row items-center gap-3.5">
        {HERO_BADGES.map((badge) => (
          <li key={badge.id}>
            <HeroBadge badgeName={badge.name} label={badge.label} />
          </li>
        ))}
      </ul>
    </section>
  );
}
export default HeroSection;

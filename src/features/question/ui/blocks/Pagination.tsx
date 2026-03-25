import { cn } from '@/lib/utils';
import IconButton from '@/shared/components/ui/icon-button/IconButton';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const PAGE_GROUP_SIZE = 5;

  const currentGroup = Math.floor((currentPage - 1) / PAGE_GROUP_SIZE);

  const startPage = currentGroup * PAGE_GROUP_SIZE + 1;
  const endPage = Math.min(startPage + PAGE_GROUP_SIZE - 1, totalPages);

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  );

  const hasPrevGroup = startPage > 1;
  const hasNextGroup = endPage < totalPages;

  const handlePrev = () => {
    if (hasPrevGroup) onPageChange(startPage - 1);
  };

  const handleNext = () => {
    if (hasNextGroup) onPageChange(endPage + 1);
  };

  return (
    <nav
      className="flex items-center justify-center gap-3 w-fit h-12 mx-auto"
      aria-label="페이지 선택"
    >
      <IconButton
        type="button"
        disabled={!hasPrevGroup}
        onClick={handlePrev}
        iconName={!hasPrevGroup ? 'prev-lite' : 'prev-fill'}
        iconSize={14}
        aria-label="이전 페이지 그룹"
        className="w-8 h-8 p-0"
      />

      <div className="flex items-center gap-3">
        {pages.map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            className={cn(
              'flex items-center justify-center w-7 h-8 rounded-lg transition-all',
              'body-semibold leading-none',
              currentPage === page
                ? 'bg-black-400 text-black-0'
                : 'bg-transparent text-black-300 hover:bg-black-50',
            )}
            aria-current={currentPage === page ? 'page' : undefined}
            aria-label={`${page} 페이지`}
          >
            {page}
          </button>
        ))}
      </div>

      <IconButton
        type="button"
        disabled={!hasNextGroup}
        onClick={handleNext}
        iconName={!hasNextGroup ? 'next-lite' : 'next-fill'}
        iconSize={14}
        aria-label="다음 페이지 그룹"
        className="w-8 h-8 p-0"
      />
    </nav>
  );
}

export default Pagination;

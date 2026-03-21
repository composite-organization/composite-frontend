import { cn } from '@/lib/utils';

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
  const assetPath = 'src/features/question/asset';
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
    <div className="flex items-center justify-center gap-[12px] w-fit h-[48px] mx-auto">
      <button
        type="button"
        disabled={!hasPrevGroup}
        onClick={handlePrev}
        className="flex items-center justify-center w-8 h-8 disabled:cursor-not-allowed transition-all"
      >
        <img
          src={`${assetPath}/${!hasPrevGroup ? 'prev-lite' : 'prev-fill'}.svg`}
          alt="이전 그룹"
        />
      </button>

      <div className="flex items-center gap-[12px]">
        {pages.map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            className={cn(
              'flex items-center justify-center w-7 h-8 rounded-[8px] transition-all',
              'text-[16px] font-semibold leading-none',
              currentPage === page
                ? 'bg-black-400 text-white'
                : 'bg-transparent text-black-300 hover:bg-black-50',
            )}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        type="button"
        disabled={!hasNextGroup}
        onClick={handleNext}
        className="flex items-center justify-center w-8 h-8 disabled:cursor-not-allowed transition-all"
      >
        <img
          src={`${assetPath}/${!hasNextGroup ? 'next-lite' : 'next-fill'}.svg`}
          alt="다음 그룹"
        />
      </button>
    </div>
  );
}

export default Pagination;

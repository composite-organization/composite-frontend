import { useState } from 'react';
import { format } from 'date-fns';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const questionCardVariants = cva(
  'w-122 bg-black-0 border-black-50 rounded-2xl border-1 ',
  {
    variants: {
      state: {
        default: '',
        complete: 'bg-black-50 border-black-100',
      },
    },
    defaultVariants: {
      state: 'default',
    },
  },
);

const likeButtonVariants = cva(
  'flex px-2 py-0 gap-0.5 bg-black-100 rounded-3xl caption-regular',
  {
    variants: {
      state: {
        default: '',
        like: 'bg-widget-question-bg-sel',
      },
    },
    defaultVariants: {
      state: 'default',
    },
  },
);

interface QuestionCardProps extends VariantProps<typeof questionCardVariants> {
  userName: string;
  createAt: Date;
  content: string;
  likeCount: number;
  isCompleted: boolean;
  isLiked: boolean;
  className?: string;

  userId: string;
  currentUserId: string;
  userRole: 'teacher' | 'student';
}

function QuestionCard({
  userName,
  createAt,
  content,
  likeCount,
  isCompleted,
  isLiked,
  className,
  userId,
  currentUserId,
  userRole,
}: QuestionCardProps) {
  const isMyPost = userId === currentUserId;
  const isTeacher = userRole === 'teacher';
  const canShowOptions = isTeacher || isMyPost;

  // const getMenuItems = () => {
  //   if (isTeacher) return ['완료하기', '삭제하기'];
  //   if (isMyPost) return ['수정하기', '삭제하기'];
  //   return [];
  // };

  const [isLike, setIsLike] = useState(isLiked);
  const handleClickLike = () => {
    setIsLike(!isLike);
  };

  return (
    <section
      className={cn(
        questionCardVariants({ state: isCompleted ? 'complete' : 'default' }),
        'group relative transition-all',
        className,
      )}
    >
      <div className="flex justify-between px-[14px] pt-[14px] pb-0 items-top h-6.5">
        <div className="flex p-0 m-0 gap-[10px]">
          <span className="label-regular">{userName}</span>
          <time
            dateTime={createAt.toISOString()}
            className="caption-regular text-black-300"
          >
            {format(createAt, 'yyyy-MM-dd HH:mm')} 작성됨
          </time>
          {isCompleted && (
            <div className="flex px-[5px] gap-0.5 h-3 bg-widget-note-bg-sel text-widget-note-border-sel caption-regular rounded-xl">
              <img
                src="src/features/question/asset/check.svg"
                alt="check"
                width={10}
                height={10}
              />
              완료
            </div>
          )}
        </div>
        {canShowOptions && !isCompleted && (
          <button
            type="button"
            className="opacity-0 flex justify-center items-center px-0.5 rounded-sm  h-[18px]  group-hover:opacity-100 hover:bg-black-50"
            onClick={() => {
              // const menus = getMenuItems();
              // console.log(`${userRole}용 메뉴:`, menus);
            }}
            aria-label="옵션 더보기"
          >
            <img
              src="src/features/question/asset/more.svg"
              alt="more"
              width={18}
            />
          </button>
        )}
      </div>
      <div className="flex flex-col items-start px-[14px] py-[10px] gap-[10px]">
        <p className="description-medium text-black-500">{content}</p>
        <div className="w-full">
          <button
            className={cn(
              likeButtonVariants({ state: isLike ? 'like' : 'default' }),
            )}
            type="button"
            onClick={handleClickLike}
            disabled={isCompleted}
            aria-label={`좋아요 ${likeCount}개`}
          >
            <img
              src={`src/features/question/asset/${isLike ? 'thumbs-up-fill' : 'thumbs-up'}.svg`}
              alt="like"
            />
            {likeCount}
          </button>
        </div>
      </div>
    </section>
  );
}
export default QuestionCard;

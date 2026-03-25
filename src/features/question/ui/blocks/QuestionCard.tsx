import { useState } from 'react';
import { format } from 'date-fns';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import Icon from '@/shared/components/ui/icon/Icon';
import IconButton from '@/shared/components/ui/icon-button/IconButton';
import type { Question } from '../../types/index';

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
  'flex items-center px-2 h-[15px] gap-0.5 bg-black-100 rounded-3xl caption-regular ',
  {
    variants: {
      state: {
        default: '',
        like: 'bg-widget-question-bg-sel text-blue-300',
      },
    },
    defaultVariants: {
      state: 'default',
    },
  },
);

interface QuestionCardProps extends VariantProps<typeof questionCardVariants> {
  question: Question;
  currentUserId: string;
  userRole: 'teacher' | 'student';
  className?: string;
}

function QuestionCard({
  question,
  currentUserId,
  userRole,
  className,
}: QuestionCardProps) {
  const isMyPost = question.userId === currentUserId;
  const isTeacher = userRole === 'teacher';
  const canShowOptions = isTeacher || isMyPost;

  // const getMenuItems = () => {
  //   if (isTeacher) return ['완료하기', '삭제하기'];
  //   if (isMyPost) return ['수정하기', '삭제하기'];
  //   return [];
  // };

  const [isLike, setIsLike] = useState(question.isLiked);
  const handleClickLike = () => {
    setIsLike(!isLike);
  };

  return (
    <section
      className={cn(
        questionCardVariants({
          state: question.isCompleted ? 'complete' : 'default',
        }),
        'group relative transition-all',
        className,
      )}
    >
      <div className="flex justify-between px-3.5 pt-3.5 pb-0 items-top h-6.5">
        <div className="flex p-0 m-0 gap-[10px]">
          <span className="label-regular">{question.userName}</span>
          <time
            dateTime={question.createAt.toISOString()}
            className="caption-regular text-black-300"
          >
            {format(question.createAt, 'yyyy-MM-dd HH:mm')} 작성됨
          </time>
          {question.isCompleted && (
            <div className="flex items-center px-[5px] gap-0.5 h-3 bg-widget-note-bg-sel text-widget-note-border-sel caption-regular rounded-xl">
              <Icon name="check" size={10} alt="check" />
              완료
            </div>
          )}
        </div>
        {canShowOptions && !question.isCompleted && (
          <IconButton
            iconName="question-more"
            iconSize={12}
            className="opacity-0 flex justify-center items-center px-0.5 rounded-sm h-4.5 group-hover:opacity-100 hover:bg-black-50 w-fit"
            onClick={() => {
              // const menus = getMenuItems();
              // console.log(`${userRole}용 메뉴:`, menus);
            }}
            aria-label="옵션 더보기"
          />
        )}
      </div>
      <div className="flex flex-col items-start px-3.5 py-2.5 gap-2.5">
        <p className="description-medium text-black-500">{question.content}</p>
        <div className="w-full">
          <button
            className={cn(
              likeButtonVariants({ state: isLike ? 'like' : 'default' }),
            )}
            type="button"
            onClick={handleClickLike}
            disabled={question.isCompleted}
            aria-label={`좋아요 ${question.likeCount}개`}
          >
            <Icon
              name={isLike ? 'thumbs-up-fill' : 'thumbs-up'}
              size={10}
              alt="like"
            />
            {question.likeCount}
          </button>
        </div>
      </div>
    </section>
  );
}
export default QuestionCard;

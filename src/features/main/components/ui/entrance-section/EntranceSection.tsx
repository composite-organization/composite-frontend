import EntranceForm from '../entrance-form/EntranceForm';
import IconButton from '@/shared/components/ui/icon-button/IconButton';

interface EntranceSectionProps {
  onJoin: (code: string) => void;
  onFind: (code: string) => void;
  onCreate: () => void;
}

function EntranceSection({ onJoin, onFind, onCreate }: EntranceSectionProps) {
  return (
    <div className="flex flex-col pt-5">
      <div className="flex flex-col gap-7">
        <EntranceForm
          id="join-code"
          description="수업 코드를 공유받았다면?"
          title="수업에 참여하기"
          placeholder="수업 코드 입력하기"
          onSubmitCode={onJoin}
        />
        <EntranceForm
          id="find-code"
          description="이미 수업을 만들었다면?"
          title="내 수업 찾기"
          placeholder="수업 코드 입력하기"
          onSubmitCode={onFind}
        />
        <IconButton
          className="bg-blue-300 text-black-0 w-full h-15 rounded-2xl"
          shape="square"
          iconName="add"
          label="새 수업 만들기"
          onClick={onCreate}
        />
      </div>
    </div>
  );
}

export default EntranceSection;

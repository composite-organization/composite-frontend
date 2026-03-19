import { useState } from 'react';
import EntranceForm from '../entrance-form/EntranceForm';

function EntranceSection() {
  const [joinCode, setJoinCode] = useState('');
  const [findCode, setFindCode] = useState('');

  const handleJoin = () => console.log('수업 참여:', joinCode);
  const handleFind = () => console.log('수업 찾기:', findCode);

  return (
    <div className="flex flex-col pt-5">
      <div className="flex flex-col gap-7">
        <EntranceForm
          id="join-code"
          description="수업 코드를 공유받았다면?"
          title="수업에 참여하기"
          placeholder="수업 코드 입력하기"
          value={joinCode}
          onChange={(e) => setJoinCode(e.target.value)}
          onAction={handleJoin}
        />
        <EntranceForm
          id="find-code"
          description="이미 수업을 만들었다면?"
          title="내 수업 찾기"
          placeholder="수업 코드 입력하기"
          value={findCode}
          onChange={(e) => setFindCode(e.target.value)}
          onAction={handleFind}
        />
        <button
          type="button"
          className="w-full px-10 py-4 bg-blue-300 text-black-0 h1-semibold rounded-[16px] cursor-pointer transition-colors hover:bg-black-100"
        >
          + 새 수업 만들기
        </button>
      </div>
    </div>
  );
}

export default EntranceSection;

// 사용자 이름/순위 표시
import React from 'react';
import { useAuthStore } from '@/store/auth';
import { UserInfo } from '@/types/auth';

interface Props {
  user?: UserInfo | null;
}

const UserGreeting: React.FC<Props> = ({ user }) => {
  const authUser = useAuthStore((state) => state.user);
  const displayUser = user || authUser;

  // user 정보가 없을 경우 대비
  if (!displayUser) return null;

  return (
    <div className="w-[277px] flex flex-col items-left space-y-[47px] text-blackText">
      <h1 className="text-[36px] font-bold">{`Hello, ${displayUser.name}!`}</h1>
      <p className="text-[20px]">
        이번 주 순위는{' '}
        <span className="font-bold text-[24px] bg-green-200 px-0.5 py-1">
          {displayUser.rank ?? '0'}위
        </span>{' '}
        입니다!
      </p>
    </div>
  );
};

export default UserGreeting;

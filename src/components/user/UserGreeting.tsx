// 사용자 이름/순위 표시
import React from 'react';

const UserGreeting: React.FC = () => {
  const user = {
    name: '이주희',
    rank: 5,
  };

  return (
    <div className="w-[277px] flex flex-col items-left space-y-[47px] text-blackText">
      <h1 className="text-[36px] font-bold">{`Hello, ${user.name}!`}</h1>
      <p className="text-[20px]">
        이번 주 순위는{' '}
        <span className="font-bold text-[24px] bg-green-200 px-0.5 py-1">
          {user.rank}위
        </span>{' '}
        입니다!
      </p>
    </div>
  );
};

export default UserGreeting;

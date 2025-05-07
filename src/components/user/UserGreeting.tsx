// 사용자 이름/순위 표시
import React from 'react';

const UserGreeting: React.FC = () => {
  const user = {
    name: '이주희',
    rank: 5,
  };

  return (
    <div className="flex flex-col items-center space-y-2 text-blackText">
      <h1 className="text-2xl font-bold">{`Hello, ${user.name}!`}</h1>
      <p className="text-lg">
        이번 주 순위는{' '}
        <span className="font-bold bg-green-200 px-2 py-0.5">
          {user.rank}위
        </span>{' '}
        입니다!
      </p>
    </div>
  );
};

export default UserGreeting;

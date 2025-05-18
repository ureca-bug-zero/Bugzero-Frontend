import iconDelete from '@/assets/icons/modals/icon-delete.svg';
import iconAccept from '@/assets/icons/modals/icon-accept.svg';
import { useState } from 'react';
import clsx from 'clsx';
import { Flex } from '../common/Wrapper';
import { theme } from '../../styles/theme';

interface FriendRequest {
  id: number;
  name: string;
  email: string;
}

const FriendRequestsModal = () => {
  const [requests, setRequests] = useState<FriendRequest[]>([
    { id: 1, name: '이서현', email: 'tjgus9138@naver.com' },
    { id: 2, name: '이서현', email: 'tjgus9138@naver.com' },
    { id: 3, name: '이서현', email: 'tjgus9138@naver.com' },
  ]);

  const handleAccept = (id: number) => {
    // API 연결
    console.log('친구 승인 id: ', id);
    setRequests((prev) => prev.filter((request) => request.id !== id));
  };

  const handleDelete = (id: number) => {
    // API 연결
    console.log('친구 거절 id: ', id);
    setRequests((prev) => prev.filter((request) => request.id !== id));
  };

  return (
    <div
      className={clsx(
        Flex({
          direction: 'column',
          justify: 'start',
          width: 'w-full',
          height: 'h-auto max-h-[101px] tablet:max-h-[154px]',
          // 일단 그냥 최대 임의로 101/154로...
          gap: 'gap-[18px] tablet:gap-[22px]',
        }),
        'overflow-y-auto scrollbar-hide',
      )}
    >
      {requests.map((user) => (
        // 친구 리스트 -> 이름,이메일 / 버튼
        <div
          key={user.id}
          className={clsx(
            Flex({
              justify: 'between',
              width: 'w-full',
              padding: {
                x: 'px-[8px] tablet:px-[12px]',
                y: 'py-[5px] tablet:py-[8px]',
              },
              gap: 'gap-[8px] tablet:gap-[12px]',
            }),
          )}
        >
          {/* 이름 / 이메일 */}
          <div
            className={clsx(
              Flex({
                direction: 'column',
                align: 'start',
              }),
            )}
          >
            {/* 이름 */}
            <div
              className={clsx(
                theme.typo.Label5_Kor,
                theme.textPalette.Secondary,
              )}
            >
              {user.name}
            </div>
            {/* 이메일 */}
            <div
              className={clsx(theme.typo.Label5_Eng, theme.textPalette.Gray1)}
            >
              {user.email}
            </div>
          </div>
          {/* 버튼 -> 거절 / 승인 */}
          <div
            className={clsx(
              Flex({
                justify: 'between',
                width: 'w-[42px]',
                height: 'h-[18px]',
                gap: 'gap-[8px]',
              }),
            )}
          >
            <button
              className={clsx('w-17px', 'h-17px')}
              onClick={() => handleDelete(user.id)}
            >
              <img
                src={iconDelete}
                alt="거절 아이콘"
                className={clsx('w-17px', 'h-17px')}
              />
            </button>
            <button
              className={clsx('w-17px', 'h-17px')}
              onClick={() => handleAccept(user.id)}
            >
              <img
                src={iconAccept}
                alt="승인 아이콘"
                className={clsx('w-17px', 'h-17px')}
              />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FriendRequestsModal;

import iconDelete from '@/assets/icons/modals/icon-delete.svg';
import iconAccept from '@/assets/icons/modals/icon-accept.svg';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Flex } from '../common/Wrapper';
import { theme } from '../../styles/theme';
import { useUserStore } from '../../store/userStore';
import { useMutation } from '@tanstack/react-query';
import {
  acceptFriend,
  getFriendRequests,
  refuseFriend,
} from '../../apis/modal';

interface FriendRequest {
  id: number;
  name: string;
  email: string;
}

const FriendRequestsModal = () => {
  const token = useUserStore((state) => state.token);
  const [requests, setRequests] = useState<FriendRequest[]>([]);

  const { mutate: fetchRequests } = useMutation({
    mutationFn: () => getFriendRequests(token),
    onSuccess: (res) => {
      const mappedRequest = res.data.map((item: any) => ({
        id: item.friendId,
        name: item.friendName,
        email: item.friendEmail,
      }));
      setRequests(mappedRequest);
    },
  });

  const { mutate: acceptRequest } = useMutation({
    mutationFn: (id: number) => acceptFriend(id, token),
    onSuccess: (_, id) => {
      setRequests((prev) => prev.filter((request) => request.id !== id));
    },
  });

  const { mutate: refuseRequest } = useMutation({
    mutationFn: (id: number) => refuseFriend(id, token),
    onSuccess: (_, id) => {
      setRequests((prev) => prev.filter((request) => request.id !== id));
    },
  });

  const handleAccept = (id: number) => {
    console.log('친구 승인 id: ', id);
    acceptRequest(id);
  };

  const handleRefuse = (id: number) => {
    console.log('친구 거절 id: ', id);
    refuseRequest(id);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

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
        'overflow-y-auto',
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
              onClick={() => handleRefuse(user.id)}
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

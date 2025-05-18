import clsx from 'clsx';
import { Flex } from '../common/Wrapper';
import FriendItem from './FriendItem';
import { theme } from '../../styles/theme';
import ModalIcon from '@/assets/icons/home/friend-modal.svg?react';
import { FriendListProps } from '../../types/home';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { friendList } from '../../apis/home';
import { useUserStore } from '../../store/userStore';
import { Link } from 'react-router-dom';

interface ModalTemplateProps {
  openModal: () => void;
}

export default function FriendBox({ openModal }: ModalTemplateProps) {
  const token = useUserStore((state) => state.token);
  const [list, setList] = useState<FriendListProps[]>([]);

  const { isSuccess, data, isError, error } = useQuery({
    queryKey: ['friend_list', token],
    queryFn: () => friendList(token),
  });

  useEffect(() => {
    if (isSuccess && data) {
      setList(data.data);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError && error) {
      console.log(error);
    }
  }, [isError, error]);

  return (
    <div className={clsx(Flex({ direction: 'column' }))}>
      <div
        className={clsx(
          Flex({ justify: 'between', width: 'w-[276px] tablet:w-[292px]' }),
          'mb-[15.14px] tablet:mb-[36px]',
        )}
      >
        <p className={clsx(theme.typo.Heading3_Eng)}>Friends</p>
        <ModalIcon
          className={clsx('fill-primary cursor-pointer')}
          onClick={openModal}
        />
      </div>
      <div
        className={clsx(
          Flex({
            direction: 'column',
            justify: 'start',
            width: 'w-[276px] tablet:w-[292px]',
            height: 'h-[162px] tablet:h-[240px]',
            padding: { x: 'px-[17px] tablet:px-[0px]' },
          }),
          list.length > 0
            ? 'bg-gray-100 overflow-y-scroll scrollbar-hide rounded-[5px] tablet:bg-transparent'
            : 'bg-transparent',
        )}
      >
        {list.length > 0 ? (
          list.map((item, idx) => (
            <Link to={`/${item?.friendId}`}>
              <FriendItem
                key={idx}
                friendName={item?.friendName}
                friendEmail={item?.friendEmail}
              />
            </Link>
          ))
        ) : (
          <p className={clsx(theme.typo.Label3_Kor)}>친구를 추가해보세요!</p>
        )}
      </div>
    </div>
  );
}

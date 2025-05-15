import clsx from 'clsx';
import { Flex } from '../common/Wrapper';
import FriendItem from './FriendItem';
import { theme } from '../../styles/theme';
import ModalIcon from '@/assets/icons/home/friend-modal.svg?react';
// import { useEffect, useState } from "react";

export default function FriendBox() {
  // const [friendList, setFriendList] = useState<FriendItemProps[]>([]);

  const friendList = [
    { name: '노수진', email: 'shtnwls1111@naver.com' },
    { name: '노수진', email: 'shtnwls1111@naver.com' },
    { name: '노수진', email: 'shtnwls1111@naver.com' },
    { name: '노수진', email: 'shtnwls1111@naver.com' },
  ];

  return (
    <div className={clsx(Flex({ direction: 'column' }))}>
      <div
        className={clsx(
          Flex({ justify: 'between', width: 'w-[276px] tablet:w-[292px]' }),
          'mb-[15.14px] tablet:mb-[36px]',
        )}
      >
        <p className={clsx(theme.typo.Heading3_Eng)}>Friends</p>
        <ModalIcon className={clsx('fill-primary')} />
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
          'friendList.length > 0 ? bg-gray-100 overflow-y-scroll scrollbar-hide rounded-[5px] : bg-transparent tablet:bg-transparent',
        )}
      >
        {friendList.length > 0 ? (
          friendList.map((item, idx) => (
            <FriendItem key={idx} name={item.name} email={item.email} />
          ))
        ) : (
          <p className={clsx(theme.typo.Label3_Kor)}>친구를 추가해보세요!</p>
        )}
      </div>
    </div>
  );
}

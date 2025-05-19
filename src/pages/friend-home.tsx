import clsx from 'clsx';
import GreetingBox from '../components/home/GreetingBox';
import { Flex, Position } from '../components/common/Wrapper';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FriendTodoTemplate } from '../components/friend/FriendTodoTemplate';
import FriendCalendarBox from '../components/friend/FriendCalendarBox';
import { useMutation } from '@tanstack/react-query';
import { friendInfo } from '../apis/friend';
import { FriendInfo } from '../types/home';
import { useUserStore } from '../store/userStore';

export default function FriendPage() {
  const params = useParams();
  const token = useUserStore((state) => state.token);
  const [info, setInfo] = useState<FriendInfo>();
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const friendInfoMutation = useMutation({
    mutationFn: friendInfo,
    onSuccess: (data) => {
      setInfo(data.data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    const parsedId = params.friendId ? parseInt(params.friendId, 10) : null;
    friendInfoMutation.mutate({ friendId: parsedId, token: token });
  }, []);

  const handleOpen = () => {
    setIsClicked(true);
  };

  const handleClose = () => {
    setIsClicked(false);
  };

  const line = clsx(
    'border-[1px] h-[500px] border-solid border-gray-200 hidden desktop:block',
  );

  return (
    <div
      className={clsx(
        Position({ position: 'relative' }),
        Flex({
          height: 'desktop:h-[620px]',
          align: 'start',
        }),
        ' overflow-hidden  pt-[5px] mt-[41px] mb-[40.33px] tablet:mt-[60px] tablet:mb-[76.86px] desktop:mt-[112px] desktop:mb-[192px]',
      )}
    >
      <div
        className={clsx(
          Flex({
            direction: 'column',
            height: 'h-full',
            justify: 'start',
            align: 'start',
          }),
          'tablet:mr-[28px] desktop:mr-0',
          'tablet:pl-[80px] desktop:pl-0',
        )}
      >
        <GreetingBox name={info?.name} rank={info?.rank} />
        <FriendCalendarBox handleOpen={handleOpen} friendId={params.friendId} />
      </div>
      <hr className={clsx(line, 'mx-[80px]')}></hr>
      <div
        className={
          (clsx(
            Flex({
              direction: 'column',
              height: 'h-full',
              justify: 'start',
              align: 'start',
            }),
          ),
          'hidden tablet:block')
        }
      >
        <FriendTodoTemplate
          handleClose={handleClose}
          type="friend"
          friendId={params.friendId}
        />
      </div>
      {isClicked && (
        <div
          className={clsx(Position({ position: 'absolute' }), 'tablet:hidden')}
        >
          <FriendTodoTemplate
            handleClose={handleClose}
            type="friend"
            friendId={params.friendId}
          />
        </div>
      )}
    </div>
  );
}

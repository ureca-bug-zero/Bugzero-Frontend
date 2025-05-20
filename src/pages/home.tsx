import clsx from 'clsx';
import CalendarBox from '../components/home/CalendarBox';
import FriendBox from '../components/home/FriendBox';
import GreetingBox from '../components/home/GreetingBox';
import TimerBox from '../components/home/TimerBox';
import TodoTemplate from '../components/todo/TodoTemplate';
import { Flex, Position } from '../components/common/Wrapper';
import { useEffect, useRef, useState } from 'react';
import { useUserStore } from '../store/userStore';
import { useQuery } from '@tanstack/react-query';
import { UserInfo } from '../types/home';
import { userInfo } from '../apis/home';
import { useNavigate } from 'react-router-dom';
import ModalTemplate from '../components/modals/ModalTemplate';
import useModal from '../hooks/useModal';

export default function HomePage() {
  const calendarRef = useRef<{ refetchCalendar: () => void }>(null);
  const navigate = useNavigate();
  const token = useUserStore((state) => state.token);
  const hydrated = useUserStore.persist.hasHydrated();
  const [info, setInfo] = useState<UserInfo>();
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const { isOpen, openModal, closeModal, friendBoxKey } = useModal();

  useEffect(() => {
    if (token === '') {
      navigate('/landing');
    }
  }, [hydrated]);

  //Greeting
  const { data, isSuccess, error, isError } = useQuery({
    queryKey: ['user_info', token],
    queryFn: () => userInfo(token),
    enabled: hydrated,
  });

  useEffect(() => {
    if (isSuccess && data) {
      setInfo(data.data);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError && error) {
      console.log(error);
      navigate('/landing');
    }
  }, [isError, error]);

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
    <>
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
          <CalendarBox ref={calendarRef} handleOpen={handleOpen} />
          <div className="mt-[36.43px] tablet:mt-[52.45px] desktop:hidden">
            <FriendBox key={friendBoxKey} openModal={openModal} />
          </div>
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
          <TodoTemplate
            handleClose={handleClose}
            type="me"
            calRefetch={() => calendarRef.current?.refetchCalendar()}
          />
          <div className="tablet:mt-[63px] desktop:hidden">
            <TimerBox />
          </div>
        </div>
        <hr className={clsx(line, 'mr-[80px]')}></hr>
        <div
          className={clsx(
            Flex({
              direction: 'column',
              gap: 'gap-[83px]',
              height: 'h-full',
              justify: 'start',
              align: 'start',
            }),
            'hidden desktop:flex',
          )}
        >
          <TimerBox />
          <FriendBox key={friendBoxKey} openModal={openModal} />
        </div>
        {isClicked && (
          <div
            className={clsx(
              Position({ position: 'absolute' }),
              'tablet:hidden',
            )}
          >
            <TodoTemplate
              handleClose={handleClose}
              type="me"
              calRefetch={() => calendarRef.current?.refetchCalendar()}
            />
          </div>
        )}
      </div>
      {isOpen && <ModalTemplate isOpen={isOpen} closeModal={closeModal} />}
    </>
  );
}

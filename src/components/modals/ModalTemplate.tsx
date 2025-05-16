import { createPortal } from 'react-dom';
import { Flex, Position } from '../common/Wrapper';
import clsx from 'clsx';

import { useState } from 'react';
import { theme } from '../../styles/theme';

import userIcon from '../../assets/icons/modals/icon-user.svg';
import closeButton from '../../assets/icons/modals/button-close.svg';
import FriendRequestsModal from './FriendRequestsModal';
import FriendAddModal from './FriendAddModal';

interface ModalTemplateProps {
  isOpen: boolean;
  closeModal: () => void;
}

const ModalTemplate = ({ isOpen, closeModal }: ModalTemplateProps) => {
  const [isRequestMode, setIsRequestMode] = useState(true);
  if (!isOpen) return null;

  const toggleButtonStyle = clsx(
    Position({
      position: 'absolute',
    }),
    'w-[20px] tablet:w-[30px]',
    'h-[17px] tablet:h-[26px]',
    theme.bgPalette.White,
    'rounded-[13px] tablet:rounded-[20px]',
    'transition-transform',
    'duration-300',
    isRequestMode
      ? 'ml-[2px] translate-x-[22px] tablet:ml-[3px] tablet:translate-x-[33px]'
      : 'mr-[2px] translate-x-[2px] tablet:mr-[3px] tablet:translate-x-[3px]',
  );

  return createPortal(
    <div
      className={clsx(
        Flex({
          width: 'w-full',
          height: 'h-[100vh]',
        }),
        Position({
          position: 'fixed',
        }),
        'inset-0',
        'bg-secondary/50',
        'animate-fadeIn',
      )}
    >
      {/* 모달 */}
      <div
        className={clsx(
          'w-[360px]',
          'h-[269px]',
          theme.bgPalette.White,
          'rounded-[16px]',
          Position({
            position: 'relative',
          }),
          Flex({
            direction: 'column',
            width: 'w-[360px] tablet:w-[550px]',
            height: 'h-[269px] tablet:h-[410px]',
          }),

          'animate-fadeIn',
        )}
      >
        {/* 닫기 */}
        <button
          onClick={closeModal}
          className={clsx(
            Position({
              position: 'absolute',
              top: 'top-[12px]',
              right: 'right-[13px]',
            }),
          )}
        >
          <img
            src={closeButton}
            alt="닫기 버튼"
            className={clsx('w-[13px] h-[13px]')}
          />
        </button>
        {/* 전체 (고정 / 모달가져오기) */}
        <div
          className={clsx(
            Flex({
              direction: 'column',
              width: 'w-[289px] tablet:w-[442px]',
              height: 'h-auto',
              gap: 'gap-[21px] tablet:gap-[31px]',
              align: 'start',
            }),
          )}
        >
          {/* 상단 고정 (타이틀 / 설명) */}
          <div
            className={clsx(
              Flex({
                direction: 'column',
                gap: 'gap-[20px]',
                width: 'w-full',
                height: 'h-[99px] tablet:h-[150px]',
              }),
            )}
          >
            {/* 타이틀 고정 (제목 + 스위치) */}
            <div
              className={clsx(
                Flex({
                  justify: 'between',
                  padding: {
                    y: 'py-[10px]',
                  },
                  width: 'w-full',
                }),
              )}
            >
              {/* 제목 */}
              <div
                className={clsx(
                  Flex({
                    justify: 'start',
                    gap: 'gap-[20px]',
                  }),
                )}
              >
                <img src={userIcon} className={clsx('pl-[5px]')} />
                <h2 className={clsx(theme.typo.Heading4_Eng)}>
                  {isRequestMode ? 'Confirm Your Requests' : 'Add Your Friends'}
                </h2>
              </div>

              {/* 스위치 */}
              <button
                onClick={() => setIsRequestMode(!isRequestMode)}
                className={clsx(
                  Flex({
                    width: 'w-[46px] tablet:w-[70px]',
                    height: 'h-[21px] tablet:h-[32px]',
                    gap: 'gap-[5px] tablet:gap-[8px]',
                    justify: 'between',
                  }),
                  'rounded-[26px] tablet:rounded-[40px]',
                  theme.bgPalette.Gray2,
                  Position({
                    position: 'relative',
                  }),
                )}
              >
                <span
                  className={clsx(
                    theme.typo.Label8,
                    Position({
                      position: 'absolute',
                    }),
                    Flex({}),
                    isRequestMode
                      ? 'left-[7px] tablet:left-[10px]'
                      : 'right-[7px] tablet:right-[10px]',
                    isRequestMode ? 'opacity-100' : 'opacity-0',
                  )}
                >
                  요청
                </span>
                <div className={toggleButtonStyle}></div>
                <span
                  className={clsx(
                    theme.typo.Label8,
                    Position({
                      position: 'absolute',
                    }),
                    Flex({}),
                    isRequestMode
                      ? 'left-[7px] tablet:left-[10px]'
                      : 'right-[7px] tablet:right-[10px]',
                    isRequestMode ? 'opacity-0' : 'opacity-100',
                  )}
                >
                  수락
                </span>
              </button>
            </div>
            {/* 설명 */}
            <div
              className={clsx(
                Flex({
                  justify: 'start',
                  width: 'w-full',
                  height: 'h-[25px]',
                }),
              )}
            >
              <span className={clsx(theme.typo.Label2_Kor)}>
                {isRequestMode ? (
                  <>
                    친구 요청을 확인해 주세요!
                    <br />
                    친구 요청 수락 시{' '}
                    <span className={clsx(theme.typo.Label2_Bold_Kor)}>
                      친구로 등록
                    </span>
                    됩니다.
                  </>
                ) : (
                  <>
                    친구를 추가해 보세요.
                    <br />
                    친구의 <span>Bug</span>
                    <span className={clsx(theme.textPalette.Primary)}>
                      Zero
                    </span>
                    를 구경할 수 있어요!
                  </>
                )}
              </span>
            </div>
          </div>
          {/* 템플릿 가져오기 */}
          {isRequestMode ? <FriendRequestsModal /> : <FriendAddModal />}
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default ModalTemplate;

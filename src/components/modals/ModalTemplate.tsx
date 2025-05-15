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
    'w-[20px]',
    'h-[17px]',
    theme.bgPalette.White,
    'rounded-[13px]',
    'transition-transform',
    'duration-300',
    isRequestMode
      ? 'ml-[2px] translate-x-[22px]'
      : 'mr-[2px] translate-x-[2px]',
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
              width: 'w-[289px]',
              height: 'h-auto',
              gap: 'gap-[21px]',
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
                height: 'h-[99px]',
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
                    width: 'w-[46px]',
                    height: 'h-[21px]',
                    gap: 'gap-[5px]',
                    justify: 'between',
                  }),
                  'rounded-[26px]',
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
                    isRequestMode ? 'left-[7px]' : 'right-[7px]',
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
                    isRequestMode ? 'left-[7px]' : 'right-[7px]',
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
                친구 요청을 확인해주세요!
                <br />
                친구 요청 수락 시{' '}
                <span className={clsx(theme.typo.Label2_Bold_Kor)}>
                  친구로 등록
                </span>{' '}
                됩니다.
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

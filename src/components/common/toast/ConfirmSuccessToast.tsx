import clsx from 'clsx';
import { ToastContentProps } from 'react-toastify';
import { Flex } from '../Wrapper';
import successIcon from '../../../assets/icons/modals/toast-success.svg';
import { theme } from '../../../styles/theme';

const CustomSuccessToast = ({ closeToast }: ToastContentProps) => {
  return (
    <div
      className={clsx(
        Flex({
          justify: 'between',
          // width: 'w-[190px] tablet:w-[333px]',
          // height: 'h-[39px] tablet:h-[64px]',

          width: 'w-full',
          height: 'h-full',
        }),
        'pl-[7px] tablet:pl-[12px]',
        'bg-success/10',
        // 'rounded-md',
      )}
    >
      <div
        className={clsx(
          Flex({
            gap: 'gap-[5px] tablet:gap-[12px]',
          }),
          theme.textPalette.Secondary,
        )}
      >
        <img
          src={successIcon}
          alt="toast success 아이콘"
          className={clsx(
            'w-[15px] tablet:w-[20px]',
            'h-[15px] tablet:h-[20px]',
          )}
        />
        <span className={clsx(theme.typo.Label7)}>친구 요청을 보냈습니다!</span>
      </div>
      <button
        onClick={closeToast}
        className={clsx(theme.textPalette.Gray1, 'hover:text-gray-200')}
      ></button>
    </div>
  );
};

export default CustomSuccessToast;

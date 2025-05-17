import clsx from 'clsx';
import { ToastContentProps } from 'react-toastify';
import { Flex } from '../Wrapper';
import errorIcon from '../../../assets/icons/modals/toast-error.svg';
import { theme } from '../../../styles/theme';

const CustomErrorToast = ({ closeToast }: ToastContentProps) => {
  return (
    <div
      className={clsx(
        Flex({
          justify: 'between',
          width: 'w-[190px] tablet:w-[333px]',
          height: 'h-[39px] tablet:h-[64px]',
        }),
        'pl-[7px] tablet:pl-[12px]',
        theme.bgPalette.Error,
        'rounded-md',
        'shadow-md',
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
          src={errorIcon}
          alt="toast error"
          className={clsx('w-[20px] h-[20px]')}
        />
        <span className={clsx(theme.typo.Label7)}>
          친구 요청에 실패했습니다.
        </span>
      </div>
      <button
        onClick={closeToast}
        className={clsx(theme.textPalette.Gray1, 'hover:text-gray-200')}
      ></button>
    </div>
  );
};

export default CustomErrorToast;

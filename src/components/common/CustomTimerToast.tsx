import { ToastContentProps } from 'react-toastify';

interface CustomToastProps extends Partial<ToastContentProps> {
  type: 'success' | 'error';
  message: string;
  icon?: string;
}

const CustomTimerToast = ({
  type,
  message,
  icon,
  closeToast,
}: CustomToastProps) => {
  const bgColor = type === 'success' ? 'bg-primary-200' : 'bg-error-200';
  const defaultIcon =
    type === 'success'
      ? '/public/icons/toast-success.svg'
      : '/public/icons/toast-error.svg';

  return (
    <div
      className={`flex items-center justify-between ${bgColor} px-5 py-3 rounded-md shadow-md min-w-[320px] min-h-[64px]`}
    >
      <div className="flex items-center gap-2 font-pretendard">
        <img
          src={icon || defaultIcon}
          alt={`${type} toast`}
          className="w-5 h-5"
        />
        <span className="text-secondary-600 text-s font-[16px] whitespace-pre-line">
          {message}
        </span>
      </div>
      <button
        onClick={closeToast}
        className="text-secondary-500 hover:text-secondary-200"
      ></button>
    </div>
  );
};

export default CustomTimerToast;

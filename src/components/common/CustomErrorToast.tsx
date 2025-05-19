import { ToastContentProps } from 'react-toastify';
import toastError from '@/assets/toast-error.svg';

const CustomErrorToast = ({ closeToast }: ToastContentProps) => {
  return (
    <div className="flex items-center justify-between bg-error-200 px-5 py-3 rounded-md shadow-md min-w-[320px] min-h-[64px]">
      <div className="flex items-center gap-2 font-pretendard">
        <img src={toastError} alt="toast error" className="w-5 h-5" />
        <span className="text-secondary-600 text-s font-[16px]">
          친구 요청에 실패했습니다.
        </span>
      </div>
      <button
        onClick={closeToast}
        className="text-secondary-500 hover:text-secondary-200"
      ></button>
    </div>
  );
};

export default CustomErrorToast;

import toastSuccess from '@/assets/toast-success.svg';

const CustomSuccessToast = () => {
  return (
    <div className="flex items-center justify-between bg-primary-200 px-5 py-3 rounded-md shadow-md min-w-[320px] min-h-[64px]">
      <div className="flex items-center gap-2 font-pretendard">
        <img src={toastSuccess} alt="toast success" className="w-5 h-5" />
        <span className="text-secondary-600 text-sm font-[16px]">
          친구 요청을 보냈습니다!
        </span>
      </div>
    </div>
  );
};

export default CustomSuccessToast;

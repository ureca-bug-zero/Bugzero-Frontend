import clsx from 'clsx';
import { Flex } from '../common/Wrapper';
import { theme } from '../../styles/theme';
import { toast } from 'react-toastify';
import ConfirmSuccessToast from '../common/toast/ConfirmSuccessToast';
import ConfirmFailToast from '../common/toast/ConfirmFailToast';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { addFriend } from '../../apis/modal';
import { useUserStore } from '../../store/userStore';

const FriendAddModal = () => {
  const [email, setEmail] = useState('');
  const token = useUserStore((state) => state.token);

  const { mutate: requestFriend } = useMutation({
    mutationFn: () => addFriend(email, token),
    onSuccess: () => {
      toast((props) => <ConfirmSuccessToast {...props} />, {
        className: 'p-0 m-0',
      });
      setEmail('');
    },
    onError: (error: any) => {
      console.log(error);

      const message = error.response?.data?.message;

      let toastMessage = '친구 요청에 실패했습니다.';
      if (message === '이미 존재하는 요청입니다.') {
        toastMessage = '이미 존재하는 요청입니다.';
      } else if (message === '해당 이메일을 가진 유저가 존재하지 않습니다.') {
        toastMessage = '존재하지 않는 사용자입니다.';
      }

      toast((props) => <ConfirmFailToast {...props} message={toastMessage} />, {
        className: 'p-0 m-0',
      });
    },
  });

  const handleSubmit = () => {
    console.log('친구 요청 시도: ', email);
    if (!email.trim()) {
      toast.error('이메일을 입력해 주세요!');
      return;
    }
    requestFriend();
  };

  return (
    <div
      className={clsx(
        Flex({
          direction: 'column',
          justify: 'start',
          gap: 'gap-[16px] tablet:gap-[24px]',
          width: 'w-full',
          height: 'h-[101px] tablet:h-[154px]',
        }),
      )}
    >
      <div
        className={clsx(
          Flex({
            width: 'w-full',
            height: 'h-[50px] tablet:h-[75px]',
            padding: {
              x: 'px-[15px] tablet:px-[22px]',
              y: 'py-[18px] tablet:py-[28px]',
            },
          }),
          'border',
          'border-gray-700',
          'border-solid',
          'rounded-[6px] tablet:rounded-[10px]',
          'bg-white',
        )}
      >
        <input
          type="text"
          placeholder="이메일을 입력해 주세요."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={clsx(
            'w-full',
            'h-full',
            'bg-transparent',
            'border-none',
            'outline-none',
            theme.typo.Label5_Kor,
            theme.textPalette.Gray1,
          )}
        />
      </div>
      <button
        className={clsx(
          Flex({
            width: 'w-full',
            height: 'h-[36px] tablet:h-[55px]',
          }),
          'rounded-[6px] tablet:rounded-[10px]',
          theme.typo.Label1_Eng,
          theme.textPalette.White,
          theme.bgPalette.Primary,
        )}
        onClick={handleSubmit}
      >
        Confirm
      </button>
    </div>
  );
};

export default FriendAddModal;

import clsx from 'clsx';
import { Flex } from '../common/Wrapper';
import { theme } from '../../styles/theme';
import { toast } from 'react-toastify';
import ConfirmSuccessToast from '../common/toast/ConfirmSuccessToast';
import ConfirmFailToast from '../common/toast/ConfirmFailToast';
import { useState } from 'react';
import { addFriend } from '../../apis/modal';
import { useUserStore } from '../../store/userStore';
import { useMutation } from '@tanstack/react-query';

const FriendAddModal = () => {
  const [email, setEmail] = useState('');
  const token = useUserStore((state) => state.token);

  const { mutate: requestFriend } = useMutation({
    mutationFn: () => addFriend(email, token),
    onSuccess: () => {
      toast((props) => <ConfirmSuccessToast {...props} />, {
        className:
          'p-0 m-0 w-[190px] tablet:w-[333px] h-[33px] tablet:h-[64px] rounded-md',
      });
      setEmail('');
    },
    onError: (error) => {
      console.log(error);
      toast((props) => <ConfirmFailToast {...props} />);
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

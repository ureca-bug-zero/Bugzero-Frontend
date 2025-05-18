import clsx from 'clsx';
import { Flex } from '../common/Wrapper';
import { theme } from '../../styles/theme';
import { FriendItemProps } from '../../types/home';
import DeleteIcon from '@/assets/icons/home/friend-delete.svg?react';
import { useMutation } from '@tanstack/react-query';
import { deleteFriend } from '../../apis/home';
import { useUserStore } from '../../store/userStore';

export default function FriendItem({
  friendName,
  friendEmail,
  friendId,
}: FriendItemProps) {
  const token = useUserStore((state) => state.token);

  const deleteFriendMutation = useMutation({
    mutationFn: deleteFriend,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    deleteFriendMutation.mutate({ friendId: friendId, token: token });
  };

  return (
    <div
      className={clsx(
        Flex({
          wrap: 'wrap',
          width: 'w-[282px] tablet:w-[290px] ',
          height: 'min-h-[54px] tablet:min-h-[80px]',
        }),
        'cursor-pointer tablet:hover:bg-gray-100 tablet:rounded-[5px]',
      )}
    >
      <div
        className={clsx(
          Flex({
            width: 'w-[88px] tablet:w-[250px] ',
            justify: 'between',
          }),
        )}
      >
        <p
          className={clsx(
            Flex({
              justify: 'start',
              align: 'center',
              width: 'w-[full] tablet:w-[290px]',
              height: 'h-[30px]',
            }),
            theme.typo.Label3_Kor,
            'break-all',
          )}
        >
          {friendName}
        </p>
        <DeleteIcon className="hidden tablet:block" onClick={handleDelete} />
      </div>
      <div
        className={clsx(
          Flex({
            width: 'w-[154px] tablet:w-[250px] ',
            justify: 'between',
          }),
        )}
      >
        <p
          className={clsx(
            Flex({
              justify: 'start',
              align: 'center',
              width: 'w-[135px] tablet:w-[290px]',
              height: 'h-[30px]',
            }),
            theme.typo.Label3_Eng,
            theme.textPalette.Gray1,
            'tablet:-translate-y-[4px] break-all leading-0 tablet:h-[30px]',
          )}
        >
          {friendEmail}
        </p>
        <DeleteIcon className="tablet:hidden" onClick={handleDelete} />
      </div>
    </div>
  );
}

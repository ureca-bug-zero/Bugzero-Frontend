import clsx from 'clsx';
import { Flex } from '../common/Wrapper';
import { theme } from '../../styles/theme';
import { FriendItemProps } from '../../types/home';
import DeleteIcon from '@/assets/icons/home/friend-delete.svg?react';

export default function FriendItem({
  friendName,
  friendEmail,
}: FriendItemProps) {
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
        <DeleteIcon className="hidden tablet:block" />
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
        <DeleteIcon className="tablet:hidden" />
      </div>
    </div>
  );
}

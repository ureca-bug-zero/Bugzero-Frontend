import clsx from 'clsx';
import { Flex } from '../common/Wrapper';
import { theme } from '../../styles/theme';
import { FriendItemProps } from '../../types/home';

export default function FriendItem({
  friendName,
  friendEmail,
}: FriendItemProps) {
  return (
    <div
      className={clsx(
        Flex({
          wrap: 'wrap',
          width: 'w-[242px] tablet:w-[250px] ',
          height: 'min-h-[54px] tablet:min-h-[80px]',
          padding: { x: 'tablet:px-[20px]' },
        }),
        'cursor-pointer tablet:hover:bg-gray-100 tablet:rounded-[5px]',
      )}
    >
      <p
        className={clsx(
          Flex({
            justify: 'start',
            align: 'center',
            width: 'w-[56px] tablet:w-[290px]',
            height: 'h-[30px]',
          }),
          theme.typo.Label3_Kor,
          'break-al',
        )}
      >
        {friendName}
      </p>
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
          'ml-[51px] tablet:-translate-y-[4px] break-all leading-0 tablet:h-[30px] tablet:ml-[0px]',
        )}
      >
        {friendEmail}
      </p>
    </div>
  );
}

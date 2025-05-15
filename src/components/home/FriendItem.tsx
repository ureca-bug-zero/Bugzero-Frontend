import clsx from "clsx";
import { Flex } from "../common/Wrapper";
import { theme } from "../../styles/theme";

interface FriendItemProps {
  name: string;
  email: string;
}

export default function FriendItem({ name, email }: FriendItemProps) {
  return (
    <div className={clsx(Flex({wrap: 'wrap', width: 'w-[242px] tablet:w-[250px] ', height: 'min-h-[54px] tablet:min-h-[80px]', padding: { x: 'tablet:px-[20px]' } }), 'tablet:hover:bg-gray-100 rounded-[5px]')}>
      <p className={clsx(Flex({wrap: 'wrap', justify: 'start', align: 'center', width: 'w-[56px] tablet:w-[290px]', height: 'h-[30px]'}), theme.typo.Label3_Kor)}>{name}</p>
      <p className={clsx(Flex({wrap: 'wrap', justify: 'start', align: 'center', width: 'w-[135px] tablet:w-[290px]', height: 'h-[30px]'}), theme.typo.Label3_Eng, theme.textPalette.Gray1, 'ml-[51px] tablet:-translate-y-[4px] h-[30px] ml-[0px]')}>{email}</p>
    </div>);
}
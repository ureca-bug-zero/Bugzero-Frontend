import clsx from "clsx";
import { Flex } from "../common/Wrapper";
import { theme } from "../../styles/theme";

interface FriendItemProps {
  name: string;
  email: string;
}

export default function FriendItem({ name, email }: FriendItemProps) {
  return (
    <div className={clsx(Flex({ direction: 'column', align: 'start', width: 'w-[250px]', height: 'h-[80px]', padding: { x: 'px-[20px]' } }), 'hover:bg-gray-100 rounded-[5px]')}>
      <p className={clsx(Flex({justify: 'start', width: 'w-full', height: 'h-[30px]'}), theme.typo.Label3_Kor,)}>{name}</p>
      <p className={clsx(Flex({justify: 'start', width: 'w-full', height: 'h-[30px]'}), theme.typo.Label3_Eng, theme.textPalette.Gray1, '-translate-y-[4px] h-[30px]')}>{email}</p>
    </div>);
}
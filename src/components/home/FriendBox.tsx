import clsx from "clsx";
import { Flex } from "../common/Wrapper";
import FriendItem, { FriendItemProps } from "./FriendItem";
import { theme } from "../../styles/theme";
import { useState } from "react";

export default function FriendBox() {
  const [friendList, setFriendList] = useState<FriendItemProps[]>([]);

  return (
    <div className={clsx(Flex({ direction: 'column', justify: 'start', width: 'w-[276px] tablet:w-[292px]', height: 'h-[162px] tablet:h-[240px]', padding: {x: 'px-[17px] tablet:px-[0px]'} }), 'friendList.length > 0 ? bg-gray-100 overflow-y-scroll scrollbar-hide rounded-[5px] : bg-transparent tablet:bg-transparent')}>
      {friendList.length > 0 ? friendList.map((item, idx) => (
        <FriendItem key={idx} name={item.name} email={item.email}/>)
      ) : (<p className={clsx(theme.typo.Label3_Kor)}>친구를 추가해보세요!</p>)}
    </div>
  )
}
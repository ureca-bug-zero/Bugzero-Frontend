import clsx from "clsx";
import { Flex } from "../common/Wrapper";
import FriendItem from "./FriendItem";

const friendList = [
  { name: '노수진', email: 'shtnwls1111@naver.com' },
  { name: '노수진', email: 'shtnwls1111@naver.com' },
  { name: '노수진', email: 'shtnwls1111@naver.com' },
  { name: '노수진', email: 'shtnwls1111@naver.com' },
]

export default function FriendBox() {

  return (
    <div className={clsx(Flex({ direction: 'column', justify: 'start', width: 'w-[276px] tablet:w-[292px]', height: 'h-[162px] tablet:h-[240px]', padding: {x: 'px-[17px] tablet:px-[0px]'} }), 'bg-gray-100 overflow-y-scroll scrollbar-hide rounded-[5px] tablet:bg-transparent')}>
      {friendList.map((item, idx) => (
        <FriendItem key={idx} name={item.name} email={item.email}/>)
      )}
    </div>
  )
}
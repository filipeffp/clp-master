import { GiWhiteBook } from "react-icons/gi";

export default function Header() {
  return (
    <div className='fixed w-full h-[100px] flex items-center pl-[60px] shadow-lg z-10 bg-white gap-[5px]'>
      <GiWhiteBook className="text-azulPadrao text-[54px]"/>
      <h1 className='text-[54px] text-azulPadrao'>CLP</h1>
    </div>
  )
}





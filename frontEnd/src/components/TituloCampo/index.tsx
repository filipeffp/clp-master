import { ReactNode } from "react"

interface TituloCampoProps{
  children: ReactNode
}

export default function TituloCampo({children}:TituloCampoProps) {
  return (
    <h4 className='text-azulPadrao text-[16px] font-medium mb-[10px]'>{children}</h4>
  )
}

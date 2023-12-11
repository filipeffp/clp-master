import { ReactNode } from "react"

interface TituloCampoProps{
  children: ReactNode
}

export default function CampoTexto({children}:TituloCampoProps) {
  return (    
        <p className="h-[35px] bg-[#D9D9D9] text-[#1D5FA3] text-opacity-50 text-[18px] flex items-center rounded-xl pl-[15px] font-light">{children ?? "Não definido"}</p>    
  )
}

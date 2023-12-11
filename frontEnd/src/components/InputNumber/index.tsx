import { Input } from "@/components/ui/input"
import React, { ChangeEvent } from 'react';

interface SelectTextProps {
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>> 
  placeholder?: string
  estilos?: string
}

export default function InputNumber({ value, setValue, placeholder, estilos}: SelectTextProps) {

  const modificaInput = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  return (    
      <Input        
        className={estilos}
        placeholder={placeholder}
        type="number"        
        value={value}
        onChange={modificaInput}
      />    
  )
}
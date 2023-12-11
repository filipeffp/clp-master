import { Input } from "@/components/ui/input"
import React, { ChangeEvent } from 'react';

interface SelectTextProps {
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>    
}

export default function InputText({ value, setValue}: SelectTextProps) {

  const modificaInput = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  return (    
      <Input         
        type="text"        
        value={value}
        onChange={modificaInput}
      />    
  )
}
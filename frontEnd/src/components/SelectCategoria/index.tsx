import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,  
  SelectTrigger,
  SelectValue,  
} from "@/components/ui/select"

interface SelectCategoriaProps {  
  selectedValue: string
  setSelectedValue: React.Dispatch<React.SetStateAction<string>>
}

const options = ["Romance", "Ficção científica", "Fantasia", "Terror", "Suspense", "Drama", "Comédia", "Biografia", "Autobiografia", "Fábula", "Aventura", "Infantil  "]
 
export default function SelectCategoria({selectedValue, setSelectedValue}:SelectCategoriaProps) {

  const selectChange = (event:string) => {
    setSelectedValue(event);
  }

  return (    
    <Select value={selectedValue} onValueChange={selectChange}>
      <SelectTrigger className="w-[200px] h-[30px] text-azulPadrao shadow-xl border-cinzaClaro rounded-xl font-semibold">
        <SelectValue placeholder="Selecione a categoria" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>          
          {options.map((item, index) => (
            <SelectItem key={index} className='text-azulPadrao' value={item}>{item}</SelectItem>
          ))}          
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
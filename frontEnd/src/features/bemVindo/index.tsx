import HeaderNaoLogado from "@/components/HeaderNaoLogado";


import pessoaLendo from '../../assets/pessoaLendo.png'
export default function BemVindo() {
    return (
        <section>
            <HeaderNaoLogado />
            <div className="pt-[100px]" />
            <div className="w-full h-[350px] bg-gradient-to-r from-azulPadrao to-[#add8e6]  flex items-center justify-between">

                <div className="flex flex-col items-center">
                    <h2 className="text-white text-[32px] font-bold ml-[75px]">Bem vindo ao CLP</h2>
                    <h3 className="text-white text-[28px] font-bold ml-[75px]">A melhor plataforma para controlar suas leituras</h3>
                </div>

                <img src={pessoaLendo} className="w-[275px] mr-[70px]" />
            </div>
            <div className="flex justify-around items-center mt-[100px]">
                <div className="flex flex-col items-center ">
                    <h3 className="font-bold text-azulPadrao text-[24px]">Aqui você consegue:</h3>
                    <ul className="list-disc mt-[15px]">
                        <li className="text-azulPadrao">Adicionar seus livros</li>
                        <li className="text-azulPadrao">Controlar seu progresso</li>
                        <li className="text-azulPadrao">Adicionar metas</li>
                        <li className="text-azulPadrao">Escrever anotações</li>
                        <li className="text-azulPadrao">Acompanhar estatísticas de leitura</li>
                    </ul>
                </div>
                <div className="flex flex-col">
                    <h4 className="text-azulPadrao text-[32px] font-bold text-center">Vamos lá!</h4>
                    <h4 className="text-azulPadrao text-[32px] font-bold text-center">Não perca tempo e se junte a nós!</h4>
                </div>
            </div>
        </section>
    )
}

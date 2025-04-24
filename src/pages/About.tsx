import { InformationCircleIcon } from '@heroicons/react/16/solid';
import { Menu } from '../components/Menu';
import { useState } from "react";


export function About() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);


    const handleToggleMenu = (isOpen: boolean) => {
        setIsMenuOpen(isOpen);
    };

    return (
        <div className="h-screen bg-gray-100">
            <Menu onToggleMenu={handleToggleMenu} />

            <div className={"flex-1 trasition-all duration-300 pl-14 pt-4"} style={{ marginLeft: isMenuOpen ? "11rem" : "1rem" }}>
                <h1 className='flex justify-center xl:justify-start xl:text-2xl font-extrabold p-2 text-gray-700 gap-2'>
                    Sobre o Projeto <InformationCircleIcon className='w-6'></InformationCircleIcon>
                </h1>
                <div className="grid grid-cols-3 gap-5 items-center w-full p-5">

                    <div className='bg-gray-100 shadow-2xl h-[300px] w-[250px] flex flex-col  items-center  rounded-lg'>
                        <h1 className='text-center text-lg font-bold p-2'>Objetivo do Projeto</h1>
                        <p className='text-center p-2'>Este projeto acadêmico tem como objetivo principal desenvolver uma calculadora que estima as
                            emissões de CO₂ equivalente (CO₂eq) associadas a diferentes fontes de energia,
                            promovendo uma maior conscientização sobre o impacto ambiental do consumo energético.
                        </p>
                    </div>

                    <div className='bg-gray-100 shadow-2xl h-[300px] w-[250px] flex flex-col  items-center  rounded-lg'>
                        <h1 className='text-center text-lg font-bold p-2'>Como Funciona a Calculadora </h1>
                        <p className='text-center p-2'> O usuário informa a quantidade de energia consumida e a fonte utilizada (como carvão, gás natural, solar, eólica etc).
                            Com base nesses dados, a calculadora estima a emissão de CO₂eq de forma automática.
                        </p>
                    </div>

                    <div className='bg-gray-100 shadow-2xl h-[300px] w-[250px] flex flex-col  items-center  rounded-lg'>
                        <h1 className='text-center text-lg font-bold p-2'>Fontes de Dados </h1>
                        <p className='text-center p-2'> Os cálculos são baseados em fatores de emissão reconhecidos por instituições confiáveis como o IPCC e a IEA, 
                            garantindo precisão e embasamento científico nos resultados apresentados.
                        </p>
                    </div>

                    <div className='bg-gray-100 shadow-2xl h-[300px] w-[250px] flex flex-col  items-center  rounded-lg'>
                        <h1 className='text-center text-lg font-bold p-2'>Comparativo Entre Fontes </h1>
                        <p className='text-center p-2'> A aplicação também apresenta um comparativo visual entre as fontes de energia selecionadas, permitindo que o 
                            usuário compreenda quais delas são mais sustentáveis em termos de emissões.
                        </p>
                    </div>

                    <div className='bg-gray-100 shadow-2xl h-[300px] w-[250px] flex flex-col  items-center  rounded-lg'>
                        <h1 className='text-center text-lg font-bold p-2'>Aplicabilidade </h1>
                        <p className='text-center p-2'>A ferramenta pode ser usada por estudantes, profissionais ou qualquer pessoa interessada em entender melhor o 
                            impacto ambiental do uso de energia, apoiando escolhas mais conscientes e sustentáveis.
                        </p>
                    </div>

                    <div className='bg-gray-100 shadow-2xl h-[300px] w-[250px] flex flex-col  items-center  rounded-lg'>
                        <h1 className='text-center text-lg font-bold p-2'> Continuidade do Projeto </h1>
                        <p className='text-center p-2'> Este projeto está em constante evolução. Futuramente, pretendemos incluir sugestões de substituição energética, 
                            estimativas econômicas e integração com bancos de dados externos.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
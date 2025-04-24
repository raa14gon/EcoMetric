import { Menu } from '../components/Menu';
import { useState } from "react";


export function Home() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);


    const handleToggleMenu = (isOpen: boolean) => {
        setIsMenuOpen(isOpen);
    };

    return (
        <div className="h-screen overflow-y-auto">
            <Menu onToggleMenu={handleToggleMenu} />

            <div className={"flex-1 trasition-all duration-300 pl-14 pt-4"} style={{ marginLeft: isMenuOpen ? "11rem" : "1rem" }}>
                <div className='flex flex-col justify-center items-center h-screen w-full gap-5'>
                    <div className="flex justify-center items-center  text-center w-[80%] p-5">
                        <h1 className='text-lg'>Bem-vindo à plataforma desenvolvida para Calcular a Emissão de Carbono nas fontes energéticas.
                            Criamos esta aplicação para oferecer aos Usuários da GreenData uma visão clara, interativa
                            e poderosa das suas operações.
                        </h1>
                    </div>
                    <div className='bg-gray-100 shadow-2xl h-[200px] w-[200px] flex flex-col  items-center  rounded-lg'>
                        <h1 className='text-center text-lg font-bold p-2'>Calculadora de Emissão de Carbono</h1>
                        <p className='text-center p-2'>Calcule a emissao de CO₂eq nas fontes energéticas e compare-as.</p>
                    </div>
                    <div className='bg-gray-100 shadow-2xl h-[200px] w-[200px] flex flex-col  items-center  rounded-lg'>
                        <h1 className='text-center text-lg font-bold p-2'>Ecologicamente</h1>
                        <p className='text-center p-2'>Veja ecologicamente falando uma nova visão ecologica sobre as fontes energéticas.</p>
                    </div>
                    <div className="flex justify-center items-center w-[80%] text-center p-5 ">
                        <p>Transforme dados complexos em insights claros e objetivos. Nossa aplicação foi projetada para otimizar sua performance operacional e estratégica.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
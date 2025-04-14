import { CalculatorIcon } from '@heroicons/react/24/outline';
import { Menu } from '../components/Menu';
import { useState } from "react";
import { fontesEnergia } from '../utils/calculationUtils';
import { ResultadoCalculo } from '../utils/types/types';
import { FonteEnergia } from '../utils/types/types';




interface InputFormProps {
    consumoEnergia: { [key: string]: number };
    setConsumoEnergia: React.Dispatch<React.SetStateAction<{ [key: string]: number }>>;
    calcularEmissoes: () => void;
}

export function Calculator() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [consumoEnergia, setConsumoEnergia] = useState<{ [key: string]: number }>({});
    const [modalResultados, setModalResultados] = useState(false);
    const [resultados, setResultados] = useState<ResultadoCalculo[]>([]);
    const [emissaoTotal, setEmissaoTotal] = useState(0);
    const calcular = () => {
        const { resultados, emissaoTotal } = calcularEmissoes(consumoEnergia);
        setResultados(resultados);
        setEmissaoTotal(emissaoTotal);
    };
    const InputForm: React.FC<InputFormProps> = ({ consumoEnergia, setConsumoEnergia, calcularEmissoes }) => {
        const handleInputChange = (fonte: string, valor: number) => {

            setConsumoEnergia(prev => ({
                ...prev,
                [fonte]: valor
            }));
        };

        return (
            <section className="bg-white rounded-lg shadow-md border border-[#BDC3C7] p-6 mb-8">
                <h2 className="text-2xl font-bold text-[#2C3E50] mb-6 pb-2 border-b-2 border-[#BDC3C7]">
                    Inserir Consumo de Energia (kWh)
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {fontesEnergia.map((fonte) => (
                        <div key={fonte.id} className="mb-4">
                            <label className="mb-2 font-semibold text-[#2C3E50] flex items-center">
                                <span className="mr-2 text-[#4CAF50]">{fonte.icone}</span>
                                {fonte.nome}
                            </label>
                            <input
                                type="number"
                                min="0"
                                value={consumoEnergia[fonte.id] || ''}
                                onChange={(e) => handleInputChange(fonte.id, parseFloat(e.target.value) || 0)}
                                className="w-full p-3 border border-[#BDC3C7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
                                placeholder={`Consumo em kWh`}
                            />
                        </div>
                    ))}
                </div>

                <button
                    onClick={() => setModalResultados(true)}
                    className="mt-6 bg-[#4CAF50] hover:bg-[#3d8b40] text-white font-bold py-3 px-6 rounded-md transition-colors"
                >
                    Calcular Emissões de Carbono
                </button>
            </section>
        );
    };

    const handleToggleMenu = (isOpen: boolean) => {
        setIsMenuOpen(isOpen);
    };


    const calcularEmissoes = (consumoEnergia: { [key: string]: number }): { resultados: ResultadoCalculo[], emissaoTotal: number } => {
        const resultados: ResultadoCalculo[] = [];
        let emissaoTotal = 0;

        fontesEnergia.forEach((fonte) => {
            const consumo = consumoEnergia[fonte.id] || 0;
            const emissoes = consumo * fonte.fatorEmissao;
            emissaoTotal += emissoes;

            resultados.push({
                fonte: fonte.nome,
                consumo,
                emissoes
            });
        });

        return { resultados, emissaoTotal };
    };


    return (
        <div className="h-screen bg-gray-100">
            <Menu onToggleMenu={handleToggleMenu} />

            <div className={"flex-1 trasition-all duration-300 pl-14 pt-4"} style={{ marginLeft: isMenuOpen ? "11rem" : "1rem" }}>
                <h1 className="flex text-2xl font-extrabold p-2 text-gray-700 gap-2">Calculadora <CalculatorIcon className='w-6' /></h1>
                <div>
                    <InputForm
                        consumoEnergia={consumoEnergia}
                        setConsumoEnergia={setConsumoEnergia}
                        calcularEmissoes={calcular} 
                    />
                </div>

                {modalResultados && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="relative bg-white p-6 rounded-lg shadow-lg w-[300px] ml-16 md:w-[400px] lg:w-[600px]">
                            <h1 className="text-xl text-center mb-6 font-semibold text-gray-700">Resultados</h1>
                        </div>
                    </div>

                ) }
            </div>
        </div>
    );
}
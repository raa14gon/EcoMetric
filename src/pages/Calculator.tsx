import { CalculatorIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Menu } from '../components/Menu';
import { useState } from "react";
import { fontesEnergia, getEmissaoCorClasse } from '../utils/calculationUtils';
import { ResultadoCalculo } from '../utils/types/types';




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
                    onClick={() => {
                        setModalResultados(true);
                        calcularEmissoes();
                    }}
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
        <div className="h-screen bg-gray-100 ">
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
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto">


                        <section className="bg-white rounded-lg shadow-md border border-[#BDC3C7] p-6 relative w-[350px] ml-16 md:w-[00px] lg:w-[800px] overflow-y-auto max-h-[90vh]">
                            <h2 className="text-2xl font-bold text-[#2C3E50] mb-6 pb-2 border-b-2 border-[#BDC3C7]">
                                Resultados de Emissões de CO₂
                            </h2>
                            <div className="absolute top-2 right-3">
                                <XMarkIcon
                                    className="w-6 cursor-pointer text-gray-600 hover:text-gray-900"
                                    onClick={() => { setModalResultados(false); setConsumoEnergia({}) }}
                                />
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-[#F8F9FA]">
                                            <th className="p-3 border-b-2 border-[#BDC3C7]">Fonte de Energia</th>
                                            <th className="p-3 border-b-2 border-[#BDC3C7]">Consumo (kWh)</th>
                                            <th className="p-3 border-b-2 border-[#BDC3C7]">Emissões (kg CO₂eq)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {resultados.map((resultado, index) => (
                                            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                                <td className="p-3 border-b border-[#BDC3C7]">{resultado.fonte}</td>
                                                <td className="p-3 border-b border-[#BDC3C7]">{resultado.consumo.toLocaleString()}</td>
                                                <td className="p-3 border-b border-[#BDC3C7]">
                                                    <span className={getEmissaoCorClasse(resultado.emissoes)}>
                                                        {resultado.emissoes.toFixed(2)}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot>
                                        <tr className="bg-[#F4C542] font-bold">
                                            <td className="p-3" colSpan={2}>Emissão Total de CO₂</td>
                                            <td className="p-3">{emissaoTotal.toFixed(2)} kg CO₂eq</td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>

                            <div className="mt-8">
                                <h3 className="text-xl font-semibold mb-4 text-[#2C3E50]">Distribuição de Emissões</h3>
                                <div className="w-full h-8 bg-[#BDC3C7] rounded-full overflow-hidden flex">
                                    {resultados.map((resultado, index) => {
                                        const percentual = (resultado.emissoes / emissaoTotal) * 100;
                                        if (percentual < 1 || isNaN(percentual)) return null;

                                        return (
                                            <div
                                                key={index}
                                                style={{ width: `${percentual}%` }}
                                                className={`h-full ${index % 3 === 0 ? 'bg-[#4CAF50]' : index % 3 === 1 ? 'bg-[#F4C542]' : 'bg-[#2C3E50]'}`}
                                                title={`${resultado.fonte}: ${percentual.toFixed(1)}%`}
                                            ></div>
                                        );
                                    })}
                                </div>
                                <div className="flex flex-wrap mt-2">
                                    {resultados.map((resultado, index) => {
                                        const percentual = (resultado.emissoes / emissaoTotal) * 100;
                                        if (percentual < 1 || isNaN(percentual)) return null;

                                        return (
                                            <div key={index} className="flex items-center mr-4 mb-2">
                                                <div
                                                    className={`w-4 h-4 rounded-sm mr-1 ${index % 3 === 0 ? 'bg-[#4CAF50]' : index % 3 === 1 ? 'bg-[#F4C542]' : 'bg-[#2C3E50]'}`}
                                                ></div>
                                                <span className="text-sm">{resultado.fonte}: {percentual.toFixed(1)}%</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="mt-8 p-4 bg-[#F8F9FA] rounded-lg border-l-4 border-[#4CAF50]">
                                <h3 className="font-bold text-lg text-[#2C3E50] mb-2">Dicas para Reduzir Emissões:</h3>
                                <ul className="list-disc pl-5 space-y-1">
                                    <li>Priorize fontes de energia renováveis como solar, eólica e hidrelétrica</li>
                                    <li>Reduza o consumo de energia proveniente de combustíveis fósseis</li>
                                    <li>Implemente medidas de eficiência energética</li>
                                    <li>Considere a instalação de painéis solares ou outras fontes renováveis</li>
                                </ul>
                            </div>
                        </section>
                    </div>
                )}
            </div>
        </div>
    );
}
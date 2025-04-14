export type FonteEnergia = {
    id: string;
    nome: string;
    fatorEmissao: number;
    icone: React.ReactNode 
};

export type ResultadoCalculo = {
    fonte: string;
    consumo: number;
    emissoes: number;
};
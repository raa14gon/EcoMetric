import { faLeaf, faSolarPanel, faWater, faAtom, faFire, faWind } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FonteEnergia, ResultadoCalculo } from './types/types';




export const fontesEnergia: FonteEnergia[] = [
  { id: 'hidrica', nome: 'Hidrelétrica', fatorEmissao: 0.024, icone: <FontAwesomeIcon icon={faWater} /> },
  { id: 'solar', nome: 'Solar', fatorEmissao: 0.045, icone: <FontAwesomeIcon icon={faSolarPanel} /> },
  { id: 'eolica', nome: 'Eólica', fatorEmissao: 0.011, icone: <FontAwesomeIcon icon={faWind} /> },
  { id: 'biomassa', nome: 'Biomassa', fatorEmissao: 0.23, icone: <FontAwesomeIcon icon={faLeaf} /> },
  { id: 'gas', nome: 'Gás Natural', fatorEmissao: 0.37, icone: <FontAwesomeIcon icon={faFire} /> },
  { id: 'carvao', nome: 'Carvão', fatorEmissao: 0.82, icone: <FontAwesomeIcon icon={faFire} /> },
  { id: 'nuclear', nome: 'Nuclear', fatorEmissao: 0.012, icone: <FontAwesomeIcon icon={faAtom} /> }
];

// Função para calcular as emissões de carbono
export const calcularEmissoes = (consumoEnergia: { [key: string]: number }): { resultados: ResultadoCalculo[], emissaoTotal: number } => {
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

export const getEmissaoCorClasse = (emissao: number): string => {
  if (emissao < 100) return 'text-green-500';
  if (emissao < 500) return 'text-yellow-500';
  return 'text-red-500';
};
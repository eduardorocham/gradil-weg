import { IsIn, IsNumber, IsPositive, IsString } from 'class-validator';
import { ALTURAS, CORES } from '../pedidos.constants';

export class CriarPedidoDto {
  @IsNumber({}, { message: 'Comprimento deve ser um número' })
  @IsPositive({ message: 'Comprimento deve ser maior que zero' })
  comprimento: number;

  @IsIn(ALTURAS, { message: `Altura deve ser uma das opções: ${ALTURAS.join(', ')}` })
  altura: number;

  @IsString({ message: 'Cor deve ser um texto' })
  @IsIn(CORES, { message: `Cor deve ser uma das opções: ${CORES.join(', ')}` })
  cor: string;
}

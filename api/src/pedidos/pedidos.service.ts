import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CriarPedidoDto } from './dto/criar-pedido.dto';
import { Pedido } from './pedido.entity';
import { COMPRIMENTO_TELA, FIXADORES_POR_ALTURA, PARAFUSOS_POR_POSTE } from './pedidos.constants';

@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Pedido)
    private readonly repositorio: Repository<Pedido>,
  ) {}

  calcular(entrada: CriarPedidoDto) {
    const { comprimentoVendido, ...componentes } = this.calcularComponentes(entrada);
    const diferenca = Math.round((comprimentoVendido - entrada.comprimento) * 100) / 100;

    return { ...entrada, comprimentoVendido, diferenca, componentes };
  }

  confirmar(entrada: CriarPedidoDto) {
    return this.repositorio.save(
      this.repositorio.create({ ...entrada, ...this.calcularComponentes(entrada) }),
    );
  }

  listar() {
    return this.repositorio.find({ order: { dataConfirmacao: 'DESC', id: 'DESC' } });
  }

  private calcularComponentes({ comprimento, altura }: CriarPedidoDto) {
    const telas = Math.ceil(Math.round(comprimento * 100) / (COMPRIMENTO_TELA * 100));
    const postes = telas + 1;

    return {
      comprimentoVendido: telas * COMPRIMENTO_TELA,
      telas,
      postes,
      fixadores: telas * FIXADORES_POR_ALTURA[altura],
      parafusos: postes * PARAFUSOS_POR_POSTE,
    };
  }
}

import { Body, Controller, Get, Post } from '@nestjs/common';
import { CriarPedidoDto } from './dto/criar-pedido.dto';
import { PedidosService } from './pedidos.service';

@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  @Post('calcular')
  calcular(@Body() criarPedidoDto: CriarPedidoDto) {
    return this.pedidosService.calcular(criarPedidoDto);
  }

  @Post()
  confirmar(@Body() criarPedidoDto: CriarPedidoDto) {
    return this.pedidosService.confirmar(criarPedidoDto);
  }

  @Get()
  listar() {
    return this.pedidosService.listar();
  }
}

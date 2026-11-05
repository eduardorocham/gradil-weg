import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import request from 'supertest';
import { configurarApp } from '../config/app.config';
import { databaseConfig } from '../config/database.config';
import { PedidosModule } from './pedidos.module';

const pedido = { comprimento: 11, altura: 1.53, cor: 'verde' };

async function criarAppDeTeste() {
  const modulo = await Test.createTestingModule({
    imports: [
      TypeOrmModule.forRoot({ ...databaseConfig, database: ':memory:' } as TypeOrmModuleOptions),
      PedidosModule,
    ],
  }).compile();

  const app = modulo.createNestApplication();
  configurarApp(app);
  await app.init();
  return app;
}

describe('Pedidos', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = await criarAppDeTeste();
  });

  afterEach(async () => {
    await app.close();
  });

  it('POST /pedidos/calcular retorna o cálculo do pedido', async () => {
    const resposta = await request(app.getHttpServer())
      .post('/pedidos/calcular')
      .send(pedido)
      .expect(201);

    expect(resposta.body).toEqual({
      ...pedido,
      comprimentoVendido: 12.5,
      diferenca: 1.5,
      componentes: { telas: 5, postes: 6, fixadores: 20, parafusos: 24 },
    });
  });

  it('POST /pedidos/calcular rejeita dados inválidos', async () => {
    await request(app.getHttpServer())
      .post('/pedidos/calcular')
      .send({ ...pedido, comprimento: -1 })
      .expect(400);
  });

  it('POST /pedidos salva o pedido', async () => {
    const resposta = await request(app.getHttpServer()).post('/pedidos').send(pedido).expect(201);

    expect(resposta.body).toEqual({
      ...pedido,
      id: expect.any(Number),
      comprimentoVendido: 12.5,
      telas: 5,
      postes: 6,
      fixadores: 20,
      parafusos: 24,
      dataConfirmacao: expect.any(String),
    });
  });

  it('POST /pedidos rejeita dados inválidos', async () => {
    await request(app.getHttpServer())
      .post('/pedidos')
      .send({ ...pedido, cor: 'azul' })
      .expect(400);
  });

  it('GET /pedidos lista os pedidos do mais recente para o mais antigo', async () => {
    await request(app.getHttpServer())
      .post('/pedidos')
      .send({ ...pedido, comprimento: 5 });
    await request(app.getHttpServer())
      .post('/pedidos')
      .send({ ...pedido, comprimento: 10 });

    const resposta = await request(app.getHttpServer()).get('/pedidos').expect(200);

    expect(resposta.body.map((p: { comprimento: number }) => p.comprimento)).toEqual([10, 5]);
  });
});

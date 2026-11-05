import axios from 'axios';

const client = axios.create({ baseURL: import.meta.env.VITE_API_URL });

const toRequestBody = ({ length, height, color }) => ({
  comprimento: length,
  altura: height,
  cor: color,
});

const toOrder = (order) => ({
  id: order.id,
  length: order.comprimento,
  height: order.altura,
  color: order.cor,
  soldLength: order.comprimentoVendido,
  difference:
    Math.round((order.comprimentoVendido - order.comprimento) * 100) / 100,
  components: {
    panels: order.telas,
    posts: order.postes,
    clamps: order.fixadores,
    screws: order.parafusos,
  },
  confirmedAt: order.dataConfirmacao,
});

const toCalculation = (calculation) => ({
  length: calculation.comprimento,
  height: calculation.altura,
  color: calculation.cor,
  soldLength: calculation.comprimentoVendido,
  difference: calculation.diferenca,
  components: {
    panels: calculation.componentes.telas,
    posts: calculation.componentes.postes,
    clamps: calculation.componentes.fixadores,
    screws: calculation.componentes.parafusos,
  },
});

const request = async (config) => {
  try {
    const { data } = await client.request(config);
    return data;
  } catch (error) {
    const message =
      error.response?.data?.message ?? 'Não foi possível conectar à API';
    throw new Error([].concat(message).join('. '));
  }
};

export const calculateOrder = async (input) =>
  toCalculation(
    await request({
      method: 'post',
      url: '/pedidos/calcular',
      data: toRequestBody(input),
    }),
  );

export const confirmOrder = async (input) =>
  toOrder(
    await request({
      method: 'post',
      url: '/pedidos',
      data: toRequestBody(input),
    }),
  );

export const listOrders = async () =>
  (await request({ method: 'get', url: '/pedidos' })).map(toOrder);

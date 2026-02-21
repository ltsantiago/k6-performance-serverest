import http from 'k6/http';
import { check } from 'k6';
import { BASE_URL } from '../utils/config.js';
import { loginAndGetToken } from '../utils/auth.js';

export const options = {
  vus: 1,
  iterations: 1,
  duration: '30s',
  thresholds: {
    http_req_duration: ['p(95)<1000'],
    http_req_failed: ['rate<0.02'],
  },
};

export default function () {
  const token = loginAndGetToken();
  if (!token) {
    // Login falhou — abortar execução deste VU
    return;
  }

  const headers = { 'Content-Type': 'application/json', Authorization: token };

  const payloadProduto = {
    nome: `Produto Teste ${Math.random().toString(36).slice(2)}`,
    preco: 100,
    descricao: 'Descrição do produto teste',
    quantidade: 10,
  };

  const cadastroRes = http.post(`${BASE_URL}/produtos`, JSON.stringify(payloadProduto), { headers });

  console.log(cadastroRes.json().message);

  check(cadastroRes, {
    'status 201': (r) => r.status === 201,
    'mensagem correta': (r) => r.json('message') === 'Cadastro realizado com sucesso',
    'contém id': (r) => !!r.json('_id'),
  });
}

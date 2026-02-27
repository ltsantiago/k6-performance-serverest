import http from 'k6/http';
import { check } from 'k6';
import { BASE_URL } from '../utils/config.js';
import { USER } from '../utils/user.js';

export const options = {
  vus: 1,
  iterations: 1,
  thresholds: {
    http_req_duration: ['p(95)<1000'],
    http_req_failed: ['rate<0.02'],
  },
};

export default function () {
  const res = http.post(`${BASE_URL}/usuarios`, JSON.stringify(USERNAME), { headers: { 'Content-Type': 'application/json' } });

  console.log(res.json().message);

  check(res, {
    'status 201': (r) => r.status === 201,
    'mensagem correta': (r) => r.json().message === 'Cadastro realizado com sucesso',
    'contém authorization': (r) => !!r.json('authorization'),
  });
}

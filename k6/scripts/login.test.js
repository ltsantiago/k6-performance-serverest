import http from 'k6/http';
import { check } from 'k6';
import { BASE_URL } from '../utils/config.js';
import { USER } from '../utils/user.js';

export const options = {
  vus: 100,
  iterations: 100,
  thresholds: {
    http_req_duration: ['p(95)<1000'],
    http_req_failed: ['rate<0.02'],
  },

};

export default function () {
  const res = http.post(`${BASE_URL}/login`, JSON.stringify(USER), { headers: { 'Content-Type': 'application/json' } });

  console.log(res.json().message);

  check(res, {
    'status 200': (r) => r.status === 200,
    'mensagem correta': (r) => r.json().message === 'Login realizado com sucesso',
    'contém authorization': (r) => !!r.json('authorization'),
  });
}

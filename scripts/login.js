import http from 'k6/http';
import { check } from 'k6';
import { BASE_URL } from '../utils/config.js';
import { USER } from '../utils/user.js';

export const options = {
    vus: 1, // Quantidade de usuário virtual
    iterations: 1, // Quantidade vezes que o script vai rodar
    duration: '30s',
    thresholds: {
        // 95% das requisições tem que levar menos de 1s
        http_req_duration: ['p(95)<1000'],
        // Somente 2% das requisições podem falhar
        http_req_failed: ['rate<0.02'],     // menos de 2% erro
    }
};

export default function () {
  const res = http.post(`${BASE_URL}/login`,
    JSON.stringify(USER),
    { headers: { 'Content-Type': 'application/json' } }
  );

  console.log(res.json().message);

  check(res, {
    'status 200': (r) => r.status === 200,
    'mensagem correta': (r) => r.json().message === 'Login realizado com sucesso',
    'contém "authorization"': (r) => !!r.json('authorization'),
  });

}
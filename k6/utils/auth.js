import http from 'k6/http';
import { check } from 'k6';
import { BASE_URL } from './config.js';
import { USER } from './user.js';

const JSON_HEADERS = { 'Content-Type': 'application/json' };

//Função de login que retorna o token de autorização para ser usado em outros testes
export function loginAndGetToken() {
  const res = http.post(`${BASE_URL}/login`, JSON.stringify(USER), { headers: JSON_HEADERS });

  check(res, {
    'login status 200': (r) => r.status === 200,
    'login message correto': (r) => r.json('message') === 'Login realizado com sucesso',
  });

  // Verificar se o token foi retornado ou se houve algum erro no login
  const token = res.json('authorization');
  if (!token) {
    console.error('Token não retornado no login:', res.body);
    return null;
  }
  return token;
}

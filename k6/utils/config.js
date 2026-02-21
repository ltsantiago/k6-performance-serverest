//Configuração do ambiente de teste, como a URL base da API. Permite fácil manutenção e reutilização em diferentes testes.
export const BASE_URL = typeof __ENV !== 'undefined' && __ENV.BASE_URL ? __ENV.BASE_URL : 'https://serverest.dev';

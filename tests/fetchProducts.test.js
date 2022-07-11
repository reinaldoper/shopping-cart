require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  it('Verifica se fetchProducts é uma função', () => {
    expect(typeof (fetchProducts)).toBe('function');
  });
  it('Verifica se a fetch foi chamada', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });
  it('Testa se fetch utiliza a URL', async () => {
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(url);
  });
  it('Verifica se retorna o objeto computadorSearch', async () => {
    expect(await fetchProducts('computador')).toEqual(computadorSearch);
  });
  it('Verifica se retorna a msg "You must provide an url" sem argumento na função', async () => {
    expect(await fetchProducts()).toEqual(new Error('You must provide an url'));
  })
});

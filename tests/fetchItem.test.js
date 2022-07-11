require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  it('Testa se fetchItem é uma função', async () => {
    expect(typeof (fetchItem)).toBe('function');
  });
  it('Verifica se a fetch foi chamada', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });
  it('Verifica se a mensagem "You must provide an url" foi retornada', async () => {
    expect(await fetchItem()).toEqual(new Error('You must provide an url'));
  });
  it('Verifica se retorna o objeto computadorSearch', async () => {
    expect(await fetchItem('MLB1615760527')).toEqual(item);
  });
  it('Testa se fetch utiliza a URL', async () => {
    const url = 'https://api.mercadolibre.com/items/MLB1615760527';
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(url);
  });
});

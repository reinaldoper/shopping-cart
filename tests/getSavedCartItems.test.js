const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  it('Verifica se a localStore.getItem foi chamada', () => {
    getSavedCartItems('cartItems');
    expect(localStorage.getItem).toHaveBeenCalled();
  });
  it('Verifica se a localStore.getItem foi chamada com parametro cartItems', () => {
    const param = 'cartItems';
    getSavedCartItems('cartItems');
    expect(localStorage.getItem).toHaveBeenCalledWith(param);
  });
});

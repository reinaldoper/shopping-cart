const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

const salvaDados = () => {
  const l = document.querySelectorAll('li');
  console.log(l);
  let all = '';
  console.log(all);
  if (l.length > 0) {
    l.forEach((item) => {
      all += JSON.stringify(item.innerHTML);
    });
  }
  saveCartItems(all);
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListener = ({ target }) => {
  const buton = document.querySelector('.cart__item');
  buton.addEventListener('click', target.remove());
  salvaDados();
  // coloque seu código aqui
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const adicionaCarrinho = async (click) => {
  const result = document.querySelector('.cart__items');
  const item = click.target.parentNode.firstChild.innerText;
  const { id, title, price } = await fetchItem(item);
  result.appendChild(createCartItemElement({ sku: id, name: title, salePrice: price }));
  salvaDados();
};
const myButon = () => {
  const botoes = document.querySelectorAll('.item__add');
    botoes.forEach((botao) => botao.addEventListener('click', adicionaCarrinho));
};

const receivedProduct = async () => {
  const section = document.querySelector('.items');
  const obj = await fetchProducts('computador');
  const result = obj.results;
  result.forEach(({ id, title, thumbnail }) => { 
    section
    .appendChild(createProductItemElement({ sku: id, name: title, image: thumbnail }));
  });
};
const criaLi = (item) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = item.replace(/"/g, '');
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const atualizaPage = () => {
  let { cartItems } = localStorage;
  const cart = document.querySelector('ol');
  if (cartItems.length > 0) {
    cartItems = cartItems.split('""');
    cartItems.forEach((item) => {
      cart.appendChild(criaLi(item));
    });
  }
};

window.onload = async () => {
  await receivedProduct();
  myButon();
  atualizaPage();
};

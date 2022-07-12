const getSavedCartItems = (items) => {
  localStorage.getItem(items);
  // seu código aqui
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}

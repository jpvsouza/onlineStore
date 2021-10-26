export async function getCategories() {
  const URL = 'https://api.mercadolibre.com/sites/MLB/categories';
  return fetch(URL)
    .then((response) => response.json())
    .then((data) => data);
}

export async function getProductsFromCategoryAndQuery(categoryId, name) {
  const URL = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${name}`;
  return fetch(URL)
    .then((response) => response.json())
    .then((data) => data);
}

const FETCH_URL = 'https://dummyjson.com/products';

export const fetchProducts = async ({limit = 10, skip = 0}) => {
  const res = await fetch(`${FETCH_URL}?limit=${limit}&skip=${skip}`);
  if (!res.ok) {
    throw new Error('Api is not working', res.status);
  }
  const data = await res.json();
  return {
    items: data.products,
    total: data.total,
  };
};

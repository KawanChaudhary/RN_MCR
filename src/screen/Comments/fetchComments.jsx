const BASE_URL = 'https://dummyjson.com/comments';

export async function fetchComments({limit = 10, skip = 0}) {
  const res = await fetch(`${BASE_URL}?limit=${limit}&skip=${skip}`);
  if (!res.ok) {
    throw new Error(`Error fetching comments: ${res.status}`);
  }
  const data = await res.json();
  return {
    comments: data.comments,
    total: data.total,
  };
}

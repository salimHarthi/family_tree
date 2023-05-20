export const fetcher = (...args) => fetch(...args).then((res) => res.json());

export const seter = async (url, { arg }) => {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(arg),
  }).then((res) => res.json());
};
export const put = async (url, { arg }) => {
  return fetch(url, {
    method: 'PUT',
    body: JSON.stringify(arg),
  }).then((res) => res.json());
};

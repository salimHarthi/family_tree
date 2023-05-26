import { signIn } from 'next-auth/react';

export const fetcher = (...args) =>
  fetch(...args).then((res) => {
    if (res.status === 401) {
      signIn();
    }
    return res.json();
  });

export const seter = async (url, { arg }) => {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(arg),
  }).then((res) => {
    if (res.status === 401) {
      signIn();
    }
    return res.json();
  });
};
export const put = async (url, { arg }) => {
  return fetch(url, {
    method: 'PUT',
    body: JSON.stringify(arg),
  }).then((res) => {
    if (res.status === 401) {
      signIn();
    }
    return res.json();
  });
};
export const remove = async (url, { arg }) => {
  return fetch(url + `/${arg.id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(arg),
  }).then((res) => {
    if (res.status === 401) {
      signIn();
    }
    return res.json();
  });
};

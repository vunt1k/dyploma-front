import { get, post, put, delete as del } from 'axios';
import { get as getCookies } from 'js-cookie';

import { api } from '../config';

const getHeaders = () => {
  const token = getCookies('token');

  if (typeof(token) != 'undefined') {
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  }

  return null;
}

export const getRequest = async (url) => {
  const headers = getHeaders();

  try {
    return await get(api + url, !!headers && headers)
      .then(response => response)
      .catch(error => error.response);
  } catch (err) {
    console.log(err);
  }
}

export const postRequest = async (url, data) => {
  const headers = getHeaders();

  try {
    return await post(api + url, data, !!headers && headers)
      .then(response => response)
      .catch(error => error.response);
  } catch (err) {
    console.log(err);
  }
}

export const putRequest = async (url, data) => {
  const headers = getHeaders();

  try {
    return await put(api + url, data, !!headers && headers)
      .then(response => response)
      .catch(error => error.response);
  } catch (err) {
    console.log(err);
  }
}

export const deleteRequest = async (url) => {
  const headers = getHeaders();

  try {
    return await del(api + url, !!headers && headers)
      .then(response => response)
      .catch(error => error.response);
  } catch (err) {
    console.log(err);
  }
}
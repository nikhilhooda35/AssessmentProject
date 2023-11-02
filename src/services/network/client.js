import axios from 'axios';

axios.defaults.headers = {
  get: {'Cache-Control': 'no-cache', Pragma: 'no-cache', Expires: '0'},
  post: {'Cache-Control': 'no-cache', Pragma: 'no-cache', Expires: '0'},
  options: {'Cache-Control': 'no-cache', Pragma: 'no-cache', Expires: '0'},
};

export const client = axios.create();
client.defaults.timeout = 60000;

export const setAPITimeout = (_timeout) => {
  client.defaults.timeout = _timeout || 60000;
};

/** pick and set last API timeout from local storage */
const lastError = localStorage.getItem("API_TIMEOUT");
const lastTimeout = lastError ? JSON.parse(lastError) : null;
const timeout = Number(lastTimeout);
setAPITimeout(timeout);

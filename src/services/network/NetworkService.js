/*
HTTP Status Code
Informational responses (100–199)
Successful responses (200–299)
Redirects (300–399)
Client errors (400–499)
Server errors (500–599)
*/

import { NOT_AUTHORIZED } from "common/constants";
import { client } from "./client";
import { getAccessToken } from "helper/login";
import { loginActions } from "screens/generic/Login/redux";
import { store } from "App";
import env from "env";
const getNetworkResponse = async (config, apiPath) => {
  return client(config)
    .then(async function (response) {
      return response;
    })
    .catch(async (error) => {
      if (error?.response?.status === NOT_AUTHORIZED) {
        store.dispatch(loginActions.signOut());
      }
      return error.response || error.message || apiPath;
    });
};

/*
Function to handle HTTP GET request
@params- for query params
*/
export const get = async (url, params, apiPath) => {
  const accessToken = await getAccessToken();
  const config = {
    baseURL: env.API_HOST,
    method: "GET",
    url,
    headers: { Authorization: `Bearer ${accessToken}` },
    params,
  };

  if (accessToken) {
    return getNetworkResponse(config, apiPath);
  }
};

/*
Function to handle HTTP POST request
@data for passing data as body
@params- for query params
*/
export const post = async (url, data = {}, params = {}, apiPath = null) => {
  const accessToken = await getAccessToken();
  const headersValue = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };
  const config = {
    baseURL: env.API_HOST,
    method: "POST",
    url,
    headers: headersValue,
    data,
    params,
  };
  if (accessToken) {
    return getNetworkResponse(config, apiPath);
  }
};

const NetworkService = {
  get,
  post,
};

export default NetworkService;

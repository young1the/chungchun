import Axios from "axios";

export const axios = Axios.create({
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    // Authorization: "Bearer fake_token",
  },
  withCredentials: true,
});

export const setToken = (token: string) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};
export const unsetToken = () => {
  delete axios.defaults.headers.common["Authorization"];
};

export const http = {
  get: <Response = any>(url: string) => {
    return axios.get<Response>(url).then((res) => res.data);
  },
  post: <Request = any, Response = any>(url: string, body?: Request) => {
    return axios.post<Response>(url, body).then((res) => res.data);
  },
  put: <Request = any, Response = any>(url: string, body?: Request) => {
    return axios.put<Response>(url, body).then((res) => res.data);
  },
  delete: <Response = any>(url: string) => {
    return axios.delete<Response>(url).then((res) => res);
  },
};

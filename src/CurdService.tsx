import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const Headers = (token: any) => {
  return {
    authorization: token,
    Accept: "application/json",
    "Content-Type": "application/json",
  };
};

const Create = async (data: any, endpoints: string) => {
  const token = sessionStorage.getItem("token");
  try {
    const res = await axios.post<any>(API_URL + endpoints, data, {
      headers: Headers(token),
    });
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
};

const Update = async (data: any, endpoints: string) => {
  const token = sessionStorage.getItem("token");
  try {
    const res = await axios.put<any>(API_URL + endpoints, data, {
      headers: Headers(token),
    });
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
};

const Delete = async (endpoints: any, token: any, id: any) => {
  try {
    const res = await axios.delete<any>(API_URL + endpoints + id, {
      headers: Headers(token),
    });
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
};

const Get = async (endpoints: string, token: any, params: any) => {
  try {
    const res = await axios.get<any>(API_URL + endpoints, {
      headers: Headers(token),
      params: params,
    });
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export { Create, Update, Delete, Get };

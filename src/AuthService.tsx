import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export async function Signup(data: any) {
  try {
    const res = await axios.post<any>(API_URL + "signup", data);
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
}

export async function Login(data: any) {
  try {
    const res = await axios.post<any>(API_URL + "login", data);
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
}

export async function ForgotPassword(data: any) {
  try {
    const res = await axios.post<any>(API_URL + "forgotpassword", data);
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
}

export async function CheckForResetPassword(data: any) {
  try {
    const res = await axios.post<any>(API_URL + "checkfortoken", data);
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
}

export async function ResetPassword(data: any) {
  try {
    const res = await axios.post<any>(API_URL + "resetpassword", data);
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
}

export async function VerifyAccount(token: any) {
  try {
    const res = await axios.get<any>(API_URL + "verify", {
      headers: {
        authorization: token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
}

export async function ActivateAccount(token: any) {
  try {
    const res = await axios.put<any>(API_URL + "active", { token: token });
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
}

export async function RegenerateLink(data: any) {
  try {
    const res = await axios.put<any>(API_URL + "regeneratetoken", data);
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
}

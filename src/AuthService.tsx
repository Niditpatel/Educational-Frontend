import axios from "axios";

export async function Signup(data: any) {
  console.log("ragister", data);
  try {
    const res = await axios.post<any>(
      `${process.env.REACT_APP_API_URL}signup`,
      data
    );
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
}

export async function Login(data: any) {
  try {
    const res = await axios.post<any>(
      process.env.REACT_APP_API_URL + "login",
      data
    );
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
}

export async function ForgotPassword(data: any) {
  try {
    const res = await axios.post<any>(
      process.env.REACT_APP_API_URL + "forgotpassword",
      data
    );
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
}

export async function ResetPassword(data: any) {
  try {
    const res = await axios.post<any>(
      process.env.REACT_APP_API_URL + "resetpassword",
      data
    );
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
}

import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;
export async function GetTitles() {
  const res = await axios.get(API_URL + "title");
  return res.data;
}

export async function GetInstitutes(data: String) {
  const res = await axios.get(API_URL + "searchinstitute", {
    params: { key: data },
  });
  return res.data;
}
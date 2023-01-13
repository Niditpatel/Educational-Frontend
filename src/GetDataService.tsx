import axios from "axios";

export async function GetTitles() {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}title`);
  return res.data;
}

export async function GetInstitutes(data: String) {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}searchinstitute`,
    {
      params: { key: data },
    }
  );
  return res.data;
}

import axios from "axios";

const requestUrl = "https://api.ucfparking.com";
const getLastRowData = async () => {
  const { data: res } = await axios.get(requestUrl);
  return res;
};
export const parkingService = {
  getLastRowData
};

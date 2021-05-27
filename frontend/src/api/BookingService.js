import axios from "axios";

const url = "https://covihelp-india.herokuapp.com/api/ambulances/";

export const getAmbulance = async (id) => {
  const res = await axios.get(`${url}${id}`);
  console.log(res);
  return res.data;
};

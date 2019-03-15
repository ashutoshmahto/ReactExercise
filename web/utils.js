import axios from "axios";
export const httpHeader = { "Content-Type": "application/json; charset=utf-8" };

const generateUID = () => {
  return (
    Math.floor(Math.random() * 1000001).toString(36) +
    new Date().getTime().toString(36)
  );
};

const getCurrentTime = () => {
  const currentDate = new Date();
  const currentFormattedDate =
    [
      currentDate.getMonth() + 1,
      currentDate.getDate(),
      currentDate.getFullYear()
    ].join("/") +
    " " +
    [
      currentDate.getHours(),
      currentDate.getMinutes(),
      currentDate.getSeconds()
    ].join(":");
  return currentFormattedDate;
};

/* HTTP get request handler. */
const getData = url => {
  return axios.get(url, { withCredentials: true }, httpHeader);
};

/* HTTP POST request handler. */
const postData = (url, payload) => {
  console.log(url, payload);
  return axios.post(url, payload, { withCredentials: true }, httpHeader);
};

/* HTTP PUT request handler. */
const updateData = (url, payload) => {
  return axios.put(url, payload, { withCredentials: true }, httpHeader);
};

export { getData, postData, updateData, generateUID, getCurrentTime };

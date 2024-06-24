import axios from "axios";

export const caxios = () => {
  const instance = axios.create({
    baseURL: process.env.BACKEND_URL,
    timeout: 5000,
    headers: {'X-Custom-Header': 'snipertools'}
  });
  return instance;
}

export const shortAddress = (address: string, startLength = 5, endLength = 5) => {
  if(address === undefined) return undefined
  if(address.length < 20) return address;
  if (address.length <= startLength + endLength) {
      return address; // No need to shorten
  }
  const start = address.substring(0, startLength);
  const end = address.substring(address.length - endLength);
  return `${start}...${end}`;
}
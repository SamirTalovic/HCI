import axios from "axios";

const client = axios.create({ baseURL: "http://192.168.0.102:4646/api" });

export default client;

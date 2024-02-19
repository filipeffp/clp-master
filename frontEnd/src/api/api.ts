import axios from "axios";

export const api = axios.create({
    baseURL: "https://cplm-1f6ca9a43902.herokuapp.com/api",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
});
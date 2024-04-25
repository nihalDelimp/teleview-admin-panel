import axios from "axios";
import { store } from '../Redux/store';


export const withoutAuthAxios = () => {
  return axios.create({
    baseURL: `${process.env.REACT_APP_BASEURL}`
  });
};


export const authAxios = () => {
  let token = store.getState().auth.token;

  return axios.create({
    baseURL: `${process.env.REACT_APP_BASEURL}`,
    headers: {
      'Authorization': `${token ? `${token}` : null}`,
    },
  });
};



export const SearchgoogleAxios = () => {
  //let token = store.getState().auth.token;

  return axios.create({
    baseURL: `https://google.serper.dev`,
    headers: {
      "X-API-KEY":`2ede89491cfc273c044eb7f0c84a877fbc684ce6`
     // "X-API-KEY":`f6cc0610051f46e15bc237ce549537522881dd00`
      //'Authorization': `${token ? `${token}` : null}`,
    },
  });
};

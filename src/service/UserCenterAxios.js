import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_DB_USERNAME, USER_DB_PASSWORD, USER_API_URL } from '@env'

const userCenUrl = USER_API_URL;

const instance = axios.create({
  baseURL: userCenUrl,
  timeout: 1000,

});

async function getAccessToken() {
  console.log('do getAccessToken');
  const { data } = await instance.post("/token", {
    "UserName": USER_DB_USERNAME,
    "Password": USER_DB_PASSWORD
  });
  const { accessToken } = data
  AsyncStorage.setItem("accessToken", accessToken);
  return accessToken
}

instance.interceptors.request.use(async (config) => {

  const accessToken = await AsyncStorage.getItem('accessToken')
  console.log('accToken from Async is'+ accessToken);
  config.headers.Authorization = 'Bearer ' + accessToken;
  return config;

});


instance.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, async function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  const originalConfig = error.config;
  if (error.response) {
    if (error.response.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;
      console.log('401');
      // Do something, call refreshToken() request for example;
      // return a request
      try {
        const accessToken = await getAccessToken();


        instance.defaults.headers.common["Authorization"] = accessToken;

        return instance(originalConfig);
      } catch (_error) {
        if (_error.response && _error.response.data) {
          return Promise.reject(_error.response.data);
        }

        return Promise.reject(_error);
      }
    }
  }
  // console.log(JSON.stringify(error));
  return Promise.reject(error);
});


export const UserCenterAxios = instance;
// import axios from "axios"

// import AsyncStorage from "@react-native-async-storage/async-storage";
// import urlJoin from 'url-join';


// const isAbsoluteURLRegex = /^(?:\w+:)\/\//;


// axios.interceptors.request.use(async (config) => {
//   console.log(config.url);
//   if (!isAbsoluteURLRegex.test(config.url)) {
//     const accessToken = await AsyncStorage.getItem('accessToken')

//     if (accessToken) {
//       config.headers.Authorization = 'Bearer ' + accessToken
//     }

    
//   }
//   // config.url = urlJoin('https://p701apsi01-la02skc.azurewebsites.net/skcapi',config.url)
//   // console.log('configggg',config);
//   return config;
  
// });


// //export default axios;
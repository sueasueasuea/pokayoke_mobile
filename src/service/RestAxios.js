import axios from 'axios';
const baseUrl = 'https://asvanmfg02.siamkubota.co.th:444/pokayoke';

const instance = axios.create({
    baseURL: baseUrl,
    timeout: 1000,

});

instance.interceptors.request.use(async (config) => {


    //console.log('after configs' + JSON.stringify(config));
    return config;
});

instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log('res'+response);
    return response;
}, async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // const originalConfig = err.config;
    if (error.response) {
        if (error.response.status === 400 )
        {
            console.log();
        }
    }

    // console.log(JSON.stringify(error));
    return Promise.reject(error);
});

export const RestAxios = instance;